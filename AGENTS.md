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

## Assets — Ninja Adventure pack

- Source lives **only locally** in `src/assets/OG/Ninja Adventure - Asset Pack/` (path has spaces — quote it). It is gitignored and **must never be committed**; README explains where to download it. License: CC0 (Pixel-Boy / AAA), see the pack's `README.md`.
- **Native grid is 16×16, the game world is 4×** (map tiles 64px, player frames 144px, custom enemies 96px). Upscale every asset you use with nearest-neighbour before referencing it, and keep the copies inside gitignored `src/assets/OG/ninja-4x/`:
  `magick "src/assets/OG/Ninja Adventure - Asset Pack/<file>.png" -filter point -resize 400% "src/assets/OG/ninja-4x/<file>.png"`
- Code imports and Tiled `.tsx` files always point at the **4× copies**, never the raw pack (see `global-assets.ts`, `home.assets.ts`, and the old `Tilemap_color1.tsx` pattern).
- **Player stays custom** (`src/assets/characters/player/player.png`, 144×144 frames) — never replace it with pack art.
- Pack layout (check `AllPreview.png` / `*Preview.gif` for visuals):
  - `Actor/Character/<Name>/` — `SpriteSheet.png` 64×112 = 4 cols × 7 rows of 16×16 (at 4×: 256×448, 64px frames). Columns = facing **down, up, left, right**; rows = move `0–3`, attack `4`, jump `5`, dead/item `6` (mapping from the original game's `sprite_character.gd`). `Faceset.png` = 38×38 portrait; colour variants are separate folders (`Knight`/`KnightGold`).
  - `Actor/Monster/<Name>/` — `SpriteSheet.png` 64×64 = same 4 direction columns × 4 walk frames (at 4×: 256×256, 64px frames); 40 monsters.
  - `Actor/Animal/<Name>/` — `SpriteSheet*.png` 32×16 = 2 side-view frames (at 4×: 128×64, 64px frames), flip X for direction; `*Side` variants are four-legged walks.
  - `Actor/Boss/<Name>/` — one horizontal strip per animation (`Idle`, `Walk`, `Attack`, `Hit`…), ~50px frames, no fixed grid; preview the GIF before wiring.
  - `Actor/CharacterAnimated/NinjaGreen/` — full ninja; prefer `Separate/*.png` over the combined `SpriteSheet.png`. Strips are 4 direction columns (down/up/left/right) × N frames, in **32×32 cells with 16×16 art centred** (at 4×: 128×128, 32px art). `Weapon/*.png` = in-hand overlays.
  - `Backgrounds/Tilesets/` — 20 terrain tilesets, all 16×16 (Field, Nature, House, Interior/InteriorFloor/WallSimple, Water, Desert, Dungeon, VillageAbandoned, Relief/ReliefDetail, Floor/FloorB/FloorDetail, Element, Towers, Hole, Pipes, camp, bed). `TilesetLogic.png` = palette/marker tiles, not collision. `TilesetFloor.png` is 352×417 (extra transparent row) — ignore the stray pixel row in the TSX.
  - `Backgrounds/Animated/` — flags, flowers, plants, waterfall, water ripples, quicksand, watermill, conveyor; `*Preview.gif` shows the result.
  - `Items/` — single PNGs (`Weapons/<Weapon>/{Sprite,SpriteInHand}.png`, Treasure, Potion, Food, Tool, Projectile, Resource, Scroll); `AllPreview.png`.
  - `FX/` — effect sheets (Slash, Attack, Magic, Elemental, Projectile, Particle, Smoke); `AllPreview.png`.
  - `Ui/` — Dialog boxes/buttons, hearts/lifebar (`Receptacle`), emotes, input icons, skill icons, bitmap fonts (`Font/font8x8.png`, `font24x30.png`) + TTF, `Theme/Theme Wood` 9-slice UI. Ignore `Ui/Theme/Wip/` (unfinished).
  - `Audio/` — `.ogg`: 41 musics, 132 sounds, 15 jingles.
- Tiled wiring (unchanged): create a `.tsx` next to the area map with the **4× image and 64×64 tiles**, import it in `<area>.assets.ts` as `tilesetImages` (`name` must equal the TSX name); keep `collisions`/`doors` object layers and y-sorted `Buildings`/`Decor` tile layers that `area-scene.ts` expects.

## Code conventions / gotchas

- Always import Phaser explicitly: `import Phaser from 'phaser';` at the top of any file that references `Phaser.*` (types or values). Phaser does set `globalThis.Phaser` as a side effect, but relying on it is fragile — a type-only reference would pass `tsc` yet throw `ReferenceError` at runtime
- `vite.config.ts` sets `base` to `/zelda-clone/` in production (gh-pages) and `/` in dev — affects absolute asset URLs and the PWA `start_url`
- Game images in `src/assets/` are imported as Vite modules and passed to the Phaser loader (`src/game/assets/global-assets.ts`, `src/game/areas/areas.ts`) — add new assets this way, not via string paths
- Camera follows the player (`setup-player.ts`), so the player stays centered on screen — verify movement by world scroll, not sprite position
- **File naming:** every file and directory under `src/` is **kebab-case** (`player-movement.ts`, `area-scene/`). Dot suffixes stay (`area.types.ts`, `cursors.interface.ts`); class/type identifiers remain PascalCase. No lint enforcement — follow the convention manually.
- Prettier: single quotes, tabWidth 4, printWidth 120 (no format script; use `npx prettier --write .`)
- No CI in repo (`.github` is gitignored)
