# Architecture

The exact 1448 × 1086 supplied panel is a locked `<image>` in an SVG scene. Source pixels are the shared coordinate system for every overlay. Zoom and pan use the outer viewBox, so all layers remain aligned.

- `src/kit/kit-definition.ts`: stable IDs, base coordinates, interaction types, electrical classification, reusable kit metadata and keep-out rectangles.
- `src/wiring/render.js`: layered cable curves, shaded plugs, cropped button/knob assets, live control overlays and connection table.
- `src/routing/router.js`: obstacle-aware route generation and rounded quadratic path conversion.
- `src/simulation/engine.js`: control-to-socket signals, connected-net propagation and graph-level checks.
- `src/experiments/experiments.js`: P01, switch and analog examples plus blank project.
- `src/storage/projects.js`: local recovery, named projects, validated import and downloads.
- `src/export/exporter.js`: clean SVG/PNG/print export using original raster image and vector overlays.
- `src/app/main.js`: editor actions, pointer/keyboard handlers, selection, history and feature-detected WebMCP.

Calibration is a project-level override keyed by immutable component ID. `calibratedKit` merges it into the active registry. Save calibration also sets the browser's default for subsequent projects. Download kit-definition.ts serializes the fully merged active definition. The static page cannot silently rewrite source files on your disk; use the downloaded definition if integrating calibration into source.

Future kits can supply a registry, image, defaults and experiment list with the same interface. To integrate another kit, change KIT identity and import validation dimensions consistently; this first UI targets the supplied SabronPro kit only.

The same static frontend can be embedded in Tauri without changing the signal engine. Native filesystem access, installers and signed Windows binaries remain a separate desktop packaging step.
