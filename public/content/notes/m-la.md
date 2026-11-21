LINEAR ALGEBRA

KEY IDEAS
- Matrix algebra: $(AB)^T = B^T A^T$, $(AB)^{-1} = B^{-1} A^{-1}$. Matrix multiplication is not commutative in general.
- Special matrices: symmetric $A^T = A$, skew-symmetric $A^T = -A$, orthogonal $A^T A = I$, idempotent $A^2 = A$, nilpotent $A^k = 0$ for some $k$.
- Rank is the number of linearly independent rows (or columns), equal to the number of non-zero rows in row echelon form. It never exceeds $\min(m, n)$ for an $m \times n$ matrix.
- Determinant: $\det(AB) = \det A \det B$, $\det(A^T) = \det A$, $\det(kA) = k^n \det A$ for $n \times n$. A square matrix is invertible exactly when $\det A \neq 0$, i.e. rank is full.
- Row operations: swapping two rows flips the sign of the determinant; adding a multiple of one row to another leaves it unchanged.
- Systems $Ax = b$ with $n$ unknowns: compare rank of $A$ with rank of the augmented matrix $[A|b]$.
- Homogeneous system $Ax = 0$ always has the trivial solution; non-trivial solutions exist iff rank $< n$ (for square $A$, iff $\det A = 0$).
- Eigenvalue $\lambda$ and eigenvector $x \neq 0$ satisfy $Ax = \lambda x$; find $\lambda$ from the characteristic equation $\det(A - \lambda I) = 0$.
- Symmetric real matrices have real eigenvalues and orthogonal eigenvectors for distinct eigenvalues. Skew-symmetric real matrices have zero or purely imaginary eigenvalues. Orthogonal matrices have eigenvalues of modulus 1.
- Eigenvectors belonging to distinct eigenvalues are linearly independent.

FORMULAS
- Consistency: rank$(A)$ = rank$([A|b]) = n$ gives a unique solution; rank$(A)$ = rank$([A|b]) = r < n$ gives infinitely many solutions with $n - r$ free variables; rank$(A) <$ rank$([A|b])$ gives no solution.
- Rank-nullity: rank$(A)$ + nullity$(A) = n$ (number of columns).
- Sum of eigenvalues = trace of $A$; product of eigenvalues = $\det A$.
- For a $2 \times 2$ matrix: $\lambda^2 - (\text{tr} A)\lambda + \det A = 0$.
- If $\lambda$ is an eigenvalue of $A$: $A^k$ has $\lambda^k$, $A^{-1}$ has $1/\lambda$, $A + kI$ has $\lambda + k$, $kA$ has $k\lambda$; $A^T$ has the same eigenvalues.
- Triangular or diagonal matrix: eigenvalues are the diagonal entries.
- Cayley-Hamilton: every square matrix satisfies its own characteristic equation, useful for $A^{-1}$ and high powers.
- Inverse of $2 \times 2$: for $A = [[a, b], [c, d]]$, $A^{-1} = \frac{1}{ad - bc}[[d, -b], [-c, a]]$.

WORKED EXAMPLE
Find the eigenvalues and eigenvectors of $A = [[4, 1], [2, 3]]$.
- Trace $= 4 + 3 = 7$, determinant $= 4 \cdot 3 - 1 \cdot 2 = 10$.
- Characteristic equation: $\lambda^2 - 7\lambda + 10 = 0$, so $(\lambda - 2)(\lambda - 5) = 0$, giving $\lambda = 2, 5$.
- Check one: sum $2 + 5 = 7$ equals the trace, product $2 \cdot 5 = 10$ equals the determinant.
- For $\lambda = 5$: $(A - 5I)x = 0$ gives $-x_1 + x_2 = 0$, eigenvector $(1, 1)$. Check: $A(1,1) = (5, 5)$.
- For $\lambda = 2$: $2x_1 + x_2 = 0$, eigenvector $(1, -2)$. Check: $A(1,-2) = (2, -4) = 2(1, -2)$.
- Then $A^{-1}$ has eigenvalues $1/2$ and $1/5$, and $\det(A^{-1}) = 1/10$.

COMMON TRAPS
- Confusing "no solution" with "infinitely many": always compute the augmented rank.
- Forgetting the $k^n$ in $\det(kA)$.
- An eigenvector can never be the zero vector; any non-zero scalar multiple is also an eigenvector.
- A repeated eigenvalue does not guarantee two independent eigenvectors; count them using $n -$ rank$(A - \lambda I)$.
- Rank of a product: rank$(AB) \le \min($rank $A$, rank $B)$, not equal in general.

GATE PATTERN
- Typically 1 to 3 questions: NAT on determinant, rank or an eigenvalue; MCQ on consistency of a system with a parameter; MSQ on properties of special matrices.
- Shortcut: use trace and determinant to get eigenvalues of $2 \times 2$ matrices, or to check $3 \times 3$ answer options without full expansion.
- For a parameter-dependent system, set $\det A = 0$ first; those values are the only candidates for "no solution" or "infinite solutions".
- For powers like $A^{10}$, use eigenvalues or Cayley-Hamilton rather than repeated multiplication.
- A rank-1 matrix $uv^T$ has one eigenvalue $v^T u$ and the rest zero.
