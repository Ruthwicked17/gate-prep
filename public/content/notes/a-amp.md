Amplifiers, Biasing, Feedback

KEY IDEAS
- Biasing sets a stable DC operating point (Q-point) so the transistor stays in the active region (BJT) or saturation region (MOSFET) for the whole signal swing.
- BJT biasing types: fixed bias (poor stability), collector-to-base bias, and voltage-divider bias with emitter resistor (best stability, most common). The emitter resistor gives negative feedback against changes in $\beta$ and temperature.
- Small-signal equivalent circuits: the BJT hybrid-pi model uses $g_m$, $r_\pi$ and $r_o$; the MOSFET model uses $g_m$ and $r_o$ with infinite gate resistance.
- Common-emitter (common-source) gives high voltage gain with phase inversion; common-collector (source follower) gives gain near 1 with low output resistance; common-base (common-gate) gives low input resistance and no inversion.
- Frequency response: coupling and bypass capacitors set the lower cutoff $f_L$; internal junction capacitances set the upper cutoff $f_H$. Bandwidth $= f_H - f_L$.
- Miller effect: a capacitance between input and output of an inverting amplifier appears at the input multiplied by $(1 - A_v)$, lowering $f_H$.
- Negative feedback trades gain for stability: it stabilises gain, widens bandwidth, reduces distortion, and changes input and output resistance depending on topology.
- Oscillators use positive feedback. The Barkhausen criterion requires loop gain magnitude 1 and total loop phase of 0 or 360 degrees.

FORMULAS
- BJT: $I_C = \beta I_B$, $I_E = (\beta + 1)I_B$, $g_m = \dfrac{I_C}{V_T}$ with $V_T \approx 25$ mV at room temperature, $r_\pi = \dfrac{\beta}{g_m}$.
- Voltage-divider bias: $V_{TH} = V_{CC}\dfrac{R_2}{R_1 + R_2}$, $R_{TH} = R_1 \parallel R_2$, $I_B = \dfrac{V_{TH} - V_{BE}}{R_{TH} + (\beta + 1)R_E}$.
- MOSFET in saturation: $I_D = \dfrac{1}{2}\mu_n C_{ox}\dfrac{W}{L}(V_{GS} - V_t)^2$, $g_m = \dfrac{2I_D}{V_{GS} - V_t}$.
- CE gain with bypassed $R_E$: $A_v = -g_m (R_C \parallel r_o)$; unbypassed: $A_v \approx -\dfrac{R_C}{r_e + R_E}$ with $r_e = 1/g_m$ approximately.
- Feedback gain: $A_f = \dfrac{A}{1 + A\beta}$. Bandwidth becomes $f_H(1 + A\beta)$; gain-bandwidth product stays constant.
- Topologies: series-shunt (voltage amplifier) raises $R_{in}$ and lowers $R_{out}$ by $(1 + A\beta)$; shunt-series (current amplifier) lowers $R_{in}$ and raises $R_{out}$; series-series raises both; shunt-shunt lowers both.
- RC phase shift oscillator (three equal RC sections, series C and shunt R): $f = \dfrac{1}{2\pi RC\sqrt{6}}$; with series R and shunt C the frequency is $\dfrac{\sqrt{6}}{2\pi RC}$, amplifier gain at least 29.
- Wien bridge: $f = \dfrac{1}{2\pi RC}$, gain at least 3.
- Colpitts: $f = \dfrac{1}{2\pi\sqrt{LC_{eq}}}$ with $C_{eq} = \dfrac{C_1 C_2}{C_1 + C_2}$. Hartley: $f = \dfrac{1}{2\pi\sqrt{L_{eq}C}}$ with $L_{eq} = L_1 + L_2 + 2M$.

WORKED EXAMPLE
Voltage-divider bias: $V_{CC} = 12$ V, $R_1 = 40$ k$\Omega$, $R_2 = 10$ k$\Omega$, $R_C = 4$ k$\Omega$, $R_E = 1$ k$\Omega$ (bypassed), $\beta = 100$, $V_{BE} = 0.7$ V. Find $I_C$, $V_{CE}$ and midband gain (ignore $r_o$).
- $V_{TH} = 12 \times 10/50 = 2.4$ V, $R_{TH} = 8$ k$\Omega$.
- $I_B = \dfrac{2.4 - 0.7}{8\text{k} + 101 \times 1\text{k}} = \dfrac{1.7}{109\text{k}} = 15.6$ $\mu$A.
- $I_C = 1.560$ mA, $I_E = 1.575$ mA.
- $V_{CE} = 12 - 1.560 \times 4 - 1.575 \times 1 = 4.19$ V, so the transistor is in the active region.
- $g_m = 1.560/25 = 62.4$ mA/V, $A_v = -62.4 \times 4 = -249.5$.
- Check: $r_\pi = 100/62.4 \text{ mS} = 1.60$ k$\Omega$; gain via $-\beta R_C / r_\pi = -100 \times 4/1.603 = -249.5$. Agrees.

COMMON TRAPS
- Ignoring $R_{TH}$ when it is not small compared with $(\beta+1)R_E$.
- Forgetting that a bypassed $R_E$ is shorted only for AC, not DC.
- Confusing which topology raises input resistance; series mixing at the input always raises it.
- Using the wrong RC oscillator formula for a different network arrangement.

GATE PATTERN
- NAT: Q-point values, small-signal gain, cutoff frequency, oscillation frequency, closed-loop gain.
- MCQ: identify feedback topology, effect of feedback on resistances, region of operation.
- MSQ: statements about Miller effect, biasing stability, Barkhausen criterion.
- Shortcut: if $(\beta+1)R_E \geq 10R_2$, approximate $V_E \approx V_{TH} - V_{BE}$ and $I_C \approx V_E/R_E$.
- Shortcut: when $A\beta \gg 1$, $A_f \approx 1/\beta$.
