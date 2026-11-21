State Space Models

KEY IDEAS
- A state space model describes a system by a set of first-order differential equations in state variables, the minimum set of variables that, with the input, fully determine future behaviour.
- Standard form: $\dot{x} = Ax + Bu$ and $y = Cx + Du$. $A$ is the system matrix ($n \times n$), $B$ the input matrix, $C$ the output matrix, $D$ the feedthrough matrix.
- Natural state variables: capacitor voltages and inductor currents in circuits; positions and velocities in mechanical systems.
- The state representation is not unique, but the transfer function and the eigenvalues of $A$ are the same for every valid representation.
- Eigenvalues of $A$ are the poles of the system (unless cancelled). The system is stable if all eigenvalues have negative real parts.
- Phase-variable (controllable canonical) form: for $\dfrac{Y}{U} = \dfrac{1}{s^n + a_{n-1}s^{n-1} + \dots + a_0}$, $A$ is a companion matrix with ones on the superdiagonal and the last row $-a_0, -a_1, \dots, -a_{n-1}$.
- The state transition matrix $\phi(t) = e^{At}$ propagates the state forward in time.
- Controllability and observability: checked by the rank of the Kalman matrices.

FORMULAS
- Transfer function: $G(s) = C(sI - A)^{-1}B + D$.
- Characteristic equation: $|sI - A| = 0$.
- State transition matrix: $\phi(t) = e^{At} = \mathcal{L}^{-1}\left[(sI - A)^{-1}\right]$.
- Properties: $\phi(0) = I$, $\phi^{-1}(t) = \phi(-t)$, $\phi(t_1 + t_2) = \phi(t_1)\phi(t_2)$.
- Full solution: $x(t) = \phi(t)x(0) + \int_0^t \phi(t - \tau)Bu(\tau)\,d\tau$. The first term is the zero-input response, the second the zero-state response.
- Controllability matrix $Q_c = [B \;\; AB \;\; \dots \;\; A^{n-1}B]$ must have rank $n$.
- Observability matrix $Q_o = [C^T \;\; A^TC^T \;\; \dots \;\; (A^T)^{n-1}C^T]$ must have rank $n$.
- For a 2 by 2 inverse: $\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \dfrac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$.

WORKED EXAMPLE
$A = \begin{bmatrix} 0 & 1 \\ -2 & -3 \end{bmatrix}$, $B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$, $C = [1 \;\; 0]$, $D = 0$. Find the transfer function, $\phi(t)$, and $x(1)$ for $x(0) = [1 \;\; 0]^T$ with $u = 0$.
- $|sI - A| = s(s+3) + 2 = s^2 + 3s + 2 = (s+1)(s+2)$. Eigenvalues are -1 and -2, so the system is stable.
- $(sI - A)^{-1} = \dfrac{1}{(s+1)(s+2)}\begin{bmatrix} s+3 & 1 \\ -2 & s \end{bmatrix}$.
- $G(s) = C(sI-A)^{-1}B = \dfrac{1}{s^2 + 3s + 2}$.
- Partial fractions give $\phi_{11} = 2e^{-t} - e^{-2t}$, $\phi_{12} = e^{-t} - e^{-2t}$, $\phi_{21} = -2e^{-t} + 2e^{-2t}$, $\phi_{22} = -e^{-t} + 2e^{-2t}$.
- With $x(0) = [1, 0]^T$: $x_1(1) = 2e^{-1} - e^{-2} = 0.7358 - 0.1353 = 0.6004$ and $x_2(1) = -2e^{-1} + 2e^{-2} = -0.4651$.
- Check: $\phi(0) = I$ holds, and a direct numerical integration of $\dot{x} = Ax$ gives the same values 0.6004 and -0.4651.
- Controllability: $[B \;\; AB] = \begin{bmatrix} 0 & 1 \\ 1 & -3 \end{bmatrix}$, determinant $-1 \neq 0$, so the system is controllable.

COMMON TRAPS
- Forgetting $D$ in $C(sI - A)^{-1}B + D$.
- Writing $(sI - A)$ as $(A - sI)$ and getting sign errors.
- Assuming the transfer function always shows all eigenvalues; pole-zero cancellation hides uncontrollable or unobservable modes.
- Using matrix exponent rules like scalars; $e^{(A+B)t} = e^{At}e^{Bt}$ only if $AB = BA$.

GATE PATTERN
- NAT: an element of $\phi(t)$ at a given time, a state value, or a transfer function coefficient.
- MCQ: transfer function from given matrices; identify the correct $A$ for a differential equation.
- MSQ: properties of the state transition matrix; controllability or observability for given matrices.
- Shortcut: for a companion matrix, read the characteristic polynomial from the last row with signs flipped.
- Shortcut: check any candidate $\phi(t)$ by setting $t = 0$; it must give $I$.
