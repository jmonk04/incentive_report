# NTAG Southwest Incentive Report

Web-deployed weekly incentive report for NRS performance tracking.

## URLs (after deployment)

- **Public viewer**: `https://jmonk04.github.io/incentive-report/`
- **Admin tool**:    `https://jmonk04.github.io/incentive-report/tool.html`

## Files in this repo

| File | Purpose | Edit weekly? |
|---|---|---|
| `index.html` | Public viewer — what teammates see | No |
| `tool.html`  | Admin generator — Excel uploads, generate, export | No |
| `report.js`  | Shared rendering & calculation logic | No |
| `report.css` | Shared styles | No |
| `data.json`  | The deployed data (current week + history) | **Yes — replace weekly** |

## Weekly update workflow

1. Open the **admin tool** (`tool.html`) — either the live URL or this file locally.
2. Upload your current-week Excel, last week's Excel, and any historical weeks (same as before).
3. Set the cutoff date and click **Generate Report**.
4. Click **Export data.json (Deploy)** — a `data.json` file downloads.
5. Go to this GitHub repo → click `data.json` → click the trash icon to delete it → commit.
6. Click **Add file** → **Upload files** → drag in the new `data.json` → commit.
7. Wait ~60 seconds. The public viewer URL will show the new data.

> **Tip:** GitHub also lets you upload a file with the same name to overwrite the existing one in one step — drag the new `data.json` onto the repo file list and it'll prompt you to replace.

## First deployment (one-time setup)

1. Create a public repo named `incentive-report` on github.com.
2. Upload all five files in this folder.
3. Settings → Pages → Source: **Deploy from a branch** → Branch: **main** / **(root)** → Save.
4. Wait 2–5 minutes for the first build.
5. The viewer is live at `https://YOUR-USERNAME.github.io/incentive-report/`.

## How it works

- The viewer (`index.html`) fetches `data.json` from the same folder when it loads.
- All data processing happens in the browser — Excel files uploaded to the tool stay on your machine.
- The viewer has no upload UI by design. It only ever shows what's in `data.json`.
- Bumped a comma somewhere? Open browser DevTools (F12) → Console for the exact JSON parsing error.
