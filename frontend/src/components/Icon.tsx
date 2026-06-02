import React from "react";

export function Icon({ icon, className, title }: { icon: string; className?: string; title?: string }) {
  return React.createElement("ha-icon", { icon, className, title });
}
