# Experiment / project format

JSON version 1 uses kitId `sabronpro-s7-1200`, projectId, title, description, experiment, states, wires, calibration, table, settings and simulation.

`states` maps control IDs to numbers: momentary/emergency/toggle/selector/sensor use 0 or 1; potentiometers use 0–100. Every saved project contains complete control defaults.

`calibration` maps component or obstacle IDs to X/Y and optional radius, label, maxPlugs, width (`w`) or height (`h`). All geometry uses original image pixels. Base image geometry is never transformed independently.

`table` includes show, x, y, width, fontSize, title, style, useIds and columns. `settings.labels` controls canvas labels. Template definitions live in src/experiments/experiments.js and are instantiated as a project with auto-routed wires.

Import validates format, finite coordinates, lead colors, unique wire IDs and table settings before replacing the active project. Unknown referenced endpoints remain warnings rather than being silently reassigned.
