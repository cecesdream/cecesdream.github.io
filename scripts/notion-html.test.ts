import { test } from "node:test";
import assert from "node:assert/strict";
import { isSafeSlug, richTextToHTML, safeHref } from "./notion-html.ts";

const link = (plain_text: string, href: string) => ({ plain_text, href, annotations: {} });

test("script links from Notion are dropped, their text kept", () => {
  for (const href of ["javascript:alert(1)", " JavaScript:alert(1)", "data:text/html,<script>alert(1)</script>", "vbscript:x"]) {
    assert.equal(richTextToHTML([link("click", href)]), "click", href);
  }
});

test("web, mail and phone links are kept", () => {
  assert.equal(
    richTextToHTML([link("donate", "https://cecesdream.org/donate")]),
    '<a href="https://cecesdream.org/donate">donate</a>',
  );
  assert.equal(safeHref("mailto:cece@cecesdream.org"), "mailto:cece@cecesdream.org");
  assert.equal(safeHref("tel:+15555550100"), "tel:+15555550100");
});

test("Notion's relative page links are dropped", () => {
  assert.equal(safeHref("/1a2b3c4d5e6f"), null);
});

test("a quote in a link cannot break out of the attribute", () => {
  const html = richTextToHTML([link("x", 'https://e.com/"onmouseover="alert(1)')]);
  assert.ok(!html.includes('"onmouseover'), html);
});

test("text is escaped", () => {
  assert.equal(richTextToHTML([{ plain_text: "<img src=x onerror=alert(1)>", annotations: {} }]), "&lt;img src=x onerror=alert(1)&gt;");
});

test("slugs must be plain hyphenated words", () => {
  assert.ok(isSafeSlug("nine-out-of-ten"));
  for (const slug of ["../../src/main", "a/b", "Nine", "a b", "", "-a", "a--b"]) {
    assert.ok(!isSafeSlug(slug), slug);
  }
});
