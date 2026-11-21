CALCULUS AND VECTOR CALCULUS

KEY IDEAS
- Limits: for $0/0$ or $\infty/\infty$ forms use L'Hopital's rule; standard limit $\lim_{x \to 0} \frac{\sin x}{x} = 1$ and $\lim_{x \to \infty}(1 + 1/x)^x = e$.
- Rolle's theorem: if $f$ is continuous on $[a, b]$, differentiable on $(a, b)$ and $f(a) = f(b)$, then $f'(c) = 0$ for some $c$ in $(a, b)$.
- Lagrange mean value theorem: $f'(c) = \frac{f(b) - f(a)}{b - a}$ for some $c$ in $(a, b)$.
- Maxima and minima (one variable): critical points where $f'(x) = 0$; $f''(x) < 0$ gives a local maximum, $f''(x) > 0$ a local minimum. On a closed interval also check the endpoints.
- Two variables: at a stationary point let $r = f_{xx}$, $s = f_{xy}$, $t = f_{yy}$. If $rt - s^2 > 0$ and $r < 0$, maximum; $rt - s^2 > 0$ and $r > 0$, minimum; $rt - s^2 < 0$, saddle point; $rt - s^2 = 0$, test fails.
- Improper integrals: $\int_1^\infty \frac{dx}{x^p}$ converges iff $p > 1$; $\int_0^1 \frac{dx}{x^p}$ converges iff $p < 1$.
- Multiple integrals: change order of integration by redrawing the region; in polar coordinates $dx\,dy = r\,dr\,d\theta$.
- Gradient $\nabla f$ points in the direction of fastest increase and is normal to level surfaces. Divergence measures net outflow; curl measures rotation.
- A field is solenoidal if $\nabla \cdot F = 0$ and irrotational (conservative) if $\nabla \times F = 0$.

FORMULAS
- Taylor series about $a$: $f(x) = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \dots$; Maclaurin is the case $a = 0$.
- $e^x = 1 + x + \frac{x^2}{2!} + \dots$, $\sin x = x - \frac{x^3}{3!} + \dots$, $\cos x = 1 - \frac{x^2}{2!} + \dots$
- Leibniz rule: $\frac{d}{dx}\int_{a(x)}^{b(x)} f(t)\,dt = f(b)b' - f(a)a'$.
- Even and odd functions: $\int_{-a}^{a} f = 2\int_0^a f$ if even, $0$ if odd.
- Euler's theorem: if $f$ is homogeneous of degree $n$, $x f_x + y f_y = n f$.
- Directional derivative: $\nabla f \cdot \hat{u}$; its maximum value is $|\nabla f|$.
- Identities: $\nabla \times (\nabla f) = 0$, $\nabla \cdot (\nabla \times F) = 0$, $\nabla \cdot (\nabla f) = \nabla^2 f$, $\nabla \times (\nabla \times F) = \nabla(\nabla \cdot F) - \nabla^2 F$.
- Green: $\oint_C (P\,dx + Q\,dy) = \iint_R \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dx\,dy$; area of $R$ is $\frac{1}{2}\oint (x\,dy - y\,dx)$.
- Stokes: $\oint_C F \cdot dr = \iint_S (\nabla \times F) \cdot dS$.
- Gauss divergence: $\oiint_S F \cdot dS = \iiint_V (\nabla \cdot F)\,dV$.

WORKED EXAMPLE
Find the absolute maximum and minimum of $f(x) = x^3 - 6x^2 + 9x + 1$ on $[0, 4]$.
- $f'(x) = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$, so critical points $x = 1, 3$.
- $f''(x) = 6x - 12$: $f''(1) = -6$ (local max), $f''(3) = 6$ (local min).
- Values: $f(0) = 1$, $f(1) = 1 - 6 + 9 + 1 = 5$, $f(3) = 27 - 54 + 27 + 1 = 1$, $f(4) = 64 - 96 + 36 + 1 = 5$.
- Absolute maximum $= 5$ (at $x = 1$ and $x = 4$), absolute minimum $= 1$ (at $x = 0$ and $x = 3$).

COMMON TRAPS
- Ignoring endpoints when asked for absolute extrema on a closed interval.
- Applying L'Hopital to a form that is not $0/0$ or $\infty/\infty$.
- Forgetting the Jacobian $r$ in polar coordinates.
- Orientation in Green and Stokes: the boundary is traversed anticlockwise (region on the left). For Stokes, orientation follows the right-hand rule with the chosen surface normal.
- Gauss requires a closed surface; for an open surface use direct integration or close it and subtract.

GATE PATTERN
- Typically 2 to 4 questions: NAT on a limit, extremum value, double integral, line integral or flux; MCQ on mean value theorem point $c$ or on vector identities.
- Shortcut: for flux through a closed surface, compute $\nabla \cdot F$ and multiply by volume when it is constant.
- For a conservative field, the line integral equals the potential difference between endpoints, independent of path.
- Check symmetry (odd integrand over symmetric limits) before integrating.
