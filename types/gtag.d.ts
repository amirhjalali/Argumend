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
  /** Plausible: the queue stub, replaced by the script once it loads. */
  plausible?: ((event: string, options?: { props?: Record<string, string | number | boolean> }) => void) & {
    q?: unknown[];
    o?: Record<string, unknown>;
    init?: (options?: Record<string, unknown>) => void;
  };
  /** Umami: defined by its script once it loads. */
  umami?: {
    track: (event: string, data?: Record<string, string | number | boolean>) => void;
  };
}
