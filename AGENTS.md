# AGENTS.md

## Working with the owner

- The owner is a developer who **always runs `npm run dev` themselves** and keeps the code open in an editor. **Never start or kill the dev server.** Agents must never run the project themselves.
- They edit files in parallel with you. Re-read files before editing; don't assume the version you saw earlier is still current.
- **Never take unconfirmed actions.** No `git commit`, `push`, `build`, `deploy`, installs, or other state-changing commands without explicit approval from the owner first.
- The owner drives. Do only what they asked; don't act alone.

## Commands

- `npm run dev` — dev server on **port 5174, HTTPS only**
- `npm run build` — runs `tsc && vite build` (typecheck is part of build; no separate typecheck script)
- `npm run lint` — uses `--max-warnings=-1`: **any warning fails the lint**
- `npm run deploy` — `gh-pages -d dist` (predeploy runs build)
- No test framework or test scripts exist

## Dev server HTTPS certs (gotcha)

`vite.config.ts` serves HTTPS with explicit cert paths and no auto-generation (`vite-plugin-mkcert` is installed but **not** registered). On a fresh clone `npm run dev` fails until certs exist:

```sh
mkcert -key-file certs/localhost+3-key.pem -cert-file certs/localhost+3.pem localhost 127.0.0.1 ::1 <LAN-IP>
```

- `certs/` is gitignored; certs must match the exact filenames in `vite.config.ts`
- HTTPS is required because the Gamepad API only works in secure contexts; `host: true` enables LAN/device testing

## Architecture

- No framework — plain TS. `src/main.ts` builds the Phaser game config and mounts it into `#phaser-game-container` (div in `index.html`); also starts the DOM UI (mobile controls, gamepad status)
- Shared input: `src/game/input/input-state.ts` (`keysPressed` array + `lastKey`) is the single source of truth, written by `Input` (keyboard), `GamepadInput`, `MobileInput` and read by `PlayerMovement`/`PlayerAttack`; direction keys `press` (unshift), action keys `push`
- `GameScene` only wires pause/ESC and delegates everything to `AreaScene` (sub-scene pattern) with `SetupManager`/`UpdateManager`
- Scenes: `MenuScene` (start), `GameScene`, `PauseScene`
- DOM UI (`src/ui/`): `MobileControls` and `GamepadStatus` are plain TS classes that create DOM elements and import their own SCSS; game logic in `src/game/`

## Code conventions / gotchas

- Phaser is referenced as a **global namespace** (`Phaser.Scene`) in some files without an import — works because Phaser's bundled d.ts declares a global; don't "fix" the missing import
- `vite.config.ts` sets `base` to `/zelda-clone/` in production (gh-pages) and `/` in dev — affects absolute asset URLs and the PWA `start_url`
- Game images in `src/assets/` are imported as Vite modules and passed to the Phaser loader (`src/game/assets/global-assets.ts`, `src/game/areas/areas.ts`) — add new assets this way, not via string paths
- Camera follows the player (`setup-player.ts`), so the player stays centered on screen — verify movement by world scroll, not sprite position
- **File naming:** every file and directory under `src/` is **kebab-case** (`player-movement.ts`, `area-scene/`). Dot suffixes stay (`area.types.ts`, `cursors.interface.ts`); class/type identifiers remain PascalCase. No lint enforcement — follow the convention manually.
- Prettier: single quotes, tabWidth 4, printWidth 120 (no format script; use `npx prettier --write .`)
- No CI in repo (`.github` is gitignored)
