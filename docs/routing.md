# Routing

A* runs on a 16px navigation grid in original-image coordinates. Keep-out rectangles derive from labels, the PLC, physical controls, and unused sockets. A small exemption around each endpoint permits lead insertion. Existing routes increase corridor costs to discourage overlap. Turn costs reduce unnecessary direction changes; line-of-sight simplification removes redundant nodes. Rounded quadratic curves retain a dark edge, colored core, highlight and offset shadow.

Auto Route All routes unlocked leads sequentially. The path is saved as image-coordinate waypoints. Manual handles replace the route with a manual path; the attached first and last points follow their socket IDs. Routes are not electrical conductors independent of endpoints: connectivity is based on socket IDs even for hidden leads.

Calibrate → Routing keep-out zones exposes obstacle rectangles. Drag or numerically edit X/Y/width/height, then reroute. The router does not use OCR and does not automatically identify every text region. It may use a fallback arc if the grid cannot find a path. A physically natural final lead can be refined with manual bends.
