# cecesdream.org

The marketing site for CECE's Dream: React, Vite and Tailwind, deployed to
GitHub Pages (custom domain in `public/CNAME`).

## Run locally

```sh
npm install --legacy-peer-deps
npm run dev        # http://localhost:3000
```

Judge layout and performance on the production build, not the dev server:

```sh
npm run build && npm run preview
```

## Test

```sh
npx playwright install chromium webkit   # once
npm run e2e
```

`e2e/` runs against the production build on iPhone (WebKit), iPhone SE,
Android and desktop profiles: the mobile menu, no sideways scroll on any
page, the not-found page, the globe, Zeffy's deferred loading, and the
prerendered titles and preview tags. CI runs it on every pull request
(`.github/workflows/test.yml`). Zeffy is blocked in tests.

## Deploy

Every push to `main` builds and deploys (`.github/workflows/deploy.yml`).

## Stories

Stories are written in Notion. `.github/workflows/sync-stories.yml` pulls them
nightly into `src/data/posts.json` and `public/story-images/`, commits, and
redeploys. Run it by hand from Actions → "Sync stories from Notion" to publish
straight away. Locally: `npm run sync-stories` with `NOTION_API_TOKEN` and
`NOTION_STORIES_DB_ID` in `.env.local`.

## Donations and newsletter

Both are Zeffy embeds (`src/components/ZeffyForm.tsx`). Zeffy's Cloudflare
blocks headless browsers; test those forms in a visible browser.
