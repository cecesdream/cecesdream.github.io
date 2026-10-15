// Turns Notion rich text into the HTML that Story.tsx renders with
// dangerouslySetInnerHTML. Anything a Notion editor (or a leaked Notion token)
// can type ends up on cecesdream.org, so text is escaped and links are limited
// to schemes that cannot run script.

export function escapeHTML(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function escapeAttr(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const SAFE_SCHEMES = new Set(["http:", "https:", "mailto:", "tel:"]);

/** The href if it is an absolute http(s), mailto or tel link; otherwise null. */
export function safeHref(href: string): string | null {
  try {
    // No base URL: relative links (Notion's own "/<page id>" mentions) throw
    // and are dropped, since they point nowhere on this site.
    const url = new URL(href.trim());
    return SAFE_SCHEMES.has(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

/** Slugs become file names and URL paths, so only lowercase words joined by hyphens. */
export function isSafeSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function richTextToHTML(rich: any[]): string {
  return rich
    .map((r) => {
      let text = escapeHTML(r.plain_text);
      const a = r.annotations || {};
      if (a.bold) text = `<strong>${text}</strong>`;
      if (a.italic) text = `<em>${text}</em>`;
      if (a.code) text = `<code>${text}</code>`;
      const href = r.href ? safeHref(r.href) : null;
      if (href) text = `<a href="${escapeAttr(href)}">${text}</a>`;
      return text;
    })
    .join("");
}
