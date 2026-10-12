import { useEffect, useState, type RefObject } from "react";

// Progress (0..1) through a pinned section, mapped by `select`. The state lives
// in the component that draws it and only changes when `select`'s result does,
// so scrolling doesn't re-render the whole page every frame.
export function useStickyScrollProgress<T>(ref: RefObject<HTMLElement | null>, select: (p: number) => T): T {
  const [value, setValue] = useState(() => select(0));

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // Total distance the user scrolls vertically while the container is pinned
      const totalScroll = rect.height - window.innerHeight;
      // How far down the pinned container has traveled
      let p = -rect.top / totalScroll;
      if (!isFinite(p) || isNaN(p)) p = 0;
      setValue(select(Math.max(0, Math.min(1, p))));
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    const timeout = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timeout);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, select]);

  return value;
}
