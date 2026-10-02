# AGENTS.md

## Project summary and core loop
Make items → merge up the tier chains → finish townsfolk requests for coins, energy and stars → stars from requests and repairs unlock six story chapters → coins fund twenty step-by-step repairs to the café, pier, garden and Gazette. The epilogue ends the finite campaign; boards remain available for free play. This is a cozy no-fail game with no timer or lives.

## How to play / controls
Tap a generator (🏪 🧺 🎣 🗄️) to spend 1⚡ and make a base item. Drag two identical items together to merge them into the next tier. Review a townsfolk request and deliver its item to earn coins, energy and ⭐, unlock story chapters and fund harbor repairs.
Controls: Tap a generator to make an item. Drag an item onto a matching one to merge it, or tap two items one after the other. Tap an item to see its merge chain. Open a townsfolk card to review or deliver a request. Story shows campaign requirements; each paid Restore improvement plays a short, skippable before/work/after illustrated sequence. Picnic is an optional one-time bonus board with shared energy, milestone rewards, and a help sheet. Guide explains no-fail play and contains a confirm-before-erasing restart option. 🔊 turns sound on or off.

## Important files
- `/index.html` — entry point: importmap, canvas/DOM shell, script bootstrap
- `/rosebud-game-defaults.css` — project file
- `/rosebud-game-defaults.js` — game module
- `/art_direction.md` — visual direction used for generated art
- `/sound_direction.md` — audio direction used for generated sound
- `/main.js` — game bootstrap and main loop

## Assets and audio
Images: `assets/char-iris.webp`, `assets/char-mae.webp`, `assets/char-theo.webp`, `assets/harbor-bg.webp`, and illustrated before/after restoration scenes for the café, pier, garden, and Gazette under `assets/restore-*-before.webp` and `assets/restore-*-scene.webp`.
Audio: `assets/audio/harbor-music.mp3`, `assets/audio/merge-pop.mp3`
Sound direction: - Music: gentle, loopable ukulele/marimba cozy harbor tune - SFX: bright merge pop; extra feedback uses WebAudio beeps
Playback note: reference media as `assets/...`; browsers start audio only after the first user gesture.

## Notes for future edits
All logic is in main.js and renders to the DOM (the whole screen is rebuilt on each render). Item families and tier chains are emoji lists in FAMILIES; the story is in CHAPTERS and the locations are in LOCATIONS. The portrait-first merge boards use 7 columns × 8 rows, and older 7 × 7 saves are expanded without resetting progress. Progress is saved to localStorage under 'harbor-whispers-v1'. The event board is state.boards.event and uses the shell family.

## Latest validation status
Static validation and runtime checks should be rerun after gameplay or UI changes; report the current result rather than assuming an earlier pass still applies.
