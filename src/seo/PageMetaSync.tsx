import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { metaFor, NOT_FOUND_META } from "./pageMeta";

/**
 * Keeps the tab title and description in step with in-app navigation. The
 * prerendered HTML (scripts/prerender.ts) carries the same values for
 * crawlers and link previews, which never run this.
 */
export default function PageMetaSync() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = metaFor(pathname) ?? NOT_FOUND_META;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [pathname]);

  return null;
}
