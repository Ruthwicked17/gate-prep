Actuators

An actuator converts an energy source (pressurised fluid or electricity) into motion. Robots use hydraulic actuators for heavy loads, pneumatic actuators for fast, light, low-cost motion, and electric motors (DC, stepper, servo) for precise positioning.

KEY IDEAS
- Hydraulic actuators use nearly incompressible oil at high pressure. They give a large force for small size and stiff, accurate positioning, but need pumps, filters and leak care.
- Pneumatic actuators use compressed air. They are clean, cheap and fast, but air compressibility makes precise mid-stroke positioning hard; they suit on-off pick-and-place and grippers.
- Linear cylinders: single-acting (fluid on one side, spring return) or double-acting (fluid on both sides). In a double-acting cylinder the retract side has less area because the rod occupies part of it, so the retract force is smaller and the retract speed is higher for the same flow.
- Directional control valves are named by ports and positions (for example a 4/2 valve has four ports and two positions). Flow control valves set speed; pressure relief valves limit maximum pressure.
- DC motor: a current-carrying armature in a field produces torque; rotation induces a back emf. Speed is controlled by armature voltage (below base speed) or by field weakening (above base speed). Brushless DC motors use electronic commutation, often with Hall sensors.
- Stepper motor: rotates in fixed angular steps for each input pulse, so it can run open loop. Types: variable reluctance, permanent magnet, and hybrid. Full step, half step and microstepping modes exist. It can lose steps if the load torque exceeds the pull-out torque.
- Servo motor: a motor with position or speed feedback (encoder, resolver or potentiometer) in a closed loop. Accurate under varying load.

FORMULAS
- Cylinder force: $F = pA$, extend area $A = \dfrac{\pi D^2}{4}$, retract area $\dfrac{\pi(D^2 - d^2)}{4}$
- Piston speed: $v = Q/A$; hydraulic power: $P = pQ$
- DC motor: $V = E_b + I_a R_a$, $E_b = K\phi\omega$, $T = K\phi I_a$ (same $K$ in SI units)
- Separately excited speed: $\omega = \dfrac{V - I_a R_a}{K\phi}$
- Mechanical power: $P = T\omega$
- Stepper step angle: variable reluctance $\beta = \dfrac{360^\circ}{m N_r}$ (or $\dfrac{(N_s - N_r)360^\circ}{N_s N_r}$ from the stator and rotor tooth counts; the two agree for the usual designs such as 6/4, 8/6 and 12/8); hybrid two-phase $\beta = \dfrac{360^\circ}{2 m N_r}$
- Steps per revolution $= 360^\circ/\beta$; speed in rpm $= \dfrac{\beta f}{360^\circ}\times60$ for pulse rate $f$

WORKED EXAMPLE
Part A. A hydraulic cylinder with 50 mm bore works at 10 MPa. Find extend force.
- $A = \pi(0.05)^2/4 = 1.9635\times10^{-3}$ m^2.
- $F = 10\times10^6\times1.9635\times10^{-3} = 19635$ N, about 19.6 kN.
- Check: $\pi\times0.0025 = 7.854\times10^{-3}$, divided by 4 gives $1.9635\times10^{-3}$; times $10^7$ gives 19635 N.
Part B. A 1.8 degree stepper receives 400 pulses per second. Find speed.
- Steps per revolution $= 360/1.8 = 200$.
- Speed $= 400/200 = 2$ rev/s $= 120$ rpm.
- Check: $1.8\times400 = 720$ degrees per second, which is 2 rev/s.

COMMON TRAPS
- Using the full bore area for the retract stroke.
- Using pressure in bar or MPa without converting to pascal when area is in m^2.
- Confusing step angle of a VR motor with that of a hybrid motor.
- Forgetting that back emf is zero at standstill, so starting current is $V/R_a$ and can be very large.
- Assuming a stepper never needs feedback; it can miss steps under overload.

GATE PATTERN
- NAT on cylinder force and speed, DC motor speed or torque, stepper step angle and rpm. MCQ on choosing hydraulic versus pneumatic versus electric, and valve naming. MSQ on characteristics of stepper and servo motors.
- Shortcut: for a DC motor at constant flux, speed is proportional to back emf, so $\dfrac{N_2}{N_1} = \dfrac{E_{b2}}{E_{b1}}$.
- Shortcut: ratio of extend to retract speed for the same flow equals $\dfrac{D^2 - d^2}{D^2}$.
