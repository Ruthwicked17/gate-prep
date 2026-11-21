Transient, Steady-state AC and Resonance

KEY IDEAS
- Continuity rules: capacitor voltage and inductor current cannot jump, so $v_C(0^+) = v_C(0^-)$ and $i_L(0^+) = i_L(0^-)$. Other quantities, such as a capacitor current or an inductor voltage, can jump.
- Any first-order circuit (one effective L or C) driven by DC gives an exponential response from its initial value to its final value. The time constant $\tau$ uses the Thevenin resistance seen by the L or C.
- Second-order series RLC: the response is overdamped if $\zeta > 1$, critically damped if $\zeta = 1$, and underdamped if $\zeta < 1$.
- AC transient in an RL circuit: if a sinusoid is switched on at the right instant, the DC-offset term vanishes. If it is switched on at the worst instant, the offset is maximum and the peak current approaches twice the steady-state peak.
- Sinusoidal steady state: replace each element by its impedance ($R$, $j\omega L$, $\frac{1}{j\omega C}$) and each source by a phasor. Then use DC methods with complex algebra.
- Phasors encode magnitude and phase only. Use RMS or peak consistently.
- Resonance happens when the reactances cancel and the input impedance becomes purely resistive. In a series RLC circuit, impedance is minimum and current is maximum at resonance. In a parallel RLC circuit, impedance is maximum and current is minimum.
- The quality factor $Q$ measures selectivity. A high Q gives a narrow bandwidth. In a series circuit at resonance, each reactive voltage is $Q$ times the source voltage.

FORMULAS
- First-order response: $x(t) = x(\infty) + [x(0^+) - x(\infty)]e^{-t/\tau}$, with $\tau = RC$ or $\tau = L/R$
- Series RLC: $\alpha = \frac{R}{2L}$, $\omega_0 = \frac{1}{\sqrt{LC}}$, $\zeta = \frac{R}{2}\sqrt{\frac{C}{L}}$
- Parallel RLC: $\alpha = \frac{1}{2RC}$
- Damped frequency: $\omega_d = \sqrt{\omega_0^2 - \alpha^2}$
- RL circuit switched onto $v = V_m\sin(\omega t + \theta)$ at $t = 0$, with $\phi = \tan^{-1}(\omega L/R)$:
  $i(t) = \frac{V_m}{|Z|}[\sin(\omega t + \theta - \phi) - \sin(\theta - \phi)e^{-Rt/L}]$
  The transient term is zero when $\theta = \phi$ and maximum when $\theta - \phi = \pm 90^\circ$.
- Series resonance: $Q = \frac{\omega_0 L}{R} = \frac{1}{R}\sqrt{\frac{L}{C}}$
- Parallel resonance: $Q = \omega_0RC = R\sqrt{\frac{C}{L}}$
- Bandwidth: $BW = \frac{\omega_0}{Q}$, which equals $\frac{R}{L}$ rad/s for a series circuit
- Half-power frequencies: $\omega_1\omega_2 = \omega_0^2$

WORKED EXAMPLE
Part 1: a series RC circuit with $R = 1$ kΩ and $C = 100\,\mu$F is uncharged and switched onto 10 V at $t = 0$. Find $v_C$ at $t = 0.2$ s.
- $\tau = 10^3 \times 10^{-4} = 0.1$ s
- $v_C = 10(1 - e^{-2}) = 10(1 - 0.1353) = 8.647$ V

Part 2: a series RLC circuit has $R = 10\,\Omega$, $L = 10$ mH and $C = 1\,\mu$F. Find the resonant frequency, Q and bandwidth.
- $\omega_0 = \frac{1}{\sqrt{10^{-8}}} = 10^4$ rad/s, so $f_0 \approx 1591.5$ Hz
- $Q = \frac{10^4 \times 0.01}{10} = 10$
- $BW = \frac{R}{L} = 1000$ rad/s, which agrees with $\frac{\omega_0}{Q} = 1000$ rad/s

COMMON TRAPS
- Using the wrong resistance in $\tau$. Use the Thevenin resistance seen by the C or L after switching, with independent sources off.
- Assuming capacitor current or inductor voltage is continuous. Only $v_C$ and $i_L$ are.
- Mixing peak and RMS phasors within one problem.
- Using the series formula for Q on a parallel circuit. The two are reciprocal in form.
- Forgetting that the half-power frequencies are not symmetric about $\omega_0$ on a linear scale. They are geometric: $\omega_0 = \sqrt{\omega_1\omega_2}$.

GATE PATTERN
- NAT: a voltage or current at some time after switching, the time constant, the resonant frequency, Q or bandwidth.
- MCQ: identify the damping type, or the switching angle for no transient.
- Shortcut: for DC steady state, short the inductors and open the capacitors, then find $x(0^+)$ and $x(\infty)$ and fill in the first-order formula.
- Shortcut: after one time constant a first-order response completes 63.2 percent of its change, and after five time constants it is essentially settled.
