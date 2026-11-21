Rectifiers and Line Harmonics

Rectifiers convert AC to DC. Diode rectifiers are uncontrolled; thyristor converters control the output by delaying the firing angle $\alpha$ measured from the natural commutation point. Because they draw non-sinusoidal current, rectifiers inject harmonics into the supply and have a power factor below one even with resistive-looking loads.

KEY IDEAS
- Half-wave, full-wave (centre-tap or bridge), single-phase and three-phase versions exist. Three-phase bridge gives a six-pulse output with low ripple.
- Fully controlled converter (all thyristors) with highly inductive load conducts continuously; output can go negative for $\alpha > 90^\circ$ (inversion), so power flows from DC side to AC side. This makes it a two-quadrant, bidirectional power converter (current one direction, voltage both).
- Semi-converter (half thyristors, half diodes or with freewheeling diode) gives only positive output voltage: one quadrant, better power factor.
- Dual converter: two full converters back to back give four-quadrant operation; with non-circulating mode one bridge conducts at a time, with circulating-current mode a reactor limits current and $\alpha_1 + \alpha_2 = 180^\circ$.
- PWM (active front end) rectifiers with self-commutated switches are bidirectional and can draw near-sinusoidal current at near unity power factor.
- Source inductance causes overlap (commutation) angle $\mu$, reducing output voltage.
- With constant DC current $I_d$, a single-phase bridge draws a square-wave current containing odd harmonics with $I_n = I_1/n$. A six-pulse bridge draws harmonics of order $6k \pm 1$ (5, 7, 11, 13...), no triplens.
- Power factor = distortion factor times displacement factor.

FORMULAS
- Single-phase half-wave diode, R load: $V_o = \frac{V_m}{\pi}$
- Single-phase full converter (continuous): $V_o = \frac{2V_m}{\pi}\cos\alpha$
- Single-phase semi-converter: $V_o = \frac{V_m}{\pi}(1 + \cos\alpha)$
- Three-phase half-wave: $V_o = \frac{3\sqrt{3}V_{mp}}{2\pi}\cos\alpha$
- Three-phase full converter: $V_o = \frac{3V_{ml}}{\pi}\cos\alpha = 1.35V_L\cos\alpha$ ($V_L$ rms line)
- Overlap drop: single-phase bridge $\frac{2\omega L_s I_d}{\pi}$; three-phase bridge $\frac{3\omega L_s I_d}{\pi}$
- Distortion factor $= I_{s1}/I_s$; THD $= \sqrt{\frac{1}{DF^2} - 1}$; $PF = DF \times \cos\phi_1$
- Single-phase bridge with constant $I_d$: $I_s = I_d$, $I_{s1} = \frac{2\sqrt{2}}{\pi}I_d = 0.9I_d$, $PF = 0.9\cos\alpha$, THD about 48.3 percent
- Three-phase bridge: $I_s = \sqrt{2/3}\,I_d$, $I_{s1} = \frac{\sqrt{6}}{\pi}I_d$, $DF = 3/\pi = 0.955$, $PF = 0.955\cos\alpha$
- Displacement angle for full converters: $\phi_1 = \alpha$; for single-phase semi-converter $\phi_1 = \alpha/2$

WORKED EXAMPLE
A three-phase full converter is fed from 415 V (line rms), $\alpha = 30^\circ$, continuous constant load current. Find $V_o$ and input power factor.
- $V_o = \frac{3\sqrt{2}\times415}{\pi}\cos30^\circ = 1.3505 \times 415 \times 0.866 = 560.4 \times 0.866 = 485.4$ V
- $PF = \frac{3}{\pi}\cos30^\circ = 0.955 \times 0.866 = 0.827$ lagging
- Check by recomputation: 485.36 V and 0.8270. Verified.

COMMON TRAPS
- Using phase voltage in the $1.35V_L$ formula; it needs line rms.
- Applying $\frac{2V_m}{\pi}\cos\alpha$ to resistive load; for the single-phase full converter with R load the current is discontinuous and $V_o = \frac{V_m}{\pi}(1 + \cos\alpha)$.
- Forgetting that semi-converters cannot invert.
- Taking PF equal to $\cos\alpha$; the distortion factor also multiplies it.
- Forgetting the overlap drop when source inductance is given.

GATE PATTERN
- NAT on average output voltage, firing angle, overlap drop, rms or fundamental source current, THD and power factor; MCQ on waveforms and harmonic orders; MSQ on quadrant operation and properties of converters.
- Shortcut: in inversion with a DC source $E$, with the source $E$ reversed, set $V_o = I_d R - E$ (negative) to find $\alpha$.
- Shortcut: power drawn equals $V_o I_d$ (lossless), which equals $\sqrt{3}V_L I_{s1}\cos\phi_1$; use this to cross-check.
