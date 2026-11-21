Signals and LTI Systems

KEY IDEAS
- Continuous-time (CT) signals $x(t)$ are defined for all t. Discrete-time (DT) signals $x[n]$ are defined only at integer n.
- Basic signals: the unit impulse $\delta(t)$ or $\delta[n]$, the unit step $u(t)$, the ramp, and exponentials $e^{st}$ and $z^n$.
- Time shifting, scaling and reversal of $x(at - b)$: rewrite it as $x(a(t - b/a))$. Scale by a (reverse if a is negative), then shift by $b/a$. Alternatively, shift by b first and then scale.
- Periodicity: a DT sinusoid $\cos(\omega_0 n)$ is periodic only if $\frac{\omega_0}{2\pi}$ is a ratio of integers. A sum of CT periodic signals is periodic if the ratio of their periods is rational, and its period is the LCM.
- Energy signals have finite energy and zero average power. Power signals, such as periodic signals, have finite nonzero power.
- System properties:
  - Linearity: additivity plus homogeneity. A zero input must give a zero output.
  - Time invariance: a shifted input gives an equally shifted output.
  - Causality: the output depends only on present and past inputs.
  - Memoryless: the output depends only on the present input.
  - BIBO stability: every bounded input gives a bounded output.
- An LTI system is completely described by its impulse response $h(t)$ or $h[n]$. The output is the convolution of the input with h.
- Causal LTI means $h(t) = 0$ for $t < 0$. A stable LTI system has an absolutely integrable or absolutely summable impulse response.

FORMULAS
- Energy: $E = \int_{-\infty}^{\infty}|x(t)|^2dt$
- Power: $P = \lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2dt$
- Impulse properties: $\delta(at) = \frac{1}{|a|}\delta(t)$ and $\int x(t)\delta(t - t_0)dt = x(t_0)$
- Even part: $x_e = \frac{x(t) + x(-t)}{2}$; odd part: $x_o = \frac{x(t) - x(-t)}{2}$
- CT convolution: $y(t) = \int_{-\infty}^{\infty}x(\tau)h(t - \tau)d\tau$
- DT convolution: $y[n] = \sum_k x[k]h[n - k]$
- Stability condition: $\int|h(t)|dt < \infty$ or $\sum|h[n]| < \infty$
- Length and start: if x has length N starting at $n_1$ and h has length M starting at $n_2$, then y has length $N + M - 1$ and starts at $n_1 + n_2$.
- Sum check: $\sum y = (\sum x)(\sum h)$
- Step response: $s(t) = \int_{-\infty}^{t}h(\tau)d\tau$

WORKED EXAMPLE
Take $x[n] = \{1, 2, 1\}$ for $n = 0, 1, 2$ and $h[n] = \{1, -1\}$ for $n = 0, 1$. Find $y[n] = x[n] \ast h[n]$.
- $y[0] = 1 \times 1 = 1$
- $y[1] = 2 \times 1 + 1 \times (-1) = 1$
- $y[2] = 1 \times 1 + 2 \times (-1) = -1$
- $y[3] = 1 \times (-1) = -1$
- Result: $y = \{1, 1, -1, -1\}$, with length $3 + 2 - 1 = 4$
- Check: $\sum y = 0$ and $(\sum x)(\sum h) = 4 \times 0 = 0$, which matches.

COMMON TRAPS
- Shifting $x(2t - 4)$ by 4 instead of 2 after scaling.
- Calling $y = 2x + 3$ linear. The constant offset makes it nonlinear, although it is incrementally linear.
- A system with time-varying coefficients, such as $y(t) = t\,x(t)$, is linear but not time-invariant.
- $y(t) = x(t + 1)$ is non-causal, and $y(t) = x(t/2)$ is also non-causal.
- Forgetting the factor $\frac{1}{|a|}$ when scaling an impulse.

GATE PATTERN
- MSQ: check a given system for linearity, time invariance, causality and stability. These are very frequent.
- NAT: a convolution value at a specific n or t, a signal's energy or power, or a fundamental period.
- Shortcut: for continuous convolution of two rectangular pulses, the result is a trapezoid, or a triangle if the widths are equal. Its area equals the product of the two areas.
- Shortcut: to test time invariance, check whether t appears anywhere other than inside the argument of x. Also, any argument other than $t - t_0$, such as $x(2t)$ or $x(-t)$, makes the system time-varying.
