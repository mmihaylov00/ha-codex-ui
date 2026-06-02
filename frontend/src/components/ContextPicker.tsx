import { useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import type { HaCodexApi } from "../services/api";
import type {
  AreaRegistryEntry,
  ContextConfigFile,
  ContextLog,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  HassEntity,
  HomeAssistant,
} from "../types/ha";
import {
  CONTEXT_SELECTION_LIMIT,
  contextItemKey,
  type HaContextItem,
  type HaContextKind,
} from "../features/context/contextUtils";
import { errorSummary } from "../utils/format";

const TABS: Array<{ kind: HaContextKind; label: string; icon: string }> = [
  { kind: "entity", label: "Entities", icon: "mdi:home-assistant" },
  { kind: "device", label: "Devices", icon: "mdi:devices" },
  { kind: "area", label: "Areas", icon: "mdi:floor-plan" },
  { kind: "automation", label: "Automations", icon: "mdi:robot-industrial-outline" },
  { kind: "script", label: "Scripts", icon: "mdi:script-text-outline" },
  { kind: "log", label: "Logs", icon: "mdi:text-box-search-outline" },
  { kind: "config_file", label: "Config files", icon: "mdi:file-document-outline" },
];

interface ContextPickerProps {
  api: HaCodexApi;
  hass: HomeAssistant | null;
  open: boolean;
  selected: HaContextItem[];
  onAdd: (item: HaContextItem) => void;
  onRemove: (itemKey: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function ContextPicker(props: ContextPickerProps) {
  const { api, hass, open, selected, onAdd, onRemove, onClear, onClose } = props;
  const [activeTab, setActiveTab] = useState<HaContextKind>("entity");
  const [query, setQuery] = useState("");
  const [entityRegistry, setEntityRegistry] = useState<EntityRegistryEntry[]>([]);
  const [devices, setDevices] = useState<DeviceRegistryEntry[]>([]);
  const [areas, setAreas] = useState<AreaRegistryEntry[]>([]);
  const [logs, setLogs] = useState<ContextLog[]>([]);
  const [configFiles, setConfigFiles] = useState<ContextConfigFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loadingConfigPath, setLoadingConfigPath] = useState<string | null>(null);
  const selectedKeys = useMemo(() => new Set(selected.map(contextItemKey)), [selected]);

  useEffect(() => {
    if (!open) return;
    let canceled = false;
    setLoading(true);
    setErrors([]);
    void Promise.allSettled([
      api.entityRegistry(),
      api.deviceRegistry(),
      api.areaRegistry(),
      api.contextLogs(200),
      api.contextConfigFiles(),
    ]).then((results) => {
      if (canceled) return;
      const nextErrors: string[] = [];
      const [entityResult, deviceResult, areaResult, logResult, fileResult] = results;
      if (entityResult.status === "fulfilled") setEntityRegistry(entityResult.value || []);
      else nextErrors.push(`Entity registry: ${errorSummary(entityResult.reason)}`);
      if (deviceResult.status === "fulfilled") setDevices(deviceResult.value || []);
      else nextErrors.push(`Device registry: ${errorSummary(deviceResult.reason)}`);
      if (areaResult.status === "fulfilled") setAreas(areaResult.value || []);
      else nextErrors.push(`Area registry: ${errorSummary(areaResult.reason)}`);
      if (logResult.status === "fulfilled") setLogs(logResult.value.logs || []);
      else nextErrors.push(`Logs: ${errorSummary(logResult.reason)}`);
      if (fileResult.status === "fulfilled") setConfigFiles(fileResult.value.files || []);
      else nextErrors.push(`Config files: ${errorSummary(fileResult.reason)}`);
      setErrors(nextErrors);
      setLoading(false);
    });
    return () => {
      canceled = true;
    };
  }, [api, open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [onClose, open]);

  const itemsByKind = useMemo(() => {
    const areaById = new Map(areas.map((area) => [area.area_id, area]));
    const deviceById = new Map(devices.map((device) => [device.id, device]));
    const entityById = new Map(entityRegistry.map((entry) => [entry.entity_id, entry]));
    const states = hass?.states || {};
    const allEntities = Object.entries(states).map(([entityId, state]) => entityContextItem(entityId, state, entityById, deviceById, areaById));
    return {
      entity: allEntities.filter((item) => {
        const domain = String(item.payload?.domain || "");
        return domain !== "automation" && domain !== "script";
      }),
      automation: allEntities.filter((item) => item.payload?.domain === "automation").map((item) => ({ ...item, kind: "automation" as const, id: `automation:${item.id}` })),
      script: allEntities.filter((item) => item.payload?.domain === "script").map((item) => ({ ...item, kind: "script" as const, id: `script:${item.id}` })),
      device: devices.map((device) => deviceContextItem(device, areaById)),
      area: areas.map(areaContextItem),
      log: logs.map(logContextItem),
      config_file: configFiles.map(configFileContextItem),
    };
  }, [areas, configFiles, devices, entityRegistry, hass?.states, logs]);

  const activeItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const items = itemsByKind[activeTab] || [];
    if (!needle) return items;
    return items.filter((item) => [item.label, item.subtitle, item.id].some((value) => String(value || "").toLowerCase().includes(needle)));
  }, [activeTab, itemsByKind, query]);

  if (!open) return null;

  const selectedFull = selected.length >= CONTEXT_SELECTION_LIMIT;
  const toggleItem = async (item: HaContextItem) => {
    const key = contextItemKey(item);
    if (selectedKeys.has(key)) {
      onRemove(key);
      return;
    }
    if (selectedFull) return;
    if (item.kind !== "config_file") {
      onAdd(item);
      return;
    }
    const path = String(item.payload?.path || item.id);
    setLoadingConfigPath(path);
    try {
      const preview = await api.contextConfigFile(path);
      onAdd({
        ...item,
        subtitle: `${formatBytes(preview.size || 0)}${preview.truncated ? " truncated" : ""}`,
        payload: {
          path: preview.path,
          size: preview.size,
          modified: preview.modified,
          content: preview.content,
          truncated: Boolean(preview.truncated),
        },
      });
    } catch (error) {
      setErrors((current) => [`Config file ${path}: ${errorSummary(error)}`, ...current].slice(0, 4));
    } finally {
      setLoadingConfigPath(null);
    }
  };

  return (
    <div className="modal-backdrop context-modal-backdrop" role="presentation">
      <button className="modal-scrim" type="button" onClick={onClose} aria-label="Close context picker" />
      <section className="modal context-modal" role="dialog" aria-modal="true" aria-label="Add context">
        <header className="modal-header">
          <h2>Add context</h2>
          <button className="icon-button" type="button" onClick={onClose} title="Close" aria-label="Close context picker"><Icon icon="mdi:close" /></button>
        </header>
        <nav className="modal-tabs context-tabs" aria-label="Context type">
          {TABS.map((tab) => (
            <button key={tab.kind} className={activeTab === tab.kind ? "active" : ""} type="button" onClick={() => setActiveTab(tab.kind)}>
              <Icon icon={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="context-toolbar">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search context" />
          <span>{selected.length}/{CONTEXT_SELECTION_LIMIT}</span>
          {selected.length ? <button className="ghost" type="button" onClick={onClear}>Clear</button> : null}
        </div>
        {errors.length ? (
          <div className="context-errors" role="status">
            {errors.slice(0, 3).map((error) => <p key={error}>{error}</p>)}
          </div>
        ) : null}
        <div className="context-list" aria-busy={loading}>
          {loading ? <div className="context-empty">Loading</div> : activeItems.length ? activeItems.map((item) => {
            const key = contextItemKey(item);
            const selectedItem = selectedKeys.has(key);
            const disabled = !selectedItem && selectedFull;
            const isLoading = loadingConfigPath === item.payload?.path;
            return (
              <button
                className={`context-row ${selectedItem ? "selected" : ""}`}
                disabled={disabled || isLoading}
                key={key}
                type="button"
                onClick={() => void toggleItem(item)}
              >
                <span className="context-checkbox" aria-hidden="true">{selectedItem ? <Icon icon="mdi:check" /> : null}</span>
                <Icon className="context-kind-icon" icon={iconForKind(item.kind)} />
                <span className="context-row-main">
                  <strong>{item.label}</strong>
                  {item.subtitle ? <small>{item.subtitle}</small> : null}
                </span>
                {isLoading ? <span className="context-row-status">Loading</span> : null}
              </button>
            );
          }) : <div className="context-empty">No matches</div>}
        </div>
      </section>
    </div>
  );
}

export function ContextChips({ items, onRemove, onClear }: { items: HaContextItem[]; onRemove: (key: string) => void; onClear: () => void }) {
  if (!items.length) return null;
  return (
    <div className="context-chips" aria-label="Selected context">
      {items.map((item) => (
        <button className="context-chip" type="button" onClick={() => onRemove(contextItemKey(item))} key={contextItemKey(item)} title={item.subtitle || item.label}>
          <Icon icon={iconForKind(item.kind)} />
          <span>{item.label}</span>
          <Icon icon="mdi:close" />
        </button>
      ))}
      <button className="context-clear" type="button" onClick={onClear}>Clear</button>
    </div>
  );
}

function entityContextItem(
  entityId: string,
  state: HassEntity,
  entityById: Map<string, EntityRegistryEntry>,
  deviceById: Map<string, DeviceRegistryEntry>,
  areaById: Map<string, AreaRegistryEntry>,
): HaContextItem {
  const entry = entityById.get(entityId);
  const device = entry?.device_id ? deviceById.get(entry.device_id) : undefined;
  const areaId = entry?.area_id || device?.area_id || null;
  const area = areaId ? areaById.get(areaId) : undefined;
  const attributes = compactAttributes(state.attributes || {});
  const friendlyName = String(attributes.friendly_name || entry?.name || entry?.original_name || entityId);
  const domain = entityId.split(".")[0] || "entity";
  const stateText = state.state ? `state ${state.state}` : "unknown";
  const subtitle = [entityId, stateText, area?.name, deviceName(device)].filter(Boolean).join(" - ");
  return {
    id: entityId,
    kind: "entity",
    label: friendlyName,
    subtitle,
    payload: {
      entity_id: entityId,
      domain,
      state: state.state,
      friendly_name: friendlyName,
      area: area?.name || null,
      device: deviceName(device) || null,
      attributes,
      last_changed: state.last_changed,
      last_updated: state.last_updated,
    },
  };
}

function deviceContextItem(device: DeviceRegistryEntry, areaById: Map<string, AreaRegistryEntry>): HaContextItem {
  const name = deviceName(device) || device.id;
  const area = device.area_id ? areaById.get(device.area_id) : undefined;
  return {
    id: device.id,
    kind: "device",
    label: name,
    subtitle: [device.manufacturer, device.model, area?.name].filter(Boolean).join(" - "),
    payload: {
      device_id: device.id,
      name,
      manufacturer: device.manufacturer || null,
      model: device.model || null,
      area: area?.name || null,
      disabled_by: device.disabled_by || null,
    },
  };
}

function areaContextItem(area: AreaRegistryEntry): HaContextItem {
  return {
    id: area.area_id,
    kind: "area",
    label: area.name,
    subtitle: area.area_id,
    payload: {
      area_id: area.area_id,
      name: area.name,
      aliases: area.aliases || [],
    },
  };
}

function logContextItem(log: ContextLog): HaContextItem {
  return {
    id: log.id,
    kind: "log",
    label: log.name,
    subtitle: log.exists ? `${log.line_count || 0} lines${log.truncated ? " truncated" : ""}` : "missing",
    payload: {
      source: log.name,
      path: log.path,
      exists: Boolean(log.exists),
      lines: log.lines || "",
      line_count: log.line_count || 0,
      truncated: Boolean(log.truncated),
      error: log.error || null,
    },
  };
}

function configFileContextItem(file: ContextConfigFile): HaContextItem {
  return {
    id: file.path,
    kind: "config_file",
    label: file.path.split("/").pop() || file.path,
    subtitle: `${file.path} - ${formatBytes(file.size || 0)}`,
    payload: {
      path: file.path,
      size: file.size,
      modified: file.modified,
    },
  };
}

function compactAttributes(attributes: Record<string, unknown>): Record<string, unknown> {
  const allowed = [
    "friendly_name",
    "device_class",
    "unit_of_measurement",
    "icon",
    "supported_features",
    "battery_level",
    "brightness",
    "color_mode",
    "current_temperature",
    "temperature",
    "hvac_mode",
    "last_triggered",
    "mode",
  ];
  return Object.fromEntries(allowed.filter((key) => key in attributes).map((key) => [key, attributes[key]]));
}

function deviceName(device?: DeviceRegistryEntry): string {
  return String(device?.name_by_user || device?.name || "").trim();
}

function iconForKind(kind: HaContextKind): string {
  return TABS.find((tab) => tab.kind === kind)?.icon || "mdi:plus";
}

function formatBytes(size: number): string {
  if (!Number.isFinite(size) || size <= 0) return "0 B";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 102.4) / 10} KB`;
  return `${Math.round(size / 1024 / 102.4) / 10} MB`;
}
