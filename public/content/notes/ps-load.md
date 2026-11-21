Load Flow and Economic Dispatch

Load flow finds the steady-state voltage magnitude and angle at every bus for a given generation and load. It is built on the bus admittance matrix and solved iteratively. Economic dispatch then decides how to share load among generators at minimum cost, while voltage and frequency control keep the system within limits.

KEY IDEAS
- Bus types: slack (V and $\delta$ specified; supplies losses), PV or generator bus (P and $|V|$ specified), PQ or load bus (P and Q specified).
- $Y_{bus}$ diagonal element $Y_{ii}$ is the sum of all admittances connected to bus $i$ (including shunt charging); off-diagonal $Y_{ij}$ is the negative of the admittance between buses $i$ and $j$.
- $Y_{bus}$ is symmetric (without phase shifters) and sparse; most off-diagonal entries are zero in real networks.
- Gauss-Seidel: simple, low memory per iteration, linear convergence, many iterations; an acceleration factor (typically around 1.6) speeds it up.
- Newton-Raphson: uses the Jacobian, quadratic convergence, few iterations nearly independent of system size, more computation per iteration.
- Fast decoupled load flow exploits weak coupling between P and $|V|$, and between Q and $\delta$.
- Economic dispatch (losses neglected): all units run at equal incremental cost $\lambda$, subject to generator limits. A unit at its limit is fixed there and the rest re-dispatched.
- With losses, each unit's incremental cost is multiplied by its penalty factor.
- Frequency is linked to active power balance (P-f control, governor and AGC). Voltage is linked to reactive power (Q-V control: AVR, tap changers, shunt compensation).

FORMULAS
- $I_{bus} = Y_{bus} V_{bus}$
- Power at bus $i$: $P_i - jQ_i = V_i^* \sum_{k} Y_{ik} V_k$
- Gauss-Seidel update: $V_i^{new} = \frac{1}{Y_{ii}}\left[\frac{P_i - jQ_i}{V_i^*} - \sum_{k \ne i} Y_{ik} V_k\right]$ using latest values
- NR size (polar form), $n$ buses with $m$ PV buses besides slack: number of equations $= 2(n-1) - m$
- Equal incremental cost: $\frac{dC_i}{dP_i} = \lambda$, $\sum P_i = P_D$ (lossless)
- With losses: $\frac{dC_i}{dP_i} L_i = \lambda$, penalty factor $L_i = \frac{1}{1 - \partial P_L/\partial P_i}$
- Speed regulation: $\Delta f = -R\,\Delta P$; in MW, parallel units share load as $\Delta P_i = -S_i \Delta f / R_i$ ($R_i$ in pu on own rating), so equal pu droops share in proportion to ratings
- Static frequency deviation for area: $\Delta f = \frac{-\Delta P_D}{\beta}$, $\beta = D + \frac{1}{R}$

WORKED EXAMPLE
Two units have incremental costs $IC_1 = 0.01P_1 + 20$ and $IC_2 = 0.015P_2 + 20$ Rs/MWh. Load is 250 MW, losses and limits neglected. Find the dispatch.
- Set equal: $0.01P_1 + 20 = 0.015P_2 + 20$, so $0.01P_1 = 0.015(250 - P_1)$
- $0.025P_1 = 3.75$, giving $P_1 = 150$ MW, $P_2 = 100$ MW
- Check: $\lambda = 0.01(150) + 20 = 21.5$ and $0.015(100) + 20 = 21.5$ Rs/MWh. Equal, and $150 + 100 = 250$. Verified.

COMMON TRAPS
- Forgetting line charging $y/2$ at each end when forming $Y_{ii}$.
- Sign of off-diagonal elements: they are negative of branch admittance.
- Counting Jacobian size with the slack bus included; the slack has no unknowns.
- Equalising total costs instead of incremental costs.
- Ignoring limits: if a computed dispatch exceeds a unit's maximum, fix it at the maximum and redo with the others.
- Mixing up which unit takes more load: the unit with a smaller slope of incremental cost picks up more of any load change.

GATE PATTERN
- NAT on forming $Y_{bus}$ entries, one Gauss-Seidel iteration, Jacobian dimension, economic dispatch and droop load sharing; MCQ on bus types and convergence properties; MSQ on statements comparing GS and NR.
- Shortcut: for lossless dispatch with $IC_i = a_i P_i + b_i$, $\lambda = \frac{P_D + \sum b_i/a_i}{\sum 1/a_i}$, then $P_i = (\lambda - b_i)/a_i$.
- Shortcut: removing a line between $i$ and $j$ changes only $Y_{ii}$, $Y_{jj}$, $Y_{ij}$ and $Y_{ji}$.
