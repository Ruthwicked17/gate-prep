Induction Machines

KEY IDEAS
- A balanced three-phase stator winding fed with three-phase current produces a magnetic field rotating at synchronous speed. It induces currents in the rotor, and the rotor runs slightly slower than the field.
- Slip is the relative speed as a fraction of synchronous speed. Rotor currents have frequency $s f$.
- Rotor types: squirrel cage (rugged, cheap) and slip ring or wound rotor (external resistance can be added).
- The equivalent circuit resembles a transformer with a secondary load resistance $\frac{R_2'}{s}$. Air-gap power splits into rotor copper loss and mechanical power in the ratio $s : (1-s)$.
- Torque-speed curve: torque rises nearly linearly with slip at small slip, peaks at the breakdown torque, then falls. Normal operation is in the low-slip, stable region. Above synchronous speed ($s < 0$) the machine acts as a generator; for $s > 1$ it acts as a brake (plugging).
- Increasing rotor resistance shifts the slip at maximum torque upward but does not change the maximum torque value.
- No-load test: rated voltage, no load. Gives rotational and core losses and the magnetising branch. Blocked-rotor test: rotor locked, reduced voltage, rated current. Gives $R_1 + R_2'$ and $X_1 + X_2'$.
- Starting methods: direct on line (DOL), star-delta, autotransformer, stator resistance or reactance, and rotor resistance (slip ring only). Soft starters use voltage control.
- Speed control: stator voltage control, constant V/f control (keeps flux constant), pole changing, rotor resistance control, and slip power recovery.
- A single-phase induction motor is not self-starting. By double revolving field theory, the pulsating field equals two opposite rotating fields giving zero net starting torque. Split-phase, capacitor-start, capacitor-run and shaded-pole designs create a starting torque.

FORMULAS
- Synchronous speed: $N_s = \frac{120 f}{P}$ rpm; slip $s = \frac{N_s - N}{N_s}$
- Power split: $P_{cu2} = s P_g$, $P_m = (1-s) P_g$
- Torque: $T = \frac{P_g}{\omega_s} = \frac{P_m}{\omega_r}$
- Torque (three-phase, per-phase values): $T = \frac{3 V^2 \frac{R_2'}{s}}{\omega_s\left[\left(R_1 + \frac{R_2'}{s}\right)^2 + \left(X_1 + X_2'\right)^2\right]}$
- Slip at maximum torque: $s_{mT} = \frac{R_2'}{\sqrt{R_1^2 + (X_1 + X_2')^2}}$, about $\frac{R_2'}{X_1 + X_2'}$ if $R_1$ is neglected
- Kloss relation: $\frac{T}{T_{max}} = \frac{2}{\frac{s}{s_{mT}} + \frac{s_{mT}}{s}}$
- Starting torque with DOL: $\frac{T_{st}}{T_{fl}} = \left(\frac{I_{st}}{I_{fl}}\right)^2 s_{fl}$
- Star-delta starting: line current and torque are $\frac{1}{3}$ of DOL values
- Autotransformer starting with tapping $x$: line current and torque are $x^2$ times DOL values
- Torque is proportional to $V^2$ at a given slip

WORKED EXAMPLE
A 4-pole, 50 Hz, three-phase induction motor runs at 4% slip with air-gap power 10 kW. Find rotor speed, rotor copper loss, mechanical power and electromagnetic torque.
- $N_s = \frac{120 \times 50}{4} = 1500$ rpm; $N = 1500(1 - 0.04) = 1440$ rpm.
- Rotor copper loss $= 0.04 \times 10000 = 400$ W.
- Mechanical power $= 0.96 \times 10000 = 9600$ W.
- Torque $= \frac{10000}{2\pi \times 1500/60} = \frac{10000}{157.08} = 63.66$ N m.
- Check: $\frac{9600}{2\pi \times 1440/60} = \frac{9600}{150.80} = 63.66$ N m. Both agree.

COMMON TRAPS
- Dividing mechanical power by synchronous speed instead of rotor speed (or air-gap power by rotor speed).
- Forgetting the factor 3 for three phases when using per-phase values.
- Believing rotor resistance changes the maximum torque; it only changes the slip at which it occurs.
- Using star-delta factor $\frac{1}{3}$ for phase current; phase current falls by $\frac{1}{\sqrt{3}}$, line current by $\frac{1}{3}$.

GATE PATTERN
- NAT questions on slip, rotor frequency, power split, torque, starting torque ratios and parameters from no-load and blocked-rotor tests.
- MCQs on torque-speed curve shape, speed control methods and single-phase motor starting.
- MSQs on effects of changing voltage, frequency or rotor resistance.
- Tip: remember the ratio $P_g : P_{cu2} : P_m = 1 : s : (1-s)$.
- Tip: for torque at a new slip, use the Kloss relation or, at small slip, $T \propto \frac{s V^2}{R_2'}$.
