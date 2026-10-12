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
