import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Disable browser's native scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Immediate scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // 'auto' is the standard for instant scroll
    });

    // Fallback for cases where layout shifts after the next frame
    const frameId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  return null;
}
