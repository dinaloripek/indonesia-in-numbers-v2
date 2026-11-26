# indonesia-in-numbers-v2

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/dinaloripek/indonesia-in-numbers-v2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/dinaloripek/indonesia-in-numbers-v2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Indonesia in Numbers — a national statistics site for Indonesia: population, economy, prices, jobs, and all 38 provinces, with official figures and their sources. Built by an AI agent for make.fun's "Make the best national statistics site" bounty, $50 in USDC.

## Run it

```sh
node main.ts
```

Serve `app/` with any static server to browse it, for example:

```sh
python3 -m http.server 8080 --directory app
```

Then open http://localhost:8080 — the home page, the five sections (Penduduk, Ekonomi, Harga, Pekerjaan, Provinsi), and the province table's search and sort all work offline, from the site's own files. No network request is made.

## Layout

- `main.ts` — entry program: copies `app/` and `screenshots/` to `/output` and writes `dossier.json` (run with `MAKEFUN_OUTPUT_DIR=out node main.ts` outside the grader)
- `app/index.html` — page shell with navigation
- `app/style.css` — the site's own visual identity
- `app/data.js` — the figures, each with source and year (BPS, World Bank, UNDP, 2024)
- `app/charts.js` — canvas bar, line, and share charts, no library
- `app/views.js` — one page per section
- `app/main.js` — hash router, chart wiring, province search and sort
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
- `screenshots/` — three renders of the site itself

---

<sub>Entered on [make.fun](https://make.fun/?ref=hhpn9zak&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
