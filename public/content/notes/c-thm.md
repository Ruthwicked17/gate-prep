Network Theorems

KEY IDEAS
- Thevenin's theorem: any linear two-terminal network can be replaced by a voltage source $V_{th}$ in series with $R_{th}$ (or $Z_{th}$ in AC). $V_{th}$ is the open-circuit voltage at the terminals.
- Norton's theorem: the same network can be replaced by a current source $I_N$ in parallel with $R_N$. $I_N$ is the short-circuit current, and $R_N = R_{th}$.
- Finding $R_{th}$:
  - Independent sources only: deactivate them (voltage sources become shorts, current sources become opens) and find the resistance seen from the terminals.
  - With dependent sources: keep them active. Either use $R_{th} = V_{oc}/I_{sc}$, or apply a test source $V_t$ with all independent sources off and use $R_{th} = V_t/I_t$.
- A network that contains only dependent sources and resistors has $V_{th} = 0$. It can still have a nonzero, or even negative, $R_{th}$.
- Superposition: in a linear network, any response equals the sum of the responses to each independent source acting alone, with the other independent sources deactivated. It applies to voltages and currents, not to power, because power is quadratic.
- Superposition is the tool to use when sources have different frequencies, for example a DC source plus an AC source. Solve each frequency separately and add in the time domain.
- Maximum power transfer: a load receives maximum power when it matches the source's Thevenin impedance in the appropriate sense. At that point the transfer efficiency is only 50 percent.

FORMULAS
- $V_{th} = V_{oc}$, $I_N = I_{sc}$, $R_{th} = \frac{V_{oc}}{I_{sc}}$
- Resistive MPT: $R_L = R_{th}$, giving $P_{max} = \frac{V_{th}^2}{4R_{th}}$
- AC, load impedance fully variable: $Z_L = Z_{th}^{*}$, giving $P_{max} = \frac{|V_{th}|^2}{4R_{th}}$, where $V_{th}$ is an RMS value
- AC, only a resistive $R_L$ is variable: $R_L = |Z_{th}|$
- Load power for a general load: $P_L = \frac{V_{th}^2R_L}{(R_{th}+R_L)^2}$

WORKED EXAMPLE
A 24 V source with series $4\,\Omega$ is connected across a $12\,\Omega$ shunt resistor. A $3\,\Omega$ series resistor then leads to terminals a-b. Find the Thevenin equivalent and the maximum power that can be delivered to a load across a-b.
- $V_{th}$: no current flows in the $3\,\Omega$ resistor when the terminals are open, so $V_{th} = 24 \times \frac{12}{4+12} = 18$ V.
- $R_{th}$: short the source. Then $4 \parallel 12 = 3\,\Omega$, plus the series $3\,\Omega$, gives $R_{th} = 6\,\Omega$.
- $P_{max} = \frac{18^2}{4 \times 6} = \frac{324}{24} = 13.5$ W, delivered when $R_L = 6\,\Omega$.
- Check with Norton: $I_{sc}$ is the current into a short at a-b. Total resistance seen by the source is $4 + (12 \parallel 3) = 6.4\,\Omega$, so the source current is $3.75$ A. Splitting it gives $I_{sc} = 3.75 \times \frac{12}{15} = 3$ A, and $\frac{18}{3} = 6\,\Omega$, which matches.

COMMON TRAPS
- Switching off dependent sources while finding $R_{th}$. Never do this.
- Using superposition to add powers.
- Using $Z_L = Z_{th}$ instead of the conjugate $Z_{th}^{*}$ for AC maximum power transfer.
- Using peak values of $V_{th}$ in the $P_{max}$ formula. It needs RMS values; with peak values you get $\frac{V_m^2}{8R_{th}}$.
- Assuming maximum power transfer means maximum efficiency. It means 50 percent efficiency.

GATE PATTERN
- NAT: find $V_{th}$, $R_{th}$, the load for maximum power, or $P_{max}$. Dependent sources are common.
- MCQ/MSQ: statements about where superposition and the theorems apply, such as linearity and power.
- Shortcut: when a load is varied and two operating points (V, I) are given, they fix the two unknowns $V_{th}$ and $R_{th}$ directly.
- Shortcut: for a network with only dependent sources, go straight to a 1 A or 1 V test source.
