Transformers

KEY IDEAS
- A transformer transfers power between windings through a shared magnetic core by mutual induction, at the same frequency. Turns ratio $a = \frac{N_1}{N_2} = \frac{V_1}{V_2} = \frac{I_2}{I_1}$ for an ideal transformer.
- Equivalent circuit: series winding resistances and leakage reactances, plus a shunt branch of core-loss resistance $R_0$ in parallel with magnetising reactance $X_m$. Impedances are referred to the primary by multiplying by $a^2$, and to the secondary by dividing by $a^2$.
- Open-circuit (OC) test: rated voltage on the LV side, HV open. Gives core (iron) loss and the shunt branch.
- Short-circuit (SC) test: reduced voltage on the HV side, LV shorted, rated current. Gives full-load copper loss and the series impedance.
- Core loss (hysteresis plus eddy current) is nearly constant with load; copper loss varies as the square of load.
- Voltage regulation is the change in secondary voltage from no load to full load, as a fraction of the rated value. It can be negative for leading power factor loads.
- Three-phase connections: Yy, Dd, Yd, Dy and zigzag. Vector groups describe the phase shift of LV relative to HV as clock positions: group 1 (0 degrees: Yy0, Dd0, Dz0), group 2 (180 degrees: Yy6, Dd6, Dz6), group 3 (-30 degrees: Yd1, Dy1, Yz1), group 4 (+30 degrees: Yd11, Dy11, Yz11).
- Parallel operation needs the same voltage ratio, polarity, phase sequence and phase shift. Equal per-unit impedances give load sharing in proportion to ratings; similar X/R ratios keep the currents in phase.
- An auto-transformer has a single winding with a tap. Part of the power is transferred conductively, so it uses less copper and is more efficient, but it does not isolate the two sides.

FORMULAS
- EMF: $E = 4.44 f N \phi_m$
- Efficiency at fraction $x$ of full load: $\eta = \frac{x S \cos\phi}{x S \cos\phi + P_i + x^2 P_{cu,fl}}$
- Maximum efficiency when copper loss equals core loss: $x = \sqrt{\frac{P_i}{P_{cu,fl}}}$
- Approximate regulation (per unit): $\epsilon = x\left(R_{pu}\cos\phi \pm X_{pu}\sin\phi\right)$, plus for lagging, minus for leading
- Zero regulation at leading power factor angle where $\tan\phi = \frac{R}{X}$
- Load sharing of two units in parallel: $S_1 = S_L \frac{Z_2}{Z_1 + Z_2}$, $S_2 = S_L \frac{Z_1}{Z_1 + Z_2}$ (same base)
- Auto-transformer, $k = \frac{V_{LV}}{V_{HV}}$: copper saved is fraction $k$ of a two-winding unit; inductive share $S(1-k)$, conductive share $Sk$
- Two-winding transformer reconnected as auto: $S_{auto} = \frac{S_{2w}}{1-k}$
- All-day efficiency: energy output over 24 h divided by (output plus losses) over 24 h

WORKED EXAMPLE
A 20 kVA, 2000/200 V transformer has core loss 200 W and full-load copper loss 300 W. Find full-load efficiency at 0.8 pf lagging, and the load for maximum efficiency.
- Output $= 20000 \times 0.8 = 16000$ W. Losses $= 200 + 300 = 500$ W.
- $\eta = \frac{16000}{16500} = 0.9697$, that is 96.97%.
- Maximum efficiency: $x = \sqrt{\frac{200}{300}} = 0.8165$, so load $= 0.8165 \times 20 = 16.33$ kVA.
- At unity pf, $\eta_{max} = \frac{16330}{16330 + 400} = 97.61\%$ (copper loss there equals 200 W).
- Check: losses fraction $\frac{500}{16500} = 3.03\%$, giving 96.97% again.

COMMON TRAPS
- Using SC test copper loss at a current other than rated without scaling by the square of the current ratio.
- Referring impedances with $a$ instead of $a^2$.
- Assuming maximum efficiency always occurs at full load.
- Paralleling a group 3 unit with a group 4 unit; their 60 degree phase difference causes a large circulating current.
- Forgetting that an auto-transformer's rating is higher than the two-winding rating of the same winding.

GATE PATTERN
- NAT questions on efficiency, maximum efficiency load, regulation, OC/SC test parameters, load sharing and auto-transformer kVA.
- MCQs on vector group phase shift and parallel operation conditions.
- MSQs on which test gives which parameter, and statements about losses.
- Tip: work in per unit; regulation and losses become simple fractions.
- Tip: the load for maximum efficiency does not depend on power factor, but the maximum efficiency value does.
