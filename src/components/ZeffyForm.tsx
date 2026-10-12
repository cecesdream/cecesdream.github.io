import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://www.zeffy.com/embed/v2/zeffy-embed.js";

declare global {
  interface Window {
    Zeffy?: { embed?: { init: () => void } };
  }
}

interface ZeffyFormProps {
  /** The form's path on zeffy.com, as in the embed code's data-form-url. */
  formPath: string;
  title: string;
  /** Height of the plain-iframe fallback, shown only if Zeffy's script can't load. */
  fallbackHeight?: number;
}

/**
 * Zeffy's embed script scans the page for `[data-zeffy-embed]` once, when it
 * loads. This is a single-page app, so the second visit to /donate has no
 * page load: the script is added once and `Zeffy.embed.init()` is called on
 * every mount after that. If the script can't load (an ad blocker, say), the
 * plain iframe Zeffy supplies as a fallback is shown instead.
 */
export default function ZeffyForm({ formPath, title, fallbackHeight = 800 }: ZeffyFormProps) {
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const showFallback = () => {
      const box = fallbackRef.current;
      if (!box) return;
      box.style.display = "block";
      const frame = box.querySelector("iframe");
      if (frame && !frame.src) frame.src = `https://www.zeffy.com${formPath}`;
    };

    if (window.Zeffy?.embed) {
      window.Zeffy.embed.init();
      return;
    }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("error", showFallback);
    return () => script?.removeEventListener("error", showFallback);
  }, [formPath]);

  return (
    <div>
      <div data-zeffy-embed data-form-url={formPath} />
      <div data-zeffy-embed-fallback ref={fallbackRef} style={{ display: "none" }}>
        <div className="relative overflow-hidden w-full" style={{ height: fallbackHeight }}>
          <iframe
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
}
