# Simulation

START/RESET/PULSE NO contacts: released = 0, held = 1. STOP and Emergency NC contacts: normal = 1, active = 0. Emergency remains active after pointer release. KIT ON gates all signals. Momentary states reset on pointer cancel, window blur and recovery.

Switches and simulated sensors produce 0/1. Selector A uses its internal potentiometer, mapped to 0–10 V. Selector B uses the externally connected `_B` jack. Display selection chooses AI0 or AI1. LEDs report whether their connected net is energized.

The engine discovers connected nets and propagates driven signal values. Incompatible driven values produce a conflict warning and a conservative zero signal for the conflicted net. Validation also catches shorts across multiple wires, joined supplies, analog overvoltage, duplicate cables, unknown endpoints and socket capacity limits.

No Siemens program is executed. Q outputs reflect externally driven nets; P01 has no implemented motor/ladder logic. The buzzer is a visual indicator only. No physical serial, network or PLC interface exists.
