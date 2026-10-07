# Lead format

```json
{
  "id": "W3",
  "label": "W3",
  "from": "START_NO",
  "to": "I0_2",
  "color": "#08b958",
  "route": "auto",
  "waypoints": [{"x":889,"y":757},{"x":192,"y":720},{"x":157,"y":384}],
  "notes": "",
  "function": "Start command",
  "locked": false,
  "hidden": false
}
```

Endpoints identify sockets, never floating positions. Rendered first/last coordinates are resolved from the active calibrated registry. Manual waypoint changes, rerouting, label/color changes, deleting/duplicating and reconnecting are undoable.

Hidden cables remain in the signal graph and validation because hiding affects presentation only. Locking prevents manual routing and endpoint mutation; it does not prevent changing presentation properties or removing a lead explicitly.
