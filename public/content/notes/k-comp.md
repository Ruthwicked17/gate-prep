Compensators and PID

KEY IDEAS
- A compensator is an extra block added in the loop to reshape the response when gain adjustment alone cannot meet both transient and steady-state specs.
- Lead compensator: zero closer to the origin than the pole. It adds positive phase near the gain crossover, increases phase margin and bandwidth, and speeds up the response. It behaves like an approximate PD controller (high-pass).
- Lag compensator: pole closer to the origin than the zero. It raises low-frequency gain relative to high-frequency gain, improving steady-state error without much change in transient response. It reduces bandwidth and behaves like an approximate PI controller (low-pass).
- Lead-lag compensator: combines both, improving transient response and steady-state accuracy together.
- P controller: output proportional to error. Higher $K_p$ reduces steady-state error and speeds response but increases overshoot; it cannot remove step error in a type 0 plant.
- PI controller: adds a pole at the origin and a zero. It raises system type by one, so step error becomes zero for a type 0 plant, but it can make the response more oscillatory.
- PD controller: adds a zero. It adds damping, reduces overshoot and settling time, but amplifies high-frequency noise.
- PID controller: combines all three; widely used in industry.

FORMULAS
- Lead: $C(s) = \dfrac{1 + aTs}{1 + Ts}$ with $a > 1$. Zero at $-1/(aT)$, pole at $-1/T$.
- Maximum phase lead: $\sin\phi_m = \dfrac{a - 1}{a + 1}$, at $\omega_m = \dfrac{1}{T\sqrt{a}}$ (geometric mean of the corner frequencies).
- Magnitude added by lead at $\omega_m$: $10\log_{10} a$ dB.
- Lag: $C(s) = \dfrac{1 + Ts}{1 + bTs}$ with $b > 1$. It reduces high-frequency gain by $20\log_{10} b$ dB.
- Equivalent form: $C(s) = \dfrac{s + z}{s + p}$; lead if $z < p$, lag if $z > p$ (both positive).
- PID: $u(t) = K_p e + K_i \int e\,dt + K_d \dfrac{de}{dt}$, so $C(s) = K_p + \dfrac{K_i}{s} + K_d s$.
- Ziegler-Nichols ultimate gain method for PID: $K_p = 0.6K_u$, $T_i = P_u/2$, $T_d = P_u/8$, where $K_u$ is the gain at sustained oscillation and $P_u$ its period.

WORKED EXAMPLE
A lead compensator has $a = 3$ and $T = 0.1$ s. Find the maximum phase lead, the frequency at which it occurs, and the gain added there.
- $\sin\phi_m = (3 - 1)/(3 + 1) = 0.5$, so $\phi_m = 30^\circ$.
- Corner frequencies: zero at $1/(aT) = 3.333$ rad/s, pole at $1/T = 10$ rad/s.
- $\omega_m = \dfrac{1}{0.1\sqrt{3}} = 5.774$ rad/s.
- Check: geometric mean $\sqrt{3.333 \times 10} = \sqrt{33.33} = 5.774$ rad/s. Agrees.
- Gain at $\omega_m$: $10\log_{10} 3 = 4.77$ dB.
- Design note: if the plant needs 30 degrees more phase margin, place $\omega_m$ at the new gain crossover, which is where the uncompensated magnitude is $-4.77$ dB.

COMMON TRAPS
- Mixing up lead and lag: in lead the zero is nearer the origin; in lag the pole is nearer the origin.
- Assuming lag improves speed; it slows the response slightly and reduces bandwidth.
- Forgetting that a single lead stage gives at most 90 degrees in theory; practical designs use under about 60 degrees per stage.
- Derivative action alone does nothing to a constant error.
- Integral action raises system type, which can reduce stability margins.

GATE PATTERN
- NAT: maximum phase lead, frequency of maximum phase, or gain contributed by a lead network.
- MCQ: identify whether a given network or transfer function is lead or lag; effect of P, PI, PD on error and damping.
- MSQ: which statements about PID terms are correct.
- Shortcut: for $\dfrac{s + z}{s + p}$, compute $a = p/z$ and use $\sin\phi_m = (a-1)/(a+1)$ directly.
- Shortcut: $\omega_m = \sqrt{zp}$ for the form $\dfrac{s+z}{s+p}$.
