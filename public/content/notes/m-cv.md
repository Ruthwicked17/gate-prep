COMPLEX VARIABLES

KEY IDEAS
- Write $z = x + iy$ and $f(z) = u(x, y) + i v(x, y)$.
- A function is analytic at a point if it is differentiable in a neighbourhood of that point. Polynomials, $e^z$, $\sin z$, $\cos z$ are analytic everywhere (entire). $\bar{z}$ and $|z|^2$ are analytic nowhere ($|z|^2$ is differentiable only at $z = 0$, which is not enough for analyticity).
- Cauchy-Riemann equations are necessary for analyticity; with continuous partial derivatives they are also sufficient.
- Real and imaginary parts of an analytic function are harmonic: $\nabla^2 u = 0$ and $\nabla^2 v = 0$. $v$ is called the harmonic conjugate of $u$.
- Cauchy integral theorem: if $f$ is analytic inside and on a simple closed curve $C$, then $\oint_C f(z)\,dz = 0$.
- Singularities: isolated singular points are removable, poles (of order $m$), or essential. A zero of the denominator of order $m$ (numerator non-zero) is a pole of order $m$.
- Taylor series is valid in a disc where $f$ is analytic; Laurent series has negative powers and is valid in an annulus between singularities.
- The residue at $z_0$ is the coefficient of $(z - z_0)^{-1}$ in the Laurent series about $z_0$.

FORMULAS
- Cauchy-Riemann (Cartesian): $u_x = v_y$, $u_y = -v_x$. Then $f'(z) = u_x + i v_x$.
- Cauchy-Riemann (polar): $u_r = \frac{1}{r} v_\theta$, $v_r = -\frac{1}{r} u_\theta$.
- Cauchy integral formula: $\oint_C \frac{f(z)}{z - a}dz = 2\pi i f(a)$ for $a$ inside $C$.
- Generalised: $\oint_C \frac{f(z)}{(z - a)^{n+1}}dz = \frac{2\pi i}{n!} f^{(n)}(a)$.
- Residue at a simple pole: $\lim_{z \to a}(z - a)f(z)$, or $\frac{P(a)}{Q'(a)}$ when $f = P/Q$ and $Q(a) = 0$.
- Residue at a pole of order $m$: $\frac{1}{(m-1)!}\lim_{z \to a}\frac{d^{m-1}}{dz^{m-1}}[(z - a)^m f(z)]$.
- Residue theorem: $\oint_C f(z)\,dz = 2\pi i \times$ (sum of residues at poles inside $C$).
- Geometric series: $\frac{1}{1 - z} = 1 + z + z^2 + \dots$ for $|z| < 1$, the basis of most Laurent expansions.

WORKED EXAMPLE
Evaluate $\oint_C \frac{z + 1}{z(z - 1)}dz$ where $C$ is the circle $|z| = 2$ taken anticlockwise.
- Poles at $z = 0$ and $z = 1$; both lie inside $|z| = 2$.
- Residue at $z = 0$: $\lim_{z \to 0} \frac{z + 1}{z - 1} = \frac{1}{-1} = -1$.
- Residue at $z = 1$: $\lim_{z \to 1} \frac{z + 1}{z} = 2$.
- Sum of residues $= -1 + 2 = 1$, so the integral is $2\pi i \approx 6.283i$.
- Cross-check by partial fractions: $\frac{z + 1}{z(z - 1)} = -\frac{1}{z} + \frac{2}{z - 1}$, giving $2\pi i(-1 + 2) = 2\pi i$.

COMMON TRAPS
- Including poles that lie outside the contour; always check $|z_0|$ against the radius, and for $|z - a| = r$ measure distance from $a$.
- A pole on the contour itself makes the ordinary residue theorem inapplicable.
- Laurent series of the same function differ by region; pick the annulus that contains the point of interest.
- Clockwise contours give a negative sign.
- Using the simple-pole formula on a higher-order pole.

GATE PATTERN
- Typically 1 to 2 questions in EE: NAT on a contour integral value (often as a multiple of $\pi$ or $\pi i$); MCQ on analyticity, harmonic conjugate or residue at a pole.
- Shortcut: for $f = P/Q$ with simple zeros of $Q$, use $P/Q'$ for each residue.
- To find the analytic $f$ from $u$, use Milne-Thomson: $f'(z) = u_x(z, 0) - i u_y(z, 0)$, then integrate.
- If the integrand is analytic inside the contour, the answer is $0$ immediately.
