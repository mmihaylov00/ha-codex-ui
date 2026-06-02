/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "ha-icon": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      icon?: string;
    };
  }
}
