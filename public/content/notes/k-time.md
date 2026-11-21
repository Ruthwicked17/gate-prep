Time Response and Steady-state Error

KEY IDEAS
- Time response = transient part (dies out in a stable system) + steady-state part (what remains as $t \to \infty$).
- First-order system $\dfrac{1}{\tau s + 1}$: step response $1 - e^{-t/\tau}$. It reaches 63.2 percent of final value at $t = \tau$ and has no overshoot.
- Standard second-order system: $T(s) = \dfrac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$, with natural frequency $\omega_n$ and damping ratio $\zeta$.
- Damping cases: $\zeta = 0$ undamped (sustained oscillation), $0 < \zeta < 1$ underdamped, $\zeta = 1$ critically damped, $\zeta > 1$ overdamped.
- Underdamped poles are at $-\zeta\omega_n \pm j\omega_d$, where $\omega_d = \omega_n\sqrt{1 - \zeta^2}$ is the damped frequency.
- Transient response specs: delay time, rise time, peak time, peak overshoot, settling time.
- Steady-state error depends on the input type and the system type. System type = number of open-loop poles at the origin in $G(s)H(s)$.
- Final value theorem $\lim_{t\to\infty} e(t) = \lim_{s\to 0} sE(s)$ is valid only if the closed-loop system is stable.

FORMULAS
- Peak time: $t_p = \dfrac{\pi}{\omega_d}$.
- Peak overshoot: $M_p = e^{-\pi\zeta/\sqrt{1-\zeta^2}}$.
- Rise time (0 to 100 percent): $t_r = \dfrac{\pi - \theta}{\omega_d}$, with $\theta = \cos^{-1}\zeta$.
- Settling time: $t_s \approx \dfrac{4}{\zeta\omega_n}$ (2 percent band), $\dfrac{3}{\zeta\omega_n}$ (5 percent band).
- Unity feedback error: $E(s) = \dfrac{R(s)}{1 + G(s)}$.
- Position constant $K_p = \lim_{s\to 0} G(s)$; step error $e_{ss} = \dfrac{1}{1 + K_p}$.
- Velocity constant $K_v = \lim_{s\to 0} sG(s)$; ramp error $e_{ss} = \dfrac{1}{K_v}$.
- Acceleration constant $K_a = \lim_{s\to 0} s^2 G(s)$; parabolic error $e_{ss} = \dfrac{1}{K_a}$.
- Type 0: finite step error, infinite ramp error. Type 1: zero step error, finite ramp error. Type 2: zero step and ramp error, finite parabolic error.

WORKED EXAMPLE
Unity feedback with $G(s) = \dfrac{25}{s(s+6)}$. Find $\zeta$, $\omega_n$, overshoot, peak time, settling time and ramp error.
- Closed loop: $T(s) = \dfrac{25}{s^2 + 6s + 25}$, so $\omega_n = 5$ rad/s and $2\zeta\omega_n = 6$, giving $\zeta = 0.6$.
- $\sqrt{1 - 0.36} = 0.8$, so $\omega_d = 4$ rad/s.
- $M_p = e^{-\pi(0.6)/0.8} = e^{-2.356} \approx 0.0948$, about 9.48 percent.
- $t_p = \pi/4 \approx 0.785$ s.
- $t_s = 4/(0.6 \times 5) = 1.333$ s (2 percent).
- Type 1 system, so step error is zero. $K_v = \lim_{s\to 0} s \cdot \dfrac{25}{s(s+6)} = 25/6 \approx 4.167$, ramp error $= 6/25 = 0.24$.
- Check: poles of $s^2 + 6s + 25$ are $-3 \pm j4$, confirming $\zeta\omega_n = 3$ and $\omega_d = 4$.

COMMON TRAPS
- Applying the final value theorem to an unstable closed loop gives a meaningless answer; check stability first.
- Using the closed-loop $T(s)$ instead of open-loop $G(s)$ to find $K_p$, $K_v$, $K_a$.
- For non-unity feedback, first convert to an equivalent unity feedback system or work with $E(s) = R(s) - C(s)$ directly.
- Overshoot depends only on $\zeta$; changing $\omega_n$ alone does not change it.
- The settling time formula is an envelope approximation; it is what GATE answer keys normally use.
- Extra poles or zeros make the standard formulas approximate, unless a pole is dominant.

GATE PATTERN
- NAT: compute overshoot, peak time, settling time, or steady-state error from a given $G(s)$.
- MCQ: identify $\zeta$ from a response plot or pole location; pick the system type.
- MSQ: which inputs give zero steady-state error for a given type.
- Shortcut: read $\zeta$ and $\omega_n$ straight off the characteristic polynomial $s^2 + 2\zeta\omega_n s + \omega_n^2$.
- Shortcut: remember $\zeta = 0.6$ gives about 9.5 percent overshoot and $\zeta = 0.5$ gives about 16.3 percent; useful for elimination.
- Shortcut: $\zeta = \cos\theta$, where $\theta$ is the angle of the pole from the negative real axis.
