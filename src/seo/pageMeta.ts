import posts from "../data/posts.json";

export const SITE_URL = "https://cecesdream.org";
const SITE_NAME = "CECE's Dream";
const DEFAULT_IMAGE = "/og-image.jpg";

export interface PageMeta {
  title: string;
  description: string;
  /** Site-relative path to the preview image. */
  image: string;
}

const PAGES: Record<string, PageMeta> = {
  "/": {
    title: "CECE's Dream | Empowering Education Through Sponsorship in Liberia",
    description:
      "CECE's Dream is dedicated to breaking barriers to education in Liberia. We provide tuition assistance and support to empower students and build sustainable futures.",
    image: DEFAULT_IMAGE,
  },
  "/about": {
    title: `Our Mission | ${SITE_NAME}`,
    description:
      "Why CECE's Dream exists: breaking barriers to education and entrepreneurship in Liberia. Our founder's story and our board of directors.",
    image: DEFAULT_IMAGE,
  },
  "/blog": {
    title: `Stories | ${SITE_NAME}`,
    description:
      "Updates, impact reports and stories of resilience from the students and communities CECE's Dream serves in Liberia.",
    image: DEFAULT_IMAGE,
  },
  "/donate": {
    title: `Donate | ${SITE_NAME}`,
    description: "Sponsor a student in Liberia. Every donation goes directly to tuition assistance and supplies.",
    image: DEFAULT_IMAGE,
  },
  "/contact": {
    title: `Contact | ${SITE_NAME}`,
    description: "Get in touch with CECE's Dream about sponsoring a student, volunteering or partnering with us.",
    image: DEFAULT_IMAGE,
  },
};

export const NOT_FOUND_META: PageMeta = {
  title: `Page not found | ${SITE_NAME}`,
  description: PAGES["/"].description,
  image: DEFAULT_IMAGE,
};

function storyMeta(slug: string): PageMeta | undefined {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return undefined;
  return { title: `${post.title} | ${SITE_NAME}`, description: post.excerpt, image: post.image || DEFAULT_IMAGE };
}

/** Meta for a path, or undefined when the path is not a page. */
export function metaFor(path: string): PageMeta | undefined {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  if (PAGES[clean]) return PAGES[clean];
  const story = clean.match(/^\/blog\/([^/]+)$/);
  return story ? storyMeta(story[1]) : undefined;
}

/** Every page path, for prerendering and the sitemap. */
export function allPaths(): string[] {
  return [...Object.keys(PAGES), ...posts.map((p) => `/blog/${p.slug}`)];
}
