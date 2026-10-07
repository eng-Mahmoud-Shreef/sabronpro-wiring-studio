# Unresolved electrical details

The clean supplied drawing establishes visual positions; it is not a complete circuit schematic.

| Item | Image region | Uncertainty | Needed reference |
| --- | --- | --- | --- |
| AI0 / AI0_B | (410,315) / (480,315) | Two unlabeled jack functions; A/B meaning is modeled as internal vs external for training, not verified physical wiring | Analog module schematic or detailed labeled photograph |
| AI1 / AI1_B | (967,315) / (1035,315) | Same ambiguity | Analog module schematic |
| PLC-side screw strips | x104 / x1340, y375–538 | Individual pin captions are not legible | Terminal schedule |
| Limit / float COM / OUT | bottom-left interface | Rail arrangement visible; exact contacts and polarity are unverified | Sensor interface circuit diagram |
| TP5 SW.P / TP6 O/P.P / TP7 I/P.G | x619 / x677 / x735, y650 | Labels are visible; internal rail assignments and grounding are not all verified | Power/test point schematic |
| Input selector A/B | (544,879) | Physical selector visible, but its exact input bus routing is unspecified | Input module schematic |

Do not infer unverified electrical assignments from connector colors. Known 24V/0V/12V captions and NO/NC button labels are represented directly. Sensor state controls emulate signals for demonstration and do not model the physical sensor hardware.

All socket and control centers are initial image-based calibrations. Small image artifacts may shift apparent centers; correct them using the built-in map editor.
