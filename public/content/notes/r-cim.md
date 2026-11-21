Computer Integrated Manufacturing and Automation

KEY IDEAS
- Computer integrated manufacturing (CIM) links design, planning, production and business functions through shared computer data. Automation types: fixed (high volume, single product), programmable (batches, reprogram between batches) and flexible (variety with little changeover time).
- PLC (programmable logic controller): an industrial computer that reads inputs, runs a stored program and sets outputs in a repeated scan cycle: read inputs, execute program, update outputs, housekeeping. Programs are commonly written in ladder logic. Ladder elements: normally open and normally closed contacts, coils, timers (on-delay, off-delay) and counters. A seal-in (latch) contact keeps a motor running after a start button is released.
- Automated material handling: conveyors (roller, belt, chain, overhead), automated guided vehicles (AGVs) guided by wire, tape or laser, cranes and hoists, and industrial robots.
- AS/RS (automated storage and retrieval system): racks served by a storage and retrieval (S/R) machine that moves horizontally and vertically at the same time. Types include unit load, mini-load, man-on-board and carousel systems. Performance is measured by storage capacity and throughput (cycles per hour).
- Automated identification and data capture: bar codes (1D linear, and 2D such as QR and Data Matrix), RFID (passive tags powered by the reader, active tags with batteries; no line of sight needed), magnetic stripes, optical character recognition and machine vision.
- CNC: a computer controls axes of a machine tool from a part program (G-codes for motion, M-codes for machine functions). Control may be open loop with stepper motors or closed loop with servomotors and encoders or resolvers.
- Common codes: G00 rapid traverse, G01 linear interpolation, G02 clockwise and G03 counterclockwise circular interpolation, G90 absolute and G91 incremental; M03 spindle on clockwise, M04 counterclockwise, M05 spindle stop, M06 tool change, M08 coolant on, M30 program end and rewind.
- Multi-axis positioning: 3-axis machines move along X, Y, Z; 4 and 5 axis machines add rotary axes (A, B, C about X, Y, Z) to reach complex surfaces in one setup.
- Concurrent engineering: design, manufacturing and quality work in parallel from the start, using design for manufacturing and assembly (DFM, DFA), to cut lead time and late changes.

FORMULAS
- Basic length unit for a stepper and lead screw: $BLU = \frac{p}{n_s \, r_g}$, with screw pitch $p$, steps per revolution $n_s$, gear ratio $r_g$ (motor turns per screw turn).
- Step angle $= \frac{360^\circ}{n_s}$.
- Table feed rate $f_r = N_{screw} \, p$; pulse rate $f_p = \frac{f_r \, n_s \, r_g}{60 \, p}$ (pulses per second for $f_r$ in mm/min).
- One common AS/RS approximation: single command cycle $T_{cs} = 2 \max\left(\frac{L}{v_y}, \frac{H}{v_z}\right) + 2 T_{pd}$, where $T_{pd}$ is pick and deposit time.
- Dual command cycle (one store plus one retrieve): $T_{cd} = 2 \max\left(\frac{1.5 L}{v_y}, \frac{1.5 H}{v_z}\right) + 4 T_{pd}$; it completes two transactions per cycle.
- AS/RS throughput: cycles per hour $= 60 / T_{cs}$ per S/R machine with $T_{cs}$ in minutes.

WORKED EXAMPLE
- A CNC table is driven by a stepper with 200 steps per revolution coupled directly ($r_g = 1$) to a lead screw of pitch 6 mm. Find the BLU and the pulse rate for a feed of 300 mm/min.
- $BLU = 6 / (200 \times 1) = 0.03$ mm per pulse.
- Screw speed $= 300 / 6 = 50$ rev/min, so pulse rate $= 50 \times 200 / 60 = 166.67$ Hz.
- Check: feed $/$ BLU $= 300 / 0.03 = 10000$ pulses per minute, and $10000 / 60 = 166.67$ Hz. Both agree.

COMMON TRAPS
- Forgetting to convert mm/min to per second for pulse frequency.
- Gear ratio direction: a motor geared down by $r_g$ makes BLU smaller, not larger.
- In ladder logic a normally closed contact passes power when its input is off.
- RFID passive tags need no battery; bar codes need line of sight and RFID does not.

GATE PATTERN
- Expect numerical questions on BLU, pulse frequency, feed rate, AS/RS cycle time and throughput, and possibly simple ladder logic outputs.
- MCQs on PLC scan cycle, automation types, handling equipment, identification technologies and concurrent engineering.
- Shortcut: BLU links everything in CNC; pulses $=$ distance $/$ BLU and pulse rate $=$ feed $/$ BLU.
- Shortcut: AS/RS throughput per hour $= 60 / T_c$ with $T_c$ in minutes, times the number of aisles when each aisle has its own S/R machine.
