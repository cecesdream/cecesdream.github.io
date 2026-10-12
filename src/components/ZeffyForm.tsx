import { useEffect, useRef, useState } from "react";

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
 *
 * Zeffy's script brings Cloudflare and reCAPTCHA with it, and the newsletter
 * form sits on every page above the footer, so nothing loads until the form is
 * within a screen or two of the viewport.
 */
export default function ZeffyForm({ formPath, title, fallbackHeight = 800 }: ZeffyFormProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
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
  }, [formPath, near]);

  return (
    <div ref={rootRef}>
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
