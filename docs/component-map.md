# Component map

Coordinates are original-image pixels (1448 × 1086). The authoritative base is the supplied clean panel, not the differently aligned wiring reference.

The registry includes 58 banana sockets, 23 screw contact points, one RJ45 programming port and 36 physical control/indicator regions. Socket IDs are stable across projects. User calibration overrides their centers without moving the image.

| Group | IDs | Position / pattern |
| --- | --- | --- |
| Digital inputs | I0_0 … I0_7 | x157; y273 + 55.5 × input |
| Digital outputs | Q0_0 … Q0_5 | x1287; y273 + 55.5 × output |
| +24V bus | 24V_BUS_1 … 6 | y181; x395,450,505,560,616,672 |
| 0V bus | 0V_BUS_1 … 6 | y181; x773,827,881,937,991,1045 |
| Analog | AI0, AI0_B, AI1, AI1_B | (410,315),(480,315),(967,315),(1035,315) |
| Test points | TP1_24V … TP7_IPG | y650; x395,450,505,562,619,677,735 |
| 12V source | 12V_PLUS_1/2, 12V_0V_1/2 | x998/1054; y638/682 |
| Sensor contacts | PROX/LIMIT/FLOAT/PHOTO _NO/_NC | Bottom-left sockets; explicit definitions in kit-definition.ts |
| Switch outputs | SW1_OUT … SW4_OUT | y757; x624,683,741,799 |
| Button contacts | START_NO, STOP_NC, RESET_NO, PULSE_NO, EMERGENCY_NC | y757; x889,991,1093,1199,1317 |
| Button caps | START/STOP/RESET/PULSE/EMERGENCY _BUTTON | y875; x885,990,1093,1196,1317 |
| Toggle switches | SW1 … SW4 | y881; x620,677,737,797 |
| Kit power | KIT_ON_SWITCH | (1123,158) |
| Analog selectors | AI0_SELECTOR, AI1_SELECTOR | (445,390),(1005,390) |
| Potentiometers | AI0_POTENTIOMETER, AI1_POTENTIOMETER | (443,466),(1006,466) |
| Display selection | DISPLAY_SELECTOR | (866,690) |
| Input selection | INPUT_SELECTOR | (544,879) |
| Input/output LEDs | I0_0_LED … I0_7_LED; Q0_0_LED … Q0_5_LED | x308 / x1133; corresponding row y |
| Programming interface | TIA_PROFINET | (1338,154) · RJ45 socket |
| Readout / buzzer | ANALOG_DISPLAY / BUZZER | (867,623) / (1327,646) |

See unresolved-components.md before using this map as an electrical pinout. Use Calibrate to move socket centers or component regions, Save calibration for browser defaults, and Download kit-definition.ts for a complete calibrated source definition.
