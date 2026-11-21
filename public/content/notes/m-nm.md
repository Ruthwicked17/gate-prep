NUMERICAL METHODS

KEY IDEAS
- Numerical methods give approximate answers by iteration or discretisation when exact solutions are hard or impossible.
- Root finding solves $f(x) = 0$ for algebraic or transcendental equations (involving $e^x$, $\sin x$, $\log x$).
- Bisection: if $f(a)f(b) < 0$, a root lies in $[a, b]$; halve the interval each step. Always converges, but slowly (linear order).
- Regula falsi (false position): like bisection but uses the chord's x-intercept; always brackets the root.
- Secant method: uses the two latest points without bracketing; order about 1.618.
- Newton-Raphson: uses the tangent; quadratic convergence near a simple root, but can fail if $f'(x)$ is close to zero or the guess is poor.
- Numerical integration replaces the curve by straight lines (trapezoidal) or parabolas (Simpson) over equal strips of width $h$.
- Finite differences: forward $\Delta f_i = f_{i+1} - f_i$, backward $\nabla f_i = f_i - f_{i-1}$, central differences use points on both sides and are more accurate.
- ODE solvers: single-step methods (Euler, modified Euler, Runge-Kutta) use only the current point; multi-step methods (such as Adams-Bashforth) use several previous points.

FORMULAS
- Newton-Raphson: $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$. For $\sqrt{N}$: $x_{n+1} = \frac{1}{2}\left(x_n + \frac{N}{x_n}\right)$.
- Secant: $x_{n+1} = x_n - f(x_n)\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$.
- Bisection steps for tolerance $\epsilon$ on interval length $L$: smallest $n$ with $L / 2^n \le \epsilon$.
- Trapezoidal: $\int_a^b f\,dx \approx \frac{h}{2}[y_0 + 2(y_1 + \dots + y_{n-1}) + y_n]$; exact for linear functions; global error of order $h^2$.
- Simpson 1/3: $\frac{h}{3}[y_0 + 4(y_1 + y_3 + \dots) + 2(y_2 + y_4 + \dots) + y_n]$, $n$ even; exact up to cubics; global error of order $h^4$.
- Simpson 3/8: $\frac{3h}{8}[y_0 + 3y_1 + 3y_2 + 2y_3 + 3y_4 + \dots + y_n]$, $n$ a multiple of 3.
- Derivatives: forward $f'(x) \approx \frac{f(x + h) - f(x)}{h}$ (error order $h$); central $f'(x) \approx \frac{f(x + h) - f(x - h)}{2h}$ (order $h^2$); $f''(x) \approx \frac{f(x + h) - 2f(x) + f(x - h)}{h^2}$.
- Euler for $y' = f(x, y)$: $y_{n+1} = y_n + h f(x_n, y_n)$ (first order).
- Modified Euler (Heun): $y_{n+1} = y_n + \frac{h}{2}[f(x_n, y_n) + f(x_{n+1}, y_n + h f(x_n, y_n))]$ (second order).
- RK4: $k_1 = hf(x_n, y_n)$, $k_2 = hf(x_n + h/2, y_n + k_1/2)$, $k_3 = hf(x_n + h/2, y_n + k_2/2)$, $k_4 = hf(x_n + h, y_n + k_3)$, $y_{n+1} = y_n + \frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)$.

WORKED EXAMPLE
Estimate $\int_0^1 \frac{dx}{1 + x}$ with $h = 0.5$ and compare with the exact value $\ln 2$.
- Points: $y_0 = f(0) = 1$, $y_1 = f(0.5) = 0.6667$, $y_2 = f(1) = 0.5$.
- Trapezoidal: $\frac{0.5}{2}[1 + 2(0.6667) + 0.5] = 0.25 \times 2.8333 = 0.7083$.
- Simpson 1/3: $\frac{0.5}{3}[1 + 4(0.6667) + 0.5] = 0.16667 \times 4.1667 = 0.6944$.
- Exact $\ln 2 = 0.6931$. Errors: trapezoidal about 0.0152, Simpson about 0.0013, so Simpson is far more accurate for the same points.

Newton-Raphson: solve $f(x) = x^3 - x - 2 = 0$ from $x_0 = 2$ using $x_{n+1} = x_n - f(x_n)/f'(x_n)$, with $f'(x) = 3x^2 - 1$.
- $x_1 = 2 - 4/11 = 1.636364$
- $x_2 = 1.530392$, $x_3 = 1.521441$, $x_4 = 1.521380$ (root about 1.52138; the error shrinks roughly quadratically)

COMMON TRAPS
- Using Simpson 1/3 with an odd number of strips; it needs an even number of intervals.
- Counting points instead of intervals: $n$ intervals means $n + 1$ ordinates.
- Applying Newton-Raphson without checking $f'(x_n) \neq 0$.
- Mixing the order of local and global truncation error; quote the global order unless asked otherwise.
- Rounding too early in iterative methods; carry at least four decimals.

GATE PATTERN
- Mainly in RA: NAT on one or two Newton-Raphson iterations, a trapezoidal or Simpson estimate from a table, or one Euler/RK step; MCQ on order of convergence or error.
- Shortcut: Simpson 1/3 is exact for polynomials up to degree 3, so for a cubic integrand just integrate exactly.
- Trapezoidal overestimates the integral of a convex function (curve bending upward) and underestimates for a concave one.
- For Newton-Raphson iterations, set up the iteration formula symbolically first, then evaluate.
