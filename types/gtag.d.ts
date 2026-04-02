interface GtagEventParams {
  [key: string]: string | number | boolean | undefined;
}

interface Window {
  gtag?: (
    command: "event" | "config" | "js" | "set",
    targetOrAction: string | Date,
    params?: GtagEventParams
  ) => void;
  dataLayer?: unknown[];
}
