Symmetrical Components and Faults

Fault analysis finds currents and voltages when a short circuit occurs, which is needed to size breakers and set relays. A balanced (three-phase) fault needs only the positive-sequence network. Unbalanced faults are solved by Fortescue's method of symmetrical components: any unbalanced set of three phasors equals the sum of positive, negative and zero sequence balanced sets.

KEY IDEAS
- Operator $a = 1\angle 120^\circ$, with $1 + a + a^2 = 0$ and $a^3 = 1$.
- Positive sequence: abc rotation; negative sequence: acb rotation; zero sequence: three equal in-phase phasors.
- Zero-sequence current flows only if there is a return path (neutral or ground). An ungrounded star or delta blocks it from the line side.
- Neutral impedance $Z_n$ appears as $3Z_n$ in the zero-sequence network only.
- For static, transposed elements (lines, transformers) $Z_1 = Z_2$. For lines usually $Z_0 > Z_1$. For rotating machines $Z_2$ differs from $Z_1$.
- Transformer zero-sequence connection depends on winding type: star-grounded/delta passes zero-sequence current on the grounded side only and isolates the other side.
- Star-delta transformers shift positive sequence by $+30^\circ$ and negative sequence by $-30^\circ$ (or vice versa, depending on vector group).
- Severity: usually three-phase fault gives the largest current, but a single line-to-ground fault can exceed it at a solidly grounded generator where $Z_0$ is small.
- Fault MVA (three-phase) in pu equals $1/Z_{th}$ for prefault voltage 1 pu.

FORMULAS
- $V_{a0} = \frac{1}{3}(V_a + V_b + V_c)$, $V_{a1} = \frac{1}{3}(V_a + aV_b + a^2V_c)$, $V_{a2} = \frac{1}{3}(V_a + a^2V_b + aV_c)$
- Neutral current $I_n = 3I_{a0}$
- Three-phase fault: $I_f = \frac{E}{Z_1 + Z_f}$
- Single line-to-ground: $I_{a1} = I_{a2} = I_{a0} = \frac{E}{Z_1 + Z_2 + Z_0 + 3Z_f}$, $I_f = 3I_{a0}$ (sequence networks in series)
- Line-to-line (b-c): $I_{a1} = -I_{a2} = \frac{E}{Z_1 + Z_2 + Z_f}$, $I_{a0} = 0$, $|I_f| = \sqrt{3}\,|I_{a1}|$ (positive and negative networks in parallel)
- Double line-to-ground: $I_{a1} = \frac{E}{Z_1 + \frac{Z_2 (Z_0 + 3Z_f)}{Z_2 + Z_0 + 3Z_f}}$ (all three networks in parallel), $I_n = 3I_{a0}$
- Power: $S = 3(V_{a0}I_{a0}^* + V_{a1}I_{a1}^* + V_{a2}I_{a2}^*)$
- Short-circuit MVA $= \frac{\text{MVA}_{base}}{Z_{th,pu}}$

WORKED EXAMPLE
A generator with $E = 1$ pu, $Z_1 = Z_2 = j0.2$ pu, $Z_0 = j0.1$ pu, solidly grounded. Compare SLG and LL fault currents.
- SLG: $I_{a0} = \frac{1}{j(0.2 + 0.2 + 0.1)} = -j2$ pu, so $I_f = 3 \times 2 = 6$ pu
- LL: $I_{a1} = \frac{1}{j0.4} = -j2.5$ pu, so $|I_f| = \sqrt{3}\times 2.5 = 4.33$ pu
- Three-phase: $1/0.2 = 5$ pu. So here SLG (6 pu) exceeds three-phase (5 pu), as expected when $Z_0 < Z_1$.
- Check: $3/0.5 = 6$ and $1.732/0.4 = 4.33$. Verified.

COMMON TRAPS
- Forgetting the factor 3 on $Z_f$ and $Z_n$ in the zero-sequence path.
- Reporting $I_{a0}$ as the fault current in SLG; the fault current is $3I_{a0}$.
- Including the zero-sequence network in an LL fault; it plays no role.
- Ignoring transformer connections that block zero sequence, which makes $Z_0$ infinite and SLG current zero.
- Mixing pu bases when combining generator and line impedances.

GATE PATTERN
- NAT on SLG, LL and LLG fault currents, sequence components of given unbalanced phasors, and fault MVA; MCQ on sequence network connections; MSQ on zero-sequence paths through transformer groups.
- Shortcut: if sequence currents for a fault are given, identify the fault: $I_1 = I_2 = I_0$ is SLG, $I_1 = -I_2$ with $I_0 = 0$ is LL, $I_1 = -(I_2 + I_0)$ is LLG.
- Shortcut: for an unloaded generator, ratio of SLG to three-phase current is $\frac{3Z_1}{Z_1 + Z_2 + Z_0}$.
