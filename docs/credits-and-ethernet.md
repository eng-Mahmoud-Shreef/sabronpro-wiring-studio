# Credits and Ethernet (v1.1)

The footer and Credits window identify Eng. Mahmoud Shreef, with a small heart
accent and copyright notice. Diagram exports always contain a dedicated credit
band below the diagram, leaving the authoritative panel image untouched.
Project JSON contains an `author` record. Source and HTML retain author and
copyright metadata. LICENSE states the owner's proprietary notice. These are
attribution measures, not tamper-proof or legal proof of exclusive ownership.

## Ethernet

Design → Ethernet / TIA Portal (or click the panel RJ45 port) adds ETH1 between
`TIA_PROFINET` and a movable Programming PC endpoint. This uses a separate RJ45
renderer, not banana plugs. In Properties you can rename the lead/computer,
change cable color, add bends, auto-route, lock, hide or delete it. Drag the
computer/its plug to reposition the far endpoint. Double-click a route handle
to remove it. Undo/redo, project save/recovery and exports include this cable.

Calibrate → Socket centers includes the panel's TIA_PROFINET RJ45 socket.
Moving its center updates the attached RJ45 plug. Banana leads cannot connect
to this port. The Ethernet cable is excluded from the electrical signal graph;
it does not establish a live network, upload a PLC program, or launch TIA Portal.
