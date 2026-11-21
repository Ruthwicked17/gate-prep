Stability: Routh, Nyquist, Bode, Root Locus

KEY IDEAS
- An LTI system is BIBO stable if all closed-loop poles lie in the open left half of the s-plane. Poles on the $j\omega$ axis (non-repeated) give marginal stability.
- Routh-Hurwitz: build the Routh array from the characteristic equation coefficients. The number of sign changes in the first column equals the number of right-half-plane roots.
- Special cases: a zero first-column element is replaced by a small $\epsilon$; an entire zero row means symmetric roots, so form the auxiliary equation from the row above and differentiate it.
- Root locus: path of closed-loop poles as gain $K$ varies from 0 to infinity for $1 + KG(s)H(s) = 0$. It starts at open-loop poles and ends at open-loop zeros or at infinity along asymptotes.
- A real-axis point is on the locus if the total number of real poles and zeros to its right is odd.
- Bode plot: magnitude in dB and phase versus $\log\omega$. Each pole adds -20 dB/decade, each zero adds +20 dB/decade after its corner frequency.
- Nyquist criterion: $Z = N + P$, where $P$ is the number of open-loop RHP poles, $N$ is the number of clockwise encirclements of $-1$ by the Nyquist plot of $GH$, and $Z$ is the number of closed-loop RHP poles. Stability needs $Z = 0$.
- Gain margin and phase margin measure how far the system is from instability. For minimum-phase systems both must be positive for stability.

FORMULAS
- Asymptote angles: $\dfrac{(2q+1)180^\circ}{P - Z}$, $q = 0, 1, \dots$
- Centroid: $\sigma = \dfrac{\sum \text{poles} - \sum \text{zeros}}{P - Z}$.
- Breakaway points: solve $\dfrac{dK}{ds} = 0$ and keep roots that lie on the locus.
- Magnitude condition: $|KG(s)H(s)| = 1$; angle condition: $\angle G(s)H(s) = \pm 180^\circ(2q+1)$.
- Gain margin: $GM = \dfrac{1}{|GH(j\omega_{pc})|}$, where $\omega_{pc}$ is the phase crossover ($\angle GH = -180^\circ$). In dB: $-20\log_{10}|GH(j\omega_{pc})|$.
- Phase margin: $PM = 180^\circ + \angle GH(j\omega_{gc})$, where $\omega_{gc}$ is the gain crossover ($|GH| = 1$).
- Approximation for second-order systems: $PM$ in degrees is roughly $100\zeta$ for $\zeta$ up to about 0.6.

WORKED EXAMPLE
Unity feedback with $G(s) = \dfrac{K}{s(s+1)(s+3)}$. Find the range of $K$ for stability, the oscillation frequency, and the breakaway point.
- Characteristic equation: $s^3 + 4s^2 + 3s + K = 0$.
- Routh rows: $s^3$: 1, 3. $s^2$: 4, $K$. $s^1$: $\dfrac{12 - K}{4}$. $s^0$: $K$.
- Stability needs $K > 0$ and $12 - K > 0$, so $0 < K < 12$.
- At $K = 12$ the $s^1$ row is zero. Auxiliary equation $4s^2 + 12 = 0$ gives $s = \pm j\sqrt{3}$, so $\omega = 1.732$ rad/s.
- Check: $|j\sqrt{3}| \cdot |j\sqrt{3} + 1| \cdot |j\sqrt{3} + 3| = 1.732 \times 2 \times 3.464 = 12$. Correct.
- Root locus: centroid $= (0 - 1 - 3)/3 = -1.333$, asymptotes at $60^\circ$, $180^\circ$, $300^\circ$.
- Breakaway: $K = -(s^3 + 4s^2 + 3s)$, so $3s^2 + 8s + 3 = 0$, giving $s = -0.451$ or $s = -2.215$. Only $-0.451$ lies on the locus segment between 0 and -1.
- Gain margin at $K = 3$ is $12/3 = 4$, about 12 dB.

COMMON TRAPS
- Routh tells you how many RHP roots, not where they are.
- Missing or negative coefficients rule out asymptotic stability (unstable, or at best marginal as in $s^2 + 4$), but all positive coefficients do not guarantee stability beyond second order.
- In Nyquist, the sign convention of $N$ (clockwise vs counterclockwise) must match the formula you use.
- Phase margin and gain margin are read from the open-loop $GH$, not the closed loop.
- For non-minimum-phase systems, positive margins do not by themselves guarantee stability.

GATE PATTERN
- NAT: range of $K$, frequency of oscillation, gain margin, phase margin, breakaway point.
- MCQ: identify a correct root locus sketch or Bode asymptote; Nyquist encirclement counting.
- MSQ: which statements about stability or margins are true.
- Shortcut: for a cubic $a_3 s^3 + a_2 s^2 + a_1 s + a_0$, stability needs all coefficients positive and $a_2 a_1 > a_3 a_0$.
- Shortcut: the $K$ that makes the Routh row vanish equals the inverse of $|G|$ at phase crossover, so it gives the gain margin directly (usual case only: not for conditionally stable systems or systems that go unstable as $K$ decreases).
