Protection and Circuit Breakers

Protection detects abnormal conditions and isolates the faulty part quickly while leaving the rest of the system in service. Relays sense via current and voltage transformers and decide; circuit breakers interrupt the current. Good protection is selective, fast, sensitive, reliable and stable for faults outside its zone.

KEY IDEAS
- Overcurrent relays: instantaneous, definite time, and inverse definite minimum time (IDMT). Settings are plug setting (pickup) and time multiplier setting (TMS). Coordination of radial feeders uses a grading margin between upstream and downstream relays.
- Directional relay: operates only for power flow in one direction, using a voltage polarising quantity. Needed on ring mains and parallel feeders.
- Differential protection: compares current entering and leaving a zone (transformers, generators, busbars). Percentage (biased) differential uses restraint to avoid maloperation from CT mismatch and tap changing.
- Transformer differential: CTs on the star side are connected in delta and on the delta side in star to correct phase shift. Second-harmonic restraint blocks tripping on magnetising inrush.
- Distance protection measures $Z = V/I$ to the fault, which is proportional to line length. Impedance relay (circle centred at origin, non-directional), reactance relay (horizontal line, unaffected by arc resistance, used on short lines), mho relay (circle through origin, inherently directional, used on long lines, least affected by power swings).
- Zones: zone 1 about 80 to 90 percent of the line instantaneous; zone 2 about 120 to 150 percent of the line with a delay (textbooks vary); zone 3 backup with longer delay.
- Circuit breakers: arc is extinguished at current zero. Media include air blast, oil, vacuum (medium voltage) and $SF_6$ (high voltage, strongly electronegative).
- After current zero, restriking voltage appears; its rate of rise (RRRV) decides whether the arc re-ignites. Resistance switching damps it.
- Current chopping (interrupting small inductive currents before zero) causes high overvoltage; capacitor switching risks restrike.

FORMULAS
- Plug setting multiplier: $PSM = \frac{I_{fault}/\text{CT ratio}}{\text{relay pickup current}}$
- IEC standard inverse: $t = TMS \times \frac{0.14}{PSM^{0.02} - 1}$
- Energy at chopping: $\frac{1}{2}L i^2 = \frac{1}{2}C v^2$, so $v = i\sqrt{L/C}$
- Natural frequency of restriking: $f_n = \frac{1}{2\pi\sqrt{LC}}$
- Undamped restriking voltage: $v = V_m(1 - \cos\omega_n t)$, peak $2V_m$, maximum RRRV $= V_m\omega_n$
- Making current $= 2.55 \times$ rms symmetrical breaking current ($1.8 \times \sqrt{2}$)
- Breaking capacity (MVA) $= \sqrt{3} \times V_{kV} \times I_{kA}$

WORKED EXAMPLE
IDMT relay (standard inverse), CT 400/5 A, plug setting 125 percent of 5 A, TMS 0.2, fault current 4000 A. Find the operating time.
- Relay current $= 4000 \times 5/400 = 50$ A; pickup $= 1.25 \times 5 = 6.25$ A
- $PSM = 50/6.25 = 8$
- $8^{0.02} = e^{0.02\ln 8} = e^{0.04159} = 1.04247$, so $t_{TMS=1} = 0.14/0.04247 = 3.297$ s
- $t = 0.2 \times 3.297 = 0.659$ s
- Check by direct computation of the formula: 0.6594 s. Verified.

COMMON TRAPS
- Using primary fault current directly in PSM without dividing by CT ratio.
- Thinking the impedance relay is directional; it is not, it needs a directional unit.
- Assuming a reactance relay is good for long lines; it is preferred for short lines with arc resistance.
- Forgetting the factor 2 in peak restriking voltage for an undamped circuit.
- Confusing making current (peak, asymmetrical) with breaking current (rms symmetrical).

GATE PATTERN
- NAT on IDMT time, PSM, relay coordination time, restriking frequency, RRRV and chopping overvoltage; MCQ on relay characteristic shapes and CT connections; MSQ on circuit breaker media and inrush restraint.
- Shortcut: at fixed PSM, operating time scales directly with TMS.
- Shortcut: for a relay seeing fault through a line, the relay sees secondary impedance $Z_{sec} = Z_{pri}\times\frac{\text{CT ratio}}{\text{PT ratio}}$.
