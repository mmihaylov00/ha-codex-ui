import { useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import {
  BUILDER_TEMPLATES,
  buildAutomationScriptRequest,
  builderTemplate,
  requiredBuilderMessages,
  type BuilderField,
  type BuilderFieldOption,
  type BuilderTemplateId,
  type BuilderValues,
} from "../features/builder/builderUtils";
import { iconForContextKind, type ContextSendPayload, type HaContextItem } from "../features/context/contextUtils";
import type { HassEntity, HomeAssistant } from "../types/ha";

interface AutomationBuilderProps {
  open: boolean;
  hass: HomeAssistant | null;
  contextItems: HaContextItem[];
  onClose: () => void;
  onSubmit: (request: ContextSendPayload) => void;
}

interface EntityOption {
  entityId: string;
  label: string;
  subtitle: string;
  searchText: string;
}

interface ServiceOption {
  serviceId: string;
  label: string;
  domain: string;
  searchText: string;
}

type ServiceRegistry = Record<string, Record<string, { name?: string; description?: string }>>;

export function AutomationBuilder({ open, hass, contextItems, onClose, onSubmit }: AutomationBuilderProps) {
  const [templateId, setTemplateId] = useState<BuilderTemplateId>("create_automation");
  const [values, setValues] = useState<BuilderValues>({});
  const [submitted, setSubmitted] = useState(false);
  const [services, setServices] = useState<ServiceRegistry>({});
  const template = builderTemplate(templateId);
  const errors = useMemo(() => requiredBuilderMessages(templateId, values, contextItems), [contextItems, templateId, values]);
  const entityOptions = useMemo(() => buildEntityOptions(hass?.states || {}), [hass?.states]);
  const serviceOptions = useMemo(() => buildServiceOptions(services), [services]);
  const notifyServiceOptions = useMemo(() => serviceOptions.filter((service) => service.domain === "notify"), [serviceOptions]);
  const isCreateAutomation = templateId === "create_automation";

  useEffect(() => {
    if (!open || !hass) return;
    let canceled = false;
    void hass.callWS<ServiceRegistry>({ type: "get_services" }).then((result) => {
      if (!canceled) setServices(result || {});
    }).catch(() => {
      if (!canceled) setServices({});
    });
    return () => {
      canceled = true;
    };
  }, [hass, open]);

  if (!open) return null;

  const updateValue = (fieldId: string, value: string) => setValues((current) => ({ ...current, [fieldId]: value }));
  const selectTemplate = (nextTemplateId: BuilderTemplateId) => {
    setTemplateId(nextTemplateId);
    setValues({});
    setSubmitted(false);
  };

  return (
    <div className="modal-backdrop builder-modal-backdrop" role="presentation">
      <button className="modal-scrim" type="button" onClick={onClose} aria-label="Close builder" />
      <section className="modal builder-modal" role="dialog" aria-modal="true" aria-label="Automation and script builder">
        <header className="modal-header">
          <h2>Automation builder</h2>
          <button className="icon-button" type="button" onClick={onClose} title="Close" aria-label="Close builder"><Icon icon="mdi:close" /></button>
        </header>
        <nav className="modal-tabs builder-tabs" aria-label="Builder mode">
          {BUILDER_TEMPLATES.map((item) => (
            <button key={item.id} className={templateId === item.id ? "active" : ""} type="button" onClick={() => selectTemplate(item.id)}>
              <Icon icon={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <form className="builder-form" onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          if (errors.length) return;
          onSubmit(buildAutomationScriptRequest(templateId, values, contextItems));
          setValues({});
          setSubmitted(false);
        }}>
          <div className={`builder-scroll ${isCreateAutomation ? "builder-scroll-simple" : ""}`}>
            {submitted && errors.length ? (
              <div className="builder-errors" role="status">
                {errors.map((error) => <p key={error}>{error}</p>)}
              </div>
            ) : null}
            <div className={`builder-fields ${isCreateAutomation ? "builder-fields-simple" : ""}`}>
              {template.fields.map((field) => (
                <div className={`builder-field ${isCreateAutomation || field.multiline || field.control?.type === "action" ? "wide" : ""}`} key={`${template.id}:${field.id}`}>
                  <span>{field.label}{field.required ? " *" : ""}</span>
                  <BuilderFieldControl
                    field={field}
                    entityOptions={entityOptions}
                    serviceOptions={serviceOptions}
                    notifyServiceOptions={notifyServiceOptions}
                    value={values[field.id] || ""}
                    onChange={(value) => updateValue(field.id, value)}
                  />
                </div>
              ))}
            </div>
            <div className="builder-context" aria-label="Builder context">
              <span>Context</span>
              <div className="builder-context-list">
                {contextItems.length ? contextItems.slice(0, 6).map((item) => (
                  <span className="builder-context-chip" key={`${item.kind}:${item.id}`} title={item.subtitle || item.label}>
                    <Icon icon={iconForContextKind(item.kind)} />
                    {item.label}
                  </span>
                )) : <span className="builder-context-empty">None selected</span>}
                {contextItems.length > 6 ? <span className="builder-context-empty">+{contextItems.length - 6}</span> : null}
              </div>
            </div>
          </div>
          <div className="builder-actions">
            <button className="ghost" type="button" onClick={onClose}>Cancel</button>
            <button type="submit"><Icon icon={template.icon} /><span>{template.label}</span></button>
          </div>
        </form>
      </section>
    </div>
  );
}

function BuilderFieldControl({ field, entityOptions, serviceOptions, notifyServiceOptions, value, onChange }: {
  field: BuilderField;
  entityOptions: EntityOption[];
  serviceOptions: ServiceOption[];
  notifyServiceOptions: ServiceOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const control = field.control;
  if (control?.type === "entity") {
    return (
      <EntitySearchField
        label={field.label}
        placeholder={field.placeholder}
        options={entityOptions}
        selector={control}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (control?.type === "select") {
    return <SelectField ariaLabel={field.label} options={control.options} placeholder={field.placeholder} value={value} onChange={onChange} />;
  }
  if (control?.type === "trigger") {
    return <TriggerField entityOptions={entityOptions} value={value} onChange={onChange} />;
  }
  if (control?.type === "condition") {
    return <ConditionField entityOptions={entityOptions} value={value} onChange={onChange} />;
  }
  if (control?.type === "action") {
    return <ActionField entityOptions={entityOptions} serviceOptions={serviceOptions} notifyServiceOptions={notifyServiceOptions} value={value} onChange={onChange} />;
  }
  if (control?.type === "notification") {
    return <NotificationField serviceOptions={notifyServiceOptions} value={value} onChange={onChange} />;
  }
  if (field.multiline) {
    return (
      <textarea
        value={value}
        placeholder={field.placeholder}
        rows={3}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }
  return (
    <input
      value={value}
      placeholder={field.placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function SelectField({ ariaLabel, options, placeholder, value, onChange }: {
  ariaLabel: string;
  options: BuilderFieldOption[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select aria-label={ariaLabel} value={value} onChange={(event) => onChange(event.currentTarget.value)}>
      <option value="">{placeholder || "Select"}</option>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  );
}

function TriggerField({ entityOptions, value, onChange }: {
  entityOptions: EntityOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [triggerType, setTriggerType] = useState("State");
  const [entityId, setEntityId] = useState("");
  const [detail, setDetail] = useState("on");
  const entityDomains = triggerType === "Numeric state" ? ["sensor", "number", "input_number"] : undefined;
  const update = (nextType = triggerType, nextEntityId = entityId, nextDetail = detail) => {
    onChange(formatTrigger(nextType, nextEntityId, nextDetail));
  };
  return (
    <div className="builder-compound">
      <select value={triggerType} aria-label="Trigger type" onChange={(event) => {
        const nextType = event.currentTarget.value;
        setTriggerType(nextType);
        update(nextType);
      }}>
        <option>State</option>
        <option>Numeric state</option>
        <option>Time</option>
        <option>Sun</option>
        <option>Event</option>
      </select>
      {triggerType === "State" || triggerType === "Numeric state" ? (
        <EntitySearchField
          label="Trigger entity"
          placeholder="Search trigger entity"
          options={entityOptions}
          selector={{ domains: entityDomains }}
          value={entityId}
          onChange={(nextEntityId) => {
            setEntityId(nextEntityId);
            update(triggerType, nextEntityId);
          }}
        />
      ) : null}
      <input
        value={detail}
        placeholder={triggerDetailPlaceholder(triggerType)}
        onChange={(event) => {
          const nextDetail = event.currentTarget.value;
          setDetail(nextDetail);
          update(triggerType, entityId, nextDetail);
        }}
      />
      <small>{value || "No trigger selected"}</small>
    </div>
  );
}

function ConditionField({ entityOptions, value, onChange }: {
  entityOptions: EntityOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [conditionType, setConditionType] = useState("None");
  const [entityId, setEntityId] = useState("");
  const [detail, setDetail] = useState("");
  const update = (nextType = conditionType, nextEntityId = entityId, nextDetail = detail) => {
    onChange(formatCondition(nextType, nextEntityId, nextDetail));
  };
  return (
    <div className="builder-compound">
      <select value={conditionType} aria-label="Condition type" onChange={(event) => {
        const nextType = event.currentTarget.value;
        setConditionType(nextType);
        update(nextType);
      }}>
        <option>None</option>
        <option>State</option>
        <option>Numeric state</option>
        <option>Time</option>
        <option>Sun</option>
        <option>Template</option>
      </select>
      {conditionType === "State" || conditionType === "Numeric state" ? (
        <EntitySearchField
          label="Condition entity"
          placeholder="Search condition entity"
          options={entityOptions}
          selector={{ domains: conditionType === "Numeric state" ? ["sensor", "number", "input_number"] : undefined }}
          value={entityId}
          onChange={(nextEntityId) => {
            setEntityId(nextEntityId);
            update(conditionType, nextEntityId);
          }}
        />
      ) : null}
      {conditionType !== "None" ? (
        <input
          value={detail}
          placeholder={conditionDetailPlaceholder(conditionType)}
          onChange={(event) => {
            const nextDetail = event.currentTarget.value;
            setDetail(nextDetail);
            update(conditionType, entityId, nextDetail);
          }}
        />
      ) : null}
      <small>{value || "No condition"}</small>
    </div>
  );
}

function ActionField({ entityOptions, serviceOptions, notifyServiceOptions, value, onChange }: {
  entityOptions: EntityOption[];
  serviceOptions: ServiceOption[];
  notifyServiceOptions: ServiceOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [actionType, setActionType] = useState("Call service");
  const [serviceId, setServiceId] = useState("");
  const [targets, setTargets] = useState("");
  const [detail, setDetail] = useState("");
  const currentServices = actionType === "Notify" ? notifyServiceOptions : serviceOptions;
  const update = (nextType = actionType, nextServiceId = serviceId, nextTargets = targets, nextDetail = detail) => {
    onChange(formatAction(nextType, nextServiceId, nextTargets, nextDetail));
  };
  return (
    <div className="builder-compound action">
      <select value={actionType} aria-label="Action type" onChange={(event) => {
        const nextType = event.currentTarget.value;
        setActionType(nextType);
        update(nextType);
      }}>
        <option>Call service</option>
        <option>Activate scene</option>
        <option>Notify</option>
        <option>Delay</option>
        <option>Wait for trigger</option>
      </select>
      {actionType === "Call service" || actionType === "Notify" ? (
        <ServiceSearchField
          label="Service"
          options={currentServices}
          placeholder={actionType === "Notify" ? "Search notify service" : "Search service"}
          value={serviceId}
          onChange={(nextServiceId) => {
            setServiceId(nextServiceId);
            update(actionType, nextServiceId);
          }}
        />
      ) : null}
      {actionType === "Call service" ? (
        <EntitySearchField
          label="Action targets"
          placeholder="Search target entities"
          options={entityOptions}
          selector={{ domains: actionTargetDomains(serviceId), multiple: true }}
          value={targets}
          onChange={(nextTargets) => {
            setTargets(nextTargets);
            update(actionType, serviceId, nextTargets);
          }}
        />
      ) : null}
      {actionType === "Activate scene" ? (
        <EntitySearchField
          label="Scene"
          placeholder="Search scene"
          options={entityOptions}
          selector={{ domains: ["scene"] }}
          value={targets}
          onChange={(nextTargets) => {
            setTargets(nextTargets);
            update(actionType, serviceId, nextTargets);
          }}
        />
      ) : null}
      <textarea
        value={detail}
        placeholder={actionDetailPlaceholder(actionType)}
        rows={2}
        onChange={(event) => {
          const nextDetail = event.currentTarget.value;
          setDetail(nextDetail);
          update(actionType, serviceId, targets, nextDetail);
        }}
      />
      <small>{value || "No action selected"}</small>
    </div>
  );
}

function NotificationField({ serviceOptions, value, onChange }: {
  serviceOptions: ServiceOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [serviceId, setServiceId] = useState("");
  const [message, setMessage] = useState("");
  const update = (nextServiceId = serviceId, nextMessage = message) => {
    onChange(nextServiceId || nextMessage ? `Notify using ${nextServiceId || "selected notify service"}${nextMessage ? `: ${nextMessage}` : ""}` : "");
  };
  return (
    <div className="builder-compound">
      <ServiceSearchField
        label="Notify service"
        options={serviceOptions}
        placeholder="Search notify service"
        value={serviceId}
        onChange={(nextServiceId) => {
          setServiceId(nextServiceId);
          update(nextServiceId);
        }}
      />
      <input
        value={message}
        placeholder="Notification message"
        onChange={(event) => {
          const nextMessage = event.currentTarget.value;
          setMessage(nextMessage);
          update(serviceId, nextMessage);
        }}
      />
      <small>{value || "No notification"}</small>
    </div>
  );
}

function EntitySearchField({ label, placeholder, options, selector, value, onChange }: {
  label: string;
  placeholder?: string;
  options: EntityOption[];
  selector: { domains?: string[]; multiple?: boolean };
  value: string;
  onChange: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const selectedValues = splitEntityValues(value);
  const availableOptions = useMemo(() => {
    const domains = selector.domains ? new Set(selector.domains) : null;
    const selected = new Set(selector.multiple ? selectedValues : []);
    return options.filter((option) => {
      if (domains && !domains.has(entityDomain(option.entityId))) return false;
      return !selected.has(option.entityId);
    });
  }, [options, selectedValues, selector.domains, selector.multiple]);
  const filteredOptions = useMemo(() => {
    const needle = (selector.multiple ? query : query || value).trim().toLowerCase();
    const matches = needle
      ? availableOptions.filter((option) => option.searchText.includes(needle))
      : availableOptions;
    return matches.slice(0, 10);
  }, [availableOptions, query, selector.multiple, value]);

  const selectOption = (entityId: string) => {
    if (selector.multiple) {
      const nextValues = [...selectedValues, entityId];
      onChange(nextValues.join(", "));
      setQuery("");
      setOpen(true);
      return;
    }
    onChange(entityId);
    setQuery("");
    setOpen(false);
  };

  if (selector.multiple) {
    return (
      <div className="entity-combobox">
        {selectedValues.length ? (
          <div className="entity-combobox-chips">
            {selectedValues.map((entityId) => (
              <button
                aria-label={`Remove ${entityId}`}
                className="entity-combobox-chip"
                key={entityId}
                type="button"
                onClick={() => onChange(selectedValues.filter((item) => item !== entityId).join(", "))}
              >
                <span>{entityId}</span>
                <Icon icon="mdi:close" />
              </button>
            ))}
          </div>
        ) : null}
        <input
          aria-autocomplete="list"
          aria-expanded={open}
          aria-label={`${label} entity search`}
          autoComplete="off"
          placeholder={placeholder}
          role="combobox"
          value={query}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && filteredOptions[0]) {
              event.preventDefault();
              selectOption(filteredOptions[0].entityId);
            }
          }}
        />
        {open ? <EntitySearchResults options={filteredOptions} onSelect={selectOption} /> : null}
      </div>
    );
  }

  return (
    <div className="entity-combobox">
      <input
        aria-autocomplete="list"
        aria-expanded={open}
        aria-label={`${label} entity search`}
        autoComplete="off"
        placeholder={placeholder}
        role="combobox"
        value={query || value}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
          onChange(event.currentTarget.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && filteredOptions[0]) {
            event.preventDefault();
            selectOption(filteredOptions[0].entityId);
          }
        }}
      />
      {open ? <EntitySearchResults options={filteredOptions} onSelect={selectOption} /> : null}
    </div>
  );
}

function ServiceSearchField({ label, options, placeholder, value, onChange }: {
  label: string;
  options: ServiceOption[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filteredOptions = useMemo(() => {
    const needle = (query || value).trim().toLowerCase();
    const matches = needle ? options.filter((option) => option.searchText.includes(needle)) : options;
    return matches.slice(0, 10);
  }, [options, query, value]);
  const selectOption = (serviceId: string) => {
    onChange(serviceId);
    setQuery("");
    setOpen(false);
  };
  return (
    <div className="entity-combobox">
      <input
        aria-autocomplete="list"
        aria-expanded={open}
        aria-label={`${label} search`}
        autoComplete="off"
        placeholder={placeholder}
        role="combobox"
        value={query || value}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
          onChange(event.currentTarget.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && filteredOptions[0]) {
            event.preventDefault();
            selectOption(filteredOptions[0].serviceId);
          }
        }}
      />
      {open ? <ServiceSearchResults options={filteredOptions} onSelect={selectOption} /> : null}
    </div>
  );
}

function ServiceSearchResults({ options, onSelect }: { options: ServiceOption[]; onSelect: (serviceId: string) => void }) {
  return (
    <div className="entity-combobox-menu" role="listbox">
      {options.length ? options.map((option) => (
        <button key={option.serviceId} type="button" role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => onSelect(option.serviceId)}>
          <strong>{option.label}</strong>
          <small>{option.serviceId}</small>
        </button>
      )) : <div className="entity-combobox-empty">No matches</div>}
    </div>
  );
}

function EntitySearchResults({ options, onSelect }: { options: EntityOption[]; onSelect: (entityId: string) => void }) {
  return (
    <div className="entity-combobox-menu" role="listbox">
      {options.length ? options.map((option) => (
        <button className="entity-combobox-option" key={option.entityId} type="button" role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => onSelect(option.entityId)}>
          <Icon className="entity-combobox-option-icon" icon={entityResultIcon(option.entityId)} />
          <span className="entity-combobox-option-main">
            <strong>{option.label}</strong>
            {option.subtitle ? <small>{option.subtitle}</small> : null}
          </span>
          <span className="entity-combobox-option-badge">{entityDomain(option.entityId)}</span>
        </button>
      )) : <div className="entity-combobox-empty">No matches</div>}
    </div>
  );
}

function buildEntityOptions(states: Record<string, HassEntity>): EntityOption[] {
  return Object.entries(states)
    .map(([entityId, state]) => {
      const friendlyName = String(state.attributes?.friendly_name || entityId);
      const domain = entityDomain(entityId);
      const subtitle = friendlyName === entityId ? "" : entityId;
      return {
        entityId,
        label: friendlyName,
        subtitle,
        searchText: `${entityId} ${friendlyName} ${domain}`.toLowerCase(),
      };
    })
    .sort((a, b) => a.entityId.localeCompare(b.entityId));
}

function buildServiceOptions(services: ServiceRegistry): ServiceOption[] {
  return Object.entries(services).flatMap(([domain, domainServices]) => (
    Object.entries(domainServices || {}).map(([service, details]) => {
      const serviceId = `${domain}.${service}`;
      const label = details.name || serviceId;
      return {
        serviceId,
        label,
        domain,
        searchText: `${serviceId} ${label} ${details.description || ""}`.toLowerCase(),
      };
    })
  )).sort((a, b) => a.serviceId.localeCompare(b.serviceId));
}

function splitEntityValues(value: string): string[] {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function entityDomain(entityId: string): string {
  return entityId.split(".")[0] || "";
}

function entityResultIcon(entityId: string): string {
  switch (entityDomain(entityId)) {
    case "automation":
      return "mdi:robot-industrial-outline";
    case "binary_sensor":
      return "mdi:checkbox-marked-circle-outline";
    case "button":
    case "input_button":
      return "mdi:gesture-tap-button";
    case "climate":
      return "mdi:thermostat";
    case "cover":
      return "mdi:window-shutter";
    case "fan":
      return "mdi:fan";
    case "light":
      return "mdi:lightbulb-outline";
    case "lock":
      return "mdi:lock-outline";
    case "media_player":
      return "mdi:play-circle-outline";
    case "scene":
      return "mdi:palette-outline";
    case "script":
      return "mdi:script-text-outline";
    case "sensor":
      return "mdi:gauge";
    case "switch":
      return "mdi:toggle-switch-outline";
    default:
      return "mdi:home-assistant";
  }
}

function formatTrigger(type: string, entityId: string, detail: string): string {
  if (type === "Time") return detail ? `At ${detail}` : "";
  if (type === "Sun") return detail ? `Sun ${detail}` : "";
  if (type === "Event") return detail ? `Event ${detail}` : "";
  if (!entityId) return "";
  if (type === "Numeric state") return `${entityId} numeric state ${detail || "matches threshold"}`;
  return `${entityId} turns ${detail || "on"}`;
}

function formatCondition(type: string, entityId: string, detail: string): string {
  if (type === "None") return "";
  if (type === "Time") return detail ? `Time condition: ${detail}` : "";
  if (type === "Sun") return detail ? `Sun condition: ${detail}` : "";
  if (type === "Template") return detail ? `Template condition: ${detail}` : "";
  if (!entityId) return "";
  if (type === "Numeric state") return `${entityId} numeric condition ${detail || "matches threshold"}`;
  return `${entityId} is ${detail || "on"}`;
}

function formatAction(type: string, serviceId: string, targets: string, detail: string): string {
  if (type === "Delay") return detail ? `Delay ${detail}` : "";
  if (type === "Wait for trigger") return detail ? `Wait for ${detail}` : "";
  if (type === "Activate scene") return targets ? `Activate ${targets}` : "";
  if (type === "Notify") return serviceId || detail ? `Notify using ${serviceId || "selected notify service"}${detail ? `: ${detail}` : ""}` : "";
  if (!serviceId && !targets && !detail) return "";
  return `Call ${serviceId || "selected service"}${targets ? ` on ${targets}` : ""}${detail ? ` with ${detail}` : ""}`;
}

function triggerDetailPlaceholder(type: string): string {
  if (type === "Numeric state") return "above 20, below 50";
  if (type === "Time") return "07:30:00";
  if (type === "Sun") return "sunset offset -00:30:00";
  if (type === "Event") return "event_type or event data";
  return "on, off, home, open";
}

function conditionDetailPlaceholder(type: string): string {
  if (type === "Numeric state") return "above 20";
  if (type === "Time") return "after 22:00 before 06:00";
  if (type === "Sun") return "after sunset";
  if (type === "Template") return "{{ condition }}";
  return "state value";
}

function actionDetailPlaceholder(type: string): string {
  if (type === "Delay") return "00:05:00";
  if (type === "Wait for trigger") return "binary_sensor.door turns off";
  if (type === "Notify") return "Notification message";
  return "Optional service data";
}

function actionTargetDomains(serviceId: string): string[] | undefined {
  const domain = serviceId.split(".")[0];
  if (!domain || domain === "homeassistant") return undefined;
  if (domain === "scene") return ["scene"];
  if (domain === "script") return ["script"];
  return [domain];
}
