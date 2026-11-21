Op-amps, Filters, Timers

KEY IDEAS
- Ideal op-amp: infinite open-loop gain, infinite input impedance, zero output impedance, infinite bandwidth, infinite CMRR. With negative feedback this gives two rules: virtual short ($V_+ = V_-$) and zero input current.
- Practical characteristics: finite gain-bandwidth product (GBW), slew rate limits, input offset voltage, input bias and offset currents, finite CMRR, output saturation near the supply rails.
- Applications: inverting and non-inverting amplifiers, voltage follower (buffer), summing amplifier, difference amplifier, integrator, differentiator, comparator, precision rectifier, instrumentation amplifier.
- Without feedback (or with positive feedback) the op-amp saturates and acts as a comparator.
- Active filters use op-amps with R and C to get gain, buffering and sharp responses without inductors. Types: low-pass, high-pass, band-pass, band-stop.
- Butterworth filter: maximally flat passband, no ripple, magnitude -3 dB at the cutoff, roll-off $20n$ dB/decade for order $n$.
- Sallen-Key topology: a common second-order active filter using one op-amp, two resistors and two capacitors.
- A VCO produces an output whose frequency is proportional to a control voltage. The 555 control-voltage pin changes the internal thresholds, so the 555 can work as a simple VCO.
- 555 timer: two comparators with thresholds at $\frac{2}{3}V_{CC}$ and $\frac{1}{3}V_{CC}$, an SR flip-flop and a discharge transistor. Modes: monostable (one pulse per trigger) and astable (free-running square wave).

FORMULAS
- Inverting: $A_v = -\dfrac{R_f}{R_1}$. Non-inverting: $A_v = 1 + \dfrac{R_f}{R_1}$.
- Integrator: $v_o = -\dfrac{1}{RC}\int v_i\,dt$. Differentiator: $v_o = -RC\dfrac{dv_i}{dt}$.
- Closed-loop bandwidth (non-inverting): $f_{CL} = \dfrac{GBW}{A_{CL}}$. For an inverting stage divide by the noise gain $1 + R_f/R_1$ instead.
- Slew-rate limit: full-power bandwidth $f_{max} = \dfrac{SR}{2\pi V_m}$.
- CMRR $= \dfrac{A_d}{A_{cm}}$, in dB $20\log_{10}(A_d/A_{cm})$.
- First-order RC low-pass: $f_c = \dfrac{1}{2\pi RC}$.
- Butterworth: $|H(j\omega)| = \dfrac{1}{\sqrt{1 + (\omega/\omega_c)^{2n}}}$.
- Unity-gain Sallen-Key low-pass: $\omega_0 = \dfrac{1}{\sqrt{R_1 R_2 C_1 C_2}}$, $Q = \dfrac{\sqrt{R_1 R_2 C_1 C_2}}{C_2(R_1 + R_2)}$, where $C_2$ is the capacitor to ground.
- Equal-component Sallen-Key with gain $K$: $Q = \dfrac{1}{3 - K}$. Second-order Butterworth needs $Q = 0.707$, so $K = 1.586$.
- 555 monostable: $T = 1.1RC$.
- 555 astable: $t_H = 0.693(R_A + R_B)C$, $t_L = 0.693R_BC$, $f = \dfrac{1.44}{(R_A + 2R_B)C}$, duty cycle $= \dfrac{R_A + R_B}{R_A + 2R_B}$.

WORKED EXAMPLE
A 555 astable has $R_A = 1$ k$\Omega$, $R_B = 10$ k$\Omega$, $C = 0.1$ $\mu$F. Find $t_H$, $t_L$, frequency and duty cycle.
- $t_H = 0.693 \times 11 \times 10^3 \times 0.1 \times 10^{-6} = 0.762$ ms.
- $t_L = 0.693 \times 10 \times 10^3 \times 0.1 \times 10^{-6} = 0.693$ ms.
- $T = 1.455$ ms, so $f = 1/T = 687$ Hz.
- Duty cycle $= 0.762/1.455 = 52.4$ percent.
- Check: $f = \dfrac{1.44}{(1 + 20) \times 10^3 \times 0.1 \times 10^{-6}} = \dfrac{1.44}{2.1 \times 10^{-3}} = 686$ Hz, matching within rounding. Duty check: $11/21 = 52.4$ percent.
- Note: duty cycle is always above 50 percent in this basic circuit; a diode across $R_B$ is needed to go below 50 percent.

COMMON TRAPS
- Applying virtual short when there is no negative feedback, such as in a comparator.
- Forgetting the minus sign in inverting configurations.
- Using the open-loop gain instead of closed-loop gain when finding bandwidth from GBW.
- Mixing up which slew-rate condition limits; small signals are bandwidth limited, large signals are slew-rate limited.
- Using 0.693 with $R_A + 2R_B$ for the high time; the high time uses $R_A + R_B$.
- Assuming Butterworth has passband ripple; that is Chebyshev.

GATE PATTERN
- NAT: output voltage of an op-amp circuit, cutoff frequency, Q, 555 frequency or duty cycle, slew-rate frequency.
- MCQ: identify the function of a circuit (integrator, filter type, comparator); transfer function of an active filter.
- MSQ: properties of ideal versus practical op-amps; Butterworth characteristics.
- Shortcut: for multi-input op-amp circuits, use superposition with each input in turn.
- Shortcut: for a filter, check $s \to 0$ and $s \to \infty$ limits to identify low-pass, high-pass or band-pass quickly.
