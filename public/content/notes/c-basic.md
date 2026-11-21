Network Elements and Solution Methods

KEY IDEAS
- An ideal voltage source holds its terminal voltage regardless of current; an ideal current source holds its current regardless of voltage. Never short an ideal voltage source or open an ideal current source in a real analysis.
- Dependent (controlled) sources come in four types: VCVS, VCCS, CCVS, CCCS. Their value depends on a voltage or current elsewhere in the circuit, so they are never switched off when you apply superposition or find a Thevenin resistance.
- Resistor: $v = iR$, dissipates power. Inductor: $v = L\frac{di}{dt}$, stores energy in its magnetic field, and its current cannot change instantly. Capacitor: $i = C\frac{dv}{dt}$, stores energy in its electric field, and its voltage cannot change instantly.
- Under DC steady state an inductor acts as a short circuit and a capacitor acts as an open circuit.
- Mutual inductance $M$ couples two coils. The dot convention sets the sign: if both currents enter dotted ends, the mutual voltage term is positive.
- KCL: the algebraic sum of currents leaving a node is zero (conservation of charge). KVL: the algebraic sum of voltages around a closed loop is zero (conservation of energy).
- Node analysis: choose a reference node and write KCL at the other $N-1$ nodes, with node voltages as unknowns. If a voltage source sits between two non-reference nodes, enclose both in a supernode and add the source's constraint equation.
- Mesh analysis (planar circuits only): write KVL in each of the $B-N+1$ independent meshes, with mesh currents as unknowns. If a current source is shared by two meshes, form a supermesh.
- Source transformation: a voltage source $V$ in series with $R$ is equivalent to a current source $V/R$ in parallel with $R$.

FORMULAS
- Inductor energy $W_L = \frac{1}{2}Li^2$; capacitor energy $W_C = \frac{1}{2}Cv^2$
- Series resistors: $R_{eq} = R_1 + R_2$; parallel: $R_{eq} = \frac{R_1R_2}{R_1+R_2}$
- Series inductors add like resistors; series capacitors combine like parallel resistors: $\frac{1}{C_{eq}} = \frac{1}{C_1} + \frac{1}{C_2}$
- Coupling coefficient: $M = k\sqrt{L_1L_2}$, with $0 \le k \le 1$
- Coupled coils in series: aiding $L_{eq} = L_1 + L_2 + 2M$; opposing $L_{eq} = L_1 + L_2 - 2M$
- Coupled coil voltage: $v_1 = L_1\frac{di_1}{dt} \pm M\frac{di_2}{dt}$
- Stored energy in coupled coils: $W = \frac{1}{2}L_1i_1^2 + \frac{1}{2}L_2i_2^2 \pm Mi_1i_2$
- Voltage divider: $v_1 = V\frac{R_1}{R_1+R_2}$; current divider: $i_1 = I\frac{R_2}{R_1+R_2}$

WORKED EXAMPLE
A 12 V source in series with $2\,\Omega$ feeds node A. Node A connects to ground through $6\,\Omega$. A 1 A current source also injects current into node A. Find $V_A$.
- KCL at A, with currents leaving taken as positive: $\frac{V_A - 12}{2} + \frac{V_A}{6} = 1$
- Multiply through by 6: $3(V_A - 12) + V_A = 6$, so $4V_A = 42$ and $V_A = 10.5$ V
- Check: $\frac{10.5-12}{2} = -0.75$ A and $\frac{10.5}{6} = 1.75$ A. They sum to 1 A, matching the injected current.

COMMON TRAPS
- Sign errors with dependent sources: write the controlling variable in terms of your unknowns before you solve.
- Getting the dot convention backwards with mutual inductance, which flips the sign of $2M$.
- Forgetting the constraint equation inside a supernode or supermesh.
- Treating a capacitor as a short or an inductor as an open under DC. It is the other way round.
- Counting meshes in a non-planar circuit. Use node analysis there.

GATE PATTERN
- Mostly NAT questions asking for a node voltage, branch current or power in a 2 to 3 node circuit, often with one dependent source.
- MCQs on coupled-coil equivalent inductance and energy stored.
- Shortcut: pick whichever method gives fewer equations. Node analysis needs $N-1$ equations and mesh analysis needs $B-N+1$.
- Check the power balance quickly: the total power supplied must equal the total power absorbed.
