Laplace and Z Transforms

KEY IDEAS
- The Laplace transform generalises the Fourier transform with $s = \sigma + j\omega$. It handles growing signals and initial conditions, and it turns differential equations into algebra.
- Region of convergence (ROC): the set of s for which the transform integral converges. The ROC never contains a pole.
  - Right-sided signal: the ROC lies to the right of the rightmost pole.
  - Left-sided signal: the ROC lies to the left of the leftmost pole.
  - Two-sided signal: the ROC is a vertical strip.
- The same $X(s)$ with a different ROC corresponds to a different time signal. Always state the ROC.
- A causal LTI system is stable if and only if all poles of $H(s)$ lie in the left half plane. More generally, a system is stable if its ROC includes the $j\omega$ axis.
- The Z transform plays the same role for DT signals, with $z = re^{j\omega}$.
  - Right-sided sequence: the ROC is outside the outermost pole, $|z| > r_{max}$.
  - Left-sided sequence: the ROC is inside the innermost pole.
  - A system is stable if its ROC includes the unit circle $|z| = 1$.
  - A causal system is stable if and only if all its poles lie inside the unit circle.
- System analysis: the transfer function $H = Y/X$ is the transform of the impulse response, found with zero initial conditions. Poles determine the natural modes, and zeros shape the response.
- Inverse transforms are usually found by partial fractions followed by standard pairs.

FORMULAS
- Laplace pairs:
  - $\delta(t) \leftrightarrow 1$
  - $u(t) \leftrightarrow \frac{1}{s}$
  - $e^{-at}u(t) \leftrightarrow \frac{1}{s + a}$
  - $t^nu(t) \leftrightarrow \frac{n!}{s^{n+1}}$
  - $\sin(\omega t)u(t) \leftrightarrow \frac{\omega}{s^2 + \omega^2}$
- Laplace properties:
  - Derivative: $\frac{dx}{dt} \leftrightarrow sX(s) - x(0^-)$
  - Time shift: $x(t - t_0) \leftrightarrow e^{-st_0}X(s)$
  - Multiplication by an exponential: $e^{-at}x(t) \leftrightarrow X(s + a)$
- Initial value theorem: $x(0^+) = \lim_{s\to\infty}sX(s)$
- Final value theorem: $x(\infty) = \lim_{s\to 0}sX(s)$. It is valid only if all poles of $sX(s)$ lie in the left half plane.
- Z pairs:
  - $a^nu[n] \leftrightarrow \frac{z}{z - a}$ with ROC $|z| > |a|$
  - $-a^nu[-n-1] \leftrightarrow \frac{z}{z - a}$ with ROC $|z| < |a|$
- Z properties:
  - Delay: $x[n - k] \leftrightarrow z^{-k}X(z)$
  - Initial value (causal sequences only): $x[0] = \lim_{z\to\infty}X(z)$
  - Final value: $x[\infty] = \lim_{z\to 1}(z - 1)X(z)$, valid only if the poles of $(z-1)X(z)$ lie inside the unit circle

WORKED EXAMPLE
Take $H(s) = \frac{1}{(s+1)(s+2)}$. Find the impulse response and the final value of the step response.
- Partial fractions: $\frac{1}{(s+1)(s+2)} = \frac{1}{s+1} - \frac{1}{s+2}$
- Impulse response: $h(t) = (e^{-t} - e^{-2t})u(t)$
- Step response: $Y(s) = \frac{H(s)}{s}$. By the final value theorem, $y(\infty) = \lim_{s\to 0}H(s) = \frac{1}{2} = 0.5$.
- Check in the time domain: $y(t) = 0.5 - e^{-t} + 0.5e^{-2t}$. This gives $y(0) = 0$ and $y(\infty) = 0.5$, which matches.

COMMON TRAPS
- Applying the final value theorem to an unstable system or a pure oscillation, where it gives a wrong finite answer.
- Leaving out the ROC, or picking a causal ROC when the system is stated to be stable but has a right half plane pole. In that case the ROC must be the region containing the $j\omega$ axis (a strip, or a left half plane if all poles are in the RHP).
- Confusing the Z-domain stability boundary (the unit circle) with the s-domain boundary (the $j\omega$ axis).
- Forgetting the initial-condition terms when using the derivative property on a differential equation.

GATE PATTERN
- NAT: a final or initial value, an inverse transform value at a given t or n, or a DC gain $H(0)$ or $H(1)$.
- MSQ: identify the ROC, causality and stability from a given pole-zero plot.
- Shortcut: the DC gain is $H(0)$ for a CT system and $H(1)$ for a DT system. It gives the steady-state step output directly when the system is stable.
- Shortcut: for a DT system, read the poles from the denominator in $z$, not in $z^{-1}$.
