# NRS Incentive Report Generator

A browser-based tool for generating weekly NRS incentive reports from station performance workbooks. Built for NTAG Southwest recruiting operations.

**Live tool:** https://jmonk04.github.io/incentive-report/

## What it does

Processes a weekly performance workbook and produces a dark "ops center"-style report classifying stations into ALNAV glideslope tiers:

- **Zeus** — ≥140% ALNAV
- **Poseidon** — ≥120% ALNAV
- **Triton** — ≥100% ALNAV
- **On the Cusp** — ≥75% and <100%

Click any station card to open a detailed side panel with sub-goal breakdowns, historical trend chart, contract projections, mission area progress, and tier ladder.

## How to use

1. Open the live tool URL above in any browser.
2. **Section 01 — Current Week:** drop in this week's `.xlsx` workbook. Required sheet: `Annual Goals & Attn`.
3. **Section 02 — Previous Week (optional):** drop in last week's workbook to enable the "Weekly Warriors" section (top 5 week-over-week glideslope gains).
4. **Section 03 — Historical Weeks (optional):** drop in multiple prior workbooks. Filenames prefixed `1_`, `2_`, `3_` etc. will sort chronologically. Powers the trend chart, hot-streak indicator, and rank-change comparison in the station detail panel.
5. **Section 04 — Report Cutoff Date:** enter the cutoff in `DDMMMYY` format (e.g. `04DEC25`). Drives production-day calculations and projections (+5 and +10 production days).
6. Click **Generate Report**.
7. Export the result as PNG or PDF using the buttons above the report.

## Source workbook format

The tool reads from the `Annual Goals & Attn` sheet. Expected columns:

| Column | Used for |
|---|---|
| `STATIONS` | Station name |
| `ALNAV GLIDESLOPE %` | Tier classification, ranking, trend |
| `ALNAV GOAL` / `ALNAV ATTN` | Contract projections |
| `AC GLIDESLOPE %` / `AC GOAL` / `AC ATTN` | Active Component sub-goal |
| `NSO GLIDESLOPE %` / `NSO GOAL` / `NSO ATTN` | Navy Special Ops sub-goal |
| `NUKE GLIDESLOPE %` / `NUKE GOAL` / `NUKE ATTN` | Nuclear Field sub-goal |

Glideslope percentages can be stored as decimals (1.40) or whole numbers (140); the tool auto-detects and normalizes.

## Privacy

All file processing happens locally in the browser. No workbook data ever leaves the user's machine — nothing is uploaded to GitHub, Anthropic, or any server. The tool is just static HTML, JavaScript, and CSS executing in the browser.

## Technical notes

- Single self-contained HTML file. All libraries (SheetJS for `.xlsx` parsing, jsPDF + html2canvas for export) are inlined directly into `index.html`.
- No external CDN dependencies — works on networks where Cloudflare CDN and similar are blocked.
- Google Fonts (Geist) loaded online when available; falls back to system sans-serif if not.
- File size: ~1.5 MB. Larger than a typical static page, but loads once and is cached by the browser thereafter.

## Updating the tool

To deploy a new version:

1. Generate the updated `index.html` locally.
2. In this repo: delete the existing `index.html`, then upload the new one via **Add file → Upload files**.
3. Confirm the filename is exactly `index.html` (no version suffix, no `.txt`).
4. Commit. GitHub Pages rebuilds in 1–3 minutes.
5. Hard-refresh the live URL (Ctrl+Shift+R) to bypass the browser cache.
