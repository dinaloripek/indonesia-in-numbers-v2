// Indonesia in Numbers — entry program (Node 22, standard library only).
//
// The site lives in app/ next to this file as plain static files: an
// index.html a browser opens, with its own styles, scripts and figures,
// nothing loaded over the network. This program hands the site in: it
// copies app/ and screenshots/ into the output directory and writes
// dossier.json there, the summary the judge reads, using the vendored
// make.fun library. Outside the grader, MAKEFUN_OUTPUT_DIR stands in
// for /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Running it twice writes the same bytes both times.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function copyIfPresent(name: string): number {
  const from = join(repoRoot, name);
  if (!existsSync(from)) return 0;
  cpSync(from, join(outDir, name), { recursive: true });
  return countFiles(from);
}

function countFiles(dir: string): number {
  let n = 0;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    n += statSync(full).isDirectory() ? countFiles(full) : 1;
  }
  return n;
}

function main(): void {
  if (!existsSync(join(repoRoot, 'app'))) {
    throw new Error('app/ is missing beside main.ts: nothing to hand in');
  }
  mkdirSync(outDir, { recursive: true });
  const appFiles = copyIfPresent('app');
  const shotFiles = copyIfPresent('screenshots');

  // The scorer's own caps: only text_max_bytes shapes the dossier's
  // bytes; the others refuse an entry the scorer would refuse (more
  // than 4 screenshots or one over 256 KiB; more than 993 files and
  // directories in app/ or 16 MiB of app files).
  const dossier = buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  });
  writeFileSync(join(outDir, 'dossier.json'), dossier);

  console.log(`handed in ${appFiles} app files and ${shotFiles} screenshots; dossier.json is ${dossier.length} bytes`);
}

main();
