Sensors and Signal Conditioning

A sensor converts a physical quantity (displacement, force, pressure) into an electrical change. Signal conditioning (bridges, amplifiers, filters) turns that small change into a clean, usable voltage. Robots rely on sensors for joint position, speed, contact force and torque.

KEY IDEAS
- Resistive sensors: potentiometers (displacement as a voltage divider), strain gauges (resistance changes with strain), RTDs and thermistors. Strain gauges are read in a Wheatstone bridge because the change is tiny.
- Capacitive sensors: capacitance changes by varying plate gap, overlap area, or dielectric. Area-change sensors are linear; gap-change sensors are nonlinear ($C \propto 1/d$) unless used differentially or in a small range.
- Inductive sensors: variable reluctance pick-ups and the LVDT. An LVDT has one primary and two secondaries connected in series opposition; output magnitude gives displacement from the null, and phase gives direction. Phase-sensitive detection recovers the sign.
- Piezoelectric sensors generate charge under stress. They suit dynamic force, pressure and acceleration but cannot measure static quantities, since the charge leaks away. A charge amplifier is used for conditioning.
- Hall sensors: a current-carrying plate in a perpendicular magnetic field develops a transverse voltage. Used for proximity, current sensing and brushless motor commutation.
- Displacement: potentiometer, LVDT, capacitive gauge, optical encoders (incremental for relative, absolute for unique position codes).
- Velocity: tachogenerator (voltage proportional to speed), encoder pulse rate, differentiation of position.
- Acceleration: seismic mass-spring-damper; accelerometers operate below their natural frequency.
- Force and torque: load cells (strain gauges on an elastic element), strain gauges at 45 degrees on a shaft for torque, piezoelectric force sensors.
- Pressure: diaphragms with strain gauges, bourdon tubes, capacitive and piezoresistive sensors.
- Signal conditioning: bridge excitation, instrumentation amplifier (high CMRR), filtering, and ADC.

FORMULAS
- Gauge factor: $GF = \dfrac{\Delta R/R}{\varepsilon}$, so $\Delta R = GF\cdot R\cdot\varepsilon$
- Quarter bridge output (small strain): $V_o \approx \dfrac{V_s}{4}\,GF\,\varepsilon$; half bridge (two active arms) $\dfrac{V_s}{2}GF\varepsilon$; full bridge $V_s\,GF\,\varepsilon$
- Parallel plate capacitive: $C = \dfrac{\varepsilon A}{d}$, sensitivity $\dfrac{dC}{dd} = -\dfrac{\varepsilon A}{d^2}$
- Hall voltage: $V_H = \dfrac{B I}{n q t}$ ($t$ = plate thickness)
- Piezoelectric: $Q = d\,F$, output voltage $V = Q/C$
- Seismic sensor natural frequency: $\omega_n = \sqrt{k/m}$
- Encoder resolution: $360^\circ/N$ for $N$ lines; quadrature gives $4N$ counts per revolution
- Instrumentation amplifier (three op-amp): $G = \left(1 + \dfrac{2R}{R_G}\right)\dfrac{R_3}{R_2}$

WORKED EXAMPLE
A 120 ohm strain gauge with $GF = 2$ sees a strain of 500 microstrain in a quarter bridge excited at 5 V. Find $\Delta R$ and bridge output.
- $\Delta R = 2\times120\times500\times10^{-6} = 0.12$ ohm.
- $V_o \approx \dfrac{5}{4}\times2\times500\times10^{-6} = 1.25\times10^{-3}$ V, that is 1.25 mV.
- Check: $\Delta R/R = 0.001$; quarter bridge gives $V_s\cdot(\Delta R/R)/4 = 5\times0.001/4 = 1.25$ mV. Both agree.

COMMON TRAPS
- Expecting piezoelectric sensors to hold a static reading.
- Forgetting that an LVDT output is AC; a plain rectifier loses direction information.
- Treating gap-type capacitive sensors as linear over large displacement.
- Using the full bridge formula for a quarter bridge (factor of 4 error).
- Ignoring temperature: a dummy gauge in the adjacent arm compensates thermal drift.

GATE PATTERN
- NAT on bridge output, gauge resistance change, capacitance change, encoder resolution, Hall voltage. MCQ on choosing the right sensor for static or dynamic measurement. MSQ on sensor property statements.
- Shortcut: bridge output scales with the number of active arms: 1, 2 or 4 times $\dfrac{V_s GF \varepsilon}{4}$, provided arms are placed so that strains add.
- Shortcut: in a differential capacitive sensor, output is linear in displacement, $\Delta C/C \approx x/d$ per side.
