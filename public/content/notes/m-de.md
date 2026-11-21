DIFFERENTIAL EQUATIONS

KEY IDEAS
- Order is the highest derivative present; degree is the power of that derivative once the equation is free of radicals and fractions in derivatives.
- Variable separable: write as $g(y)\,dy = f(x)\,dx$ and integrate both sides.
- Linear first-order: $\frac{dy}{dx} + P(x)y = Q(x)$, solved with an integrating factor.
- Exact equation $M\,dx + N\,dy = 0$ is exact iff $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$.
- Bernoulli: $y' + Py = Qy^n$ becomes linear with $v = y^{1-n}$. Homogeneous $y' = f(y/x)$ is solved with $y = vx$.
- Higher-order linear ODE with constant coefficients: general solution $y = y_c + y_p$ (complementary function plus particular integral).
- Initial value problems fix constants using $y$ and its derivatives at one point; boundary value problems use conditions at two points and may have no solution or infinitely many.
- PDE classification of $A u_{xx} + B u_{xy} + C u_{yy} + \dots = 0$: $B^2 - 4AC < 0$ elliptic (Laplace), $= 0$ parabolic (heat), $> 0$ hyperbolic (wave).
- Separation of variables: assume $u(x, t) = X(x)T(t)$, split into two ODEs linked by a separation constant, then apply boundary conditions to get eigenvalues.

FORMULAS
- Integrating factor: IF $= e^{\int P\,dx}$, solution $y \cdot \text{IF} = \int Q \cdot \text{IF}\,dx + C$.
- Auxiliary equation roots for $ay'' + by' + cy = 0$: real distinct $m_1, m_2$ give $C_1 e^{m_1 x} + C_2 e^{m_2 x}$; repeated $m$ gives $(C_1 + C_2 x)e^{mx}$; complex $\alpha \pm i\beta$ gives $e^{\alpha x}(C_1 \cos \beta x + C_2 \sin \beta x)$.
- Particular integral for $e^{ax}$: $\frac{e^{ax}}{f(a)}$ if $f(a) \neq 0$; if $a$ is a root of multiplicity $k$, use $\frac{x^k e^{ax}}{f^{(k)}(a)}$.
- Variation of parameters for $y'' + p y' + q y = r(x)$ with $y_1, y_2$ and Wronskian $W = y_1 y_2' - y_2 y_1'$: $y_p = -y_1 \int \frac{y_2 r}{W}dx + y_2 \int \frac{y_1 r}{W}dx$.
- Cauchy-Euler $x^2 y'' + a x y' + b y = 0$: substitute $x = e^z$ (or try $y = x^m$), giving $m(m-1) + am + b = 0$.
- Heat equation $u_t = c^2 u_{xx}$; wave equation $u_{tt} = c^2 u_{xx}$; Laplace $u_{xx} + u_{yy} = 0$.
- Heat equation on $0 < x < L$ with $u = 0$ at both ends: $u = \sum b_n \sin\frac{n\pi x}{L} e^{-c^2 n^2 \pi^2 t / L^2}$.

WORKED EXAMPLE
Solve $y'' - 3y' + 2y = 0$ with $y(0) = 0$, $y'(0) = 1$, and find $y(1)$.
- Auxiliary equation $m^2 - 3m + 2 = 0$ gives $m = 1, 2$, so $y = C_1 e^{x} + C_2 e^{2x}$.
- $y(0) = C_1 + C_2 = 0$; $y'(0) = C_1 + 2C_2 = 1$. Subtracting: $C_2 = 1$, $C_1 = -1$.
- $y = e^{2x} - e^{x}$. Check: $y'' - 3y' + 2y = (4 - 6 + 2)e^{2x} + (-1 + 3 - 2)e^{x} = 0$.
- $y(1) = e^2 - e \approx 7.389 - 2.718 = 4.671$.

COMMON TRAPS
- Forgetting the $x^k$ factor when the forcing term matches a root of the auxiliary equation (resonance case).
- Writing the integrating factor with the wrong sign of $P$; first put the equation in standard form with coefficient 1 on $y'$.
- In Cauchy-Euler, using $m^2 + am + b$ instead of $m(m-1) + am + b$.
- Applying initial conditions to $y_c$ alone instead of the full solution $y_c + y_p$.
- Choosing the wrong sign of the separation constant; the boundary conditions decide which sign gives non-trivial solutions.

GATE PATTERN
- Typically 2 to 3 questions: NAT asking for $y$ at a point after solving an IVP; MCQ on the form of the general solution or particular integral; occasional PDE classification or separation of variables.
- Shortcut: check answer options by substituting into the ODE and initial conditions instead of solving fully.
- Use the root type of the auxiliary equation to eliminate options instantly (oscillatory vs exponential).
- For damping questions, the sign of the real part of the roots tells whether the solution decays.
