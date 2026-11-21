Synchronous Machines

KEY IDEAS
- A synchronous machine has a three-phase armature on the stator and a DC-excited field on the rotor. It runs only at synchronous speed, $N_s = \frac{120 f}{P}$.
- Cylindrical (non-salient) rotors suit high-speed turbo generators with few poles; the air gap is uniform and one synchronous reactance $X_s$ describes the machine.
- Salient-pole rotors suit low-speed hydro generators with many poles. The air gap is not uniform, so two-reaction theory uses direct-axis reactance $X_d$ and quadrature-axis reactance $X_q$, with $X_d > X_q$. The slip test measures them.
- Salient machines produce an extra reluctance power term that exists even without field excitation.
- Voltage regulation is the rise in terminal voltage when full load is removed, at constant excitation and speed. It is positive at lagging pf and can be negative at leading pf.
- Regulation methods: EMF or synchronous impedance method (pessimistic, gives a high value), MMF method (optimistic, gives a low value), zero power factor or Potier method (accurate), and the ASA method.
- Parallel operation (synchronising) with an infinite bus needs equal voltage, equal frequency, same phase sequence and phase angle. Dark-lamp or bright-lamp methods or a synchroscope are used.
- On an infinite bus, field current controls reactive power and pf; prime mover input controls real power. Overexcited machines supply reactive power (generator lagging, motor leading); underexcited machines absorb it.
- V-curves plot armature current against field current at constant power; the minimum point is unity pf.
- A synchronous motor is not self-starting. Starting methods: damper winding (starts as an induction motor), a small pony motor, or a variable-frequency supply.
- Damper windings also reduce hunting (oscillation of the rotor about its steady position).
- Losses: copper losses in armature and field, core loss, friction and windage, and stray losses. Efficiency is output over output plus losses.

FORMULAS
- EMF per phase: $E = 4.44 f \phi N_{ph} K_w$
- Generator phasor equation: $E = V + I_a (R_a + j X_s)$
- Power per phase, cylindrical, $R_a$ neglected: $P = \frac{E V}{X_s} \sin\delta$; maximum at $\delta = 90^\circ$
- Reactive power per phase: $Q = \frac{V(E\cos\delta - V)}{X_s}$
- Salient pole: $P = \frac{E V}{X_d}\sin\delta + \frac{V^2}{2}\left(\frac{1}{X_q} - \frac{1}{X_d}\right)\sin 2\delta$
- Slip test: $X_d = \frac{V_{max}}{I_{min}}$, $X_q = \frac{V_{min}}{I_{max}}$
- Regulation: $\epsilon = \frac{E - V}{V}$
- Synchronous impedance from tests: $Z_s = \frac{E_{oc}}{I_{sc}}$ at the same field current
- Short circuit ratio: $SCR = \frac{1}{X_{s,pu}}$ (unsaturated approximation)

WORKED EXAMPLE
An 11 kV, star-connected, three-phase alternator has $X_s = 10$ ohm per phase, $R_a$ negligible. It supplies 300 A at 0.8 pf lagging. Find the EMF per phase, load angle and regulation.
- $V = \frac{11000}{\sqrt{3}} = 6350.85$ V per phase.
- $I_a = 300(0.8 - j0.6)$ A, so $j X_s I_a = j10 \times 300(0.8 - j0.6) = 1800 + j2400$ V.
- $E = 6350.85 + 1800 + j2400 = 8150.85 + j2400$ V.
- $|E| = \sqrt{8150.85^2 + 2400^2} = 8496.85$ V; $\delta = \tan^{-1}\frac{2400}{8150.85} = 16.41^\circ$.
- Regulation $= \frac{8496.85 - 6350.85}{6350.85} = 33.8\%$.
- Check with $E^2 = (V\cos\phi)^2 + (V\sin\phi + I X_s)^2$: $(5080.68)^2 + (3810.51 + 3000)^2$ gives $|E| = 8496.85$ V again.

COMMON TRAPS
- Using line voltage in per-phase equations; convert star line voltage by $\sqrt{3}$.
- Forgetting to multiply per-phase power by 3 for total power.
- Applying the cylindrical power formula to a salient-pole machine.
- Mixing up overexcited motor (leading pf) and overexcited generator (lagging pf).
- Thinking a synchronous motor speed changes with load; only the load angle changes.

GATE PATTERN
- NAT questions on EMF, load angle, regulation, maximum power, $X_d$ and $X_q$ from slip test, and efficiency.
- MCQs on regulation method comparison, synchronising conditions, V-curves and starting methods.
- MSQs on effects of changing excitation or mechanical input on an infinite bus.
- Tip: draw the phasor diagram first; most results follow from right-angled triangles.
- Tip: on an infinite bus with constant power, $E \sin\delta$ and $I_a \cos\phi$ stay constant when excitation changes.
