Power System Stability

Stability is the ability of synchronous machines to stay in synchronism after a disturbance. Rotor angle $\delta$ between generator internal voltage and the infinite bus describes the state. If mechanical input exceeds electrical output, the rotor accelerates and $\delta$ grows; the system is stable if $\delta$ eventually stops increasing and oscillates about a new equilibrium.

KEY IDEAS
- Steady-state stability: small, slow changes; limit is the maximum of the power-angle curve, $\delta = 90^\circ$ for a lossless system.
- Transient stability: large disturbances like faults or line switching; judged over the first swing for a single machine.
- Dynamic or small-signal stability involves controls (AVR, governors) and oscillatory modes.
- Inertia constant $H$ is stored kinetic energy at synchronous speed divided by machine rating (MJ/MVA, seconds). Typical range of a few seconds.
- Equal area criterion (single machine to infinite bus or two machines): system is stable if the decelerating area available above $P_m$ can equal the accelerating area gained below $P_m$.
- Critical clearing angle is the largest clearing angle for which the system remains stable; critical clearing time is the corresponding time.
- Methods to improve transient stability: faster fault clearing, high-speed autoreclosing, higher system voltage, series compensation (lower $X$), more parallel lines, higher inertia, fast valving, braking resistors.
- Power-angle curve: during a fault $P_{max}$ drops; for a three-phase fault at generator terminals it becomes zero.

FORMULAS
- Swing equation (pu power, $\delta$ in electrical radians): $\frac{2H}{\omega_s}\frac{d^2\delta}{dt^2} = P_m - P_e$
- Also written $M\frac{d^2\delta}{dt^2} = P_a$ with $M = \frac{H}{\pi f}$ (pu s$^2$/elec rad)
- Power angle: $P_e = P_{max}\sin\delta$, $P_{max} = \frac{EV}{X}$
- Synchronising power coefficient: $\frac{dP_e}{d\delta} = P_{max}\cos\delta$
- Equivalent $H$ on common base: $H_{eq} = \sum H_i \frac{S_i}{S_{base}}$
- Equal area: $\int_{\delta_0}^{\delta_c}(P_m - P_{e,fault})\,d\delta = \int_{\delta_c}^{\delta_{max}}(P_{e,post} - P_m)\,d\delta$
- Critical clearing angle (fault gives $P_e = 0$, same $P_{max}$ after clearing): $\cos\delta_{cr} = \frac{P_m}{P_{max}}(\delta_{max} - \delta_0) + \cos\delta_{max}$, with $\delta_{max} = \pi - \delta_0$
- Critical clearing time (for $P_e = 0$ during fault): $t_{cr} = \sqrt{\frac{2H(\delta_{cr} - \delta_0)}{\pi f P_m}}$
- Natural frequency of small oscillations: $\omega_n = \sqrt{\frac{\pi f}{H}P_{max}\cos\delta_0}$

WORKED EXAMPLE
$P_{max} = 2$ pu, $P_m = 1$ pu, three-phase fault at generator terminals, cleared with no network change. $H = 5$ s, $f = 50$ Hz. Find $\delta_{cr}$ and $t_{cr}$.
- $\delta_0 = \sin^{-1}(0.5) = 30^\circ = \pi/6$, $\delta_{max} = 150^\circ = 5\pi/6$
- $\cos\delta_{cr} = 0.5 \times (2\pi/3) + \cos 150^\circ = 1.0472 - 0.8660 = 0.1812$, so $\delta_{cr} = 79.56^\circ$
- $\delta_{cr} - \delta_0 = 49.56^\circ = 0.865$ rad
- $t_{cr} = \sqrt{\frac{2\times5\times0.865}{\pi\times50\times1}} = \sqrt{0.05507} = 0.235$ s
- Check by recomputation: 0.2347 s. Verified.

COMMON TRAPS
- Using degrees inside the equal area or clearing-time formulas; angles there must be in radians.
- Using machine-base $H$ with system-base power; convert $H$ to the common base first.
- Assuming $\delta_{max} = 180^\circ$; it is $\pi - \delta_0'$ where $\delta_0'$ is the operating point on the post-fault curve.
- Forgetting that the clearing-time formula is valid only when $P_e = 0$ during the fault.

GATE PATTERN
- NAT on critical clearing angle and time, swing equation acceleration, equivalent $H$ and maximum power transfer; MCQ on equal area reasoning; MSQ on methods to improve stability.
- Shortcut: initial acceleration after a fault is $\frac{d^2\delta}{dt^2} = \frac{\pi f}{H}(P_m - P_e)$ in elec rad/s$^2$.
- Shortcut: the system is stable at the margin when $P_m$ equals the post-fault $P_{max}\sin\delta$ and the areas balance; sketch the curves before writing integrals.
