Fourier Series, Fourier Transform, Sampling

KEY IDEAS
- CT Fourier series: a periodic signal with period T is a sum of harmonics of $\omega_0 = 2\pi/T$. The spectrum is discrete, appearing only at multiples of $\omega_0$.
- DT Fourier series: an N-periodic sequence needs only N harmonics, because $e^{jk(2\pi/N)n}$ repeats in k with period N.
- Waveform symmetry simplifies the coefficients:
  - Even signals have only cosine terms (plus the DC term).
  - Odd signals have only sine terms.
  - Half-wave symmetry, $x(t + T/2) = -x(t)$, means only odd harmonics are present.
- Gibbs phenomenon: near a jump discontinuity, the truncated series overshoots by about 9 percent of the jump, however many terms you keep.
- Fourier transform: the extension to aperiodic signals, which gives a continuous spectrum. A real signal has a conjugate-symmetric spectrum: $X(-\omega) = X^{*}(\omega)$.
- Sampling theorem: a band-limited signal with highest frequency $f_m$ is recovered exactly from samples taken at $f_s \ge 2f_m$. The minimum rate $2f_m$ is the Nyquist rate. Sampling below it causes aliasing.
- Ideal sampling makes the spectrum repeat at multiples of $f_s$. A low-pass filter with cutoff between $f_m$ and $f_s - f_m$ recovers the signal.
- RMS value is the square root of the mean of the squared signal, and it determines heating. The average value is the DC component.

FORMULAS
- Exponential series: $x(t) = \sum_k c_ke^{jk\omega_0t}$ with $c_k = \frac{1}{T}\int_T x(t)e^{-jk\omega_0t}dt$
- DTFS coefficients: $c_k = \frac{1}{N}\sum_{n=0}^{N-1}x[n]e^{-jk(2\pi/N)n}$
- Parseval for periodic signals: $P = \sum_k|c_k|^2$
- Parseval for the Fourier transform: $\int|x(t)|^2dt = \frac{1}{2\pi}\int|X(\omega)|^2d\omega$
- Fourier transform properties:
  - Time shift: $x(t - t_0) \leftrightarrow e^{-j\omega t_0}X(\omega)$
  - Frequency shift: $e^{j\omega_0t}x(t) \leftrightarrow X(\omega - \omega_0)$
  - Scaling: $x(at) \leftrightarrow \frac{1}{|a|}X(\frac{\omega}{a})$
  - Differentiation: $\frac{dx}{dt} \leftrightarrow j\omega X(\omega)$
  - Convolution: $x \ast h \leftrightarrow XH$
  - Duality: $X(t) \leftrightarrow 2\pi x(-\omega)$
- Standard pairs:
  - A rectangular pulse of width $\tau$ and height 1 transforms to $\tau\,\mathrm{sinc}$, with first zeros at $\omega = \pm 2\pi/\tau$.
  - $e^{-at}u(t) \leftrightarrow \frac{1}{a + j\omega}$ for $a > 0$
- RMS of a periodic signal: $X_{rms} = \sqrt{a_0^2 + \sum_n\frac{a_n^2 + b_n^2}{2}}$
- Sinusoid of peak $V_m$: RMS is $V_m/\sqrt{2}$
- Half-wave rectified sine: average $V_m/\pi$, RMS $V_m/2$
- Full-wave rectified sine: average $2V_m/\pi$, RMS $V_m/\sqrt{2}$
- Square wave of amplitude $\pm A$: RMS is A. Triangular wave of peak A: RMS is $A/\sqrt{3}$.

WORKED EXAMPLE
For $x(t) = 3 + 4\cos(100\pi t)$, find the average value, the RMS value and the Nyquist rate.
- The average is the DC term, which is 3.
- RMS: $\sqrt{3^2 + \frac{4^2}{2}} = \sqrt{17} \approx 4.123$
- The highest frequency is 50 Hz, so the Nyquist rate is 100 Hz.
- Check by Parseval: $|c_0|^2 + 2|c_1|^2 = 9 + 2 \times 2^2 = 17$, which matches.

COMMON TRAPS
- Adding RMS values of different harmonics directly. Add their squares, then take the root.
- Applying the Nyquist rate to the bandwidth of a product without expanding it first. For example, $\cos^2(\omega t)$ contains $2\omega$.
- Forgetting the factor $\frac{1}{|a|}$ in the scaling property, and the factor $\frac{1}{2\pi}$ in Parseval when working in $\omega$.
- Aliased frequency: a tone at f sampled at $f_s$ appears at $|f - kf_s|$, taking the k that brings it into $[0, f_s/2]$.

GATE PATTERN
- NAT: a Fourier coefficient, an RMS or average value, the Nyquist rate, an aliased frequency, or the energy by Parseval.
- MSQ: which harmonics are present given a symmetry, and properties of the transform.
- Shortcut: the DC value equals $c_0$, which equals $X(0)$ for a single period scaled by $\frac{1}{T}$.
- Shortcut: the RMS of a sum of orthogonal components is the root of the sum of the squared RMS values.
