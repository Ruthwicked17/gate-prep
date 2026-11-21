PROBABILITY AND STATISTICS

KEY IDEAS
- Axioms: $P(A) \ge 0$, $P(S) = 1$, $P(A \cup B) = P(A) + P(B)$ for mutually exclusive events; in general $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
- Conditional probability $P(A|B) = \frac{P(A \cap B)}{P(B)}$. Events are independent iff $P(A \cap B) = P(A)P(B)$. Mutually exclusive events with non-zero probability are never independent.
- Total probability and Bayes' theorem handle "which source caused this outcome" questions.
- A random variable maps outcomes to numbers. Discrete uses a PMF; continuous uses a PDF $f(x)$ with $\int f(x)\,dx = 1$.
- CDF $F(x) = P(X \le x)$ is non-decreasing from 0 to 1; for continuous $X$, $f(x) = F'(x)$ and $P(a < X \le b) = F(b) - F(a)$.
- Mean (expectation) measures centre; variance measures spread; standard deviation is the square root of variance.
- Median splits the probability (or sorted data) in half; mode is the most likely (or most frequent) value.
- Correlation coefficient $r$ lies in $[-1, 1]$ and measures linear association only.
- Hypothesis testing (RA): set a null hypothesis $H_0$ and alternative $H_1$, compute a test statistic, compare with a critical value at significance level $\alpha$. Type I error rejects a true $H_0$ (probability $\alpha$); Type II error accepts a false $H_0$.

FORMULAS
- Bayes: $P(A_i|B) = \frac{P(B|A_i)P(A_i)}{\sum_j P(B|A_j)P(A_j)}$.
- $E[X] = \sum x\,p(x)$ or $\int x f(x)\,dx$; $\text{Var}(X) = E[X^2] - (E[X])^2$.
- $E[aX + b] = aE[X] + b$; $\text{Var}(aX + b) = a^2 \text{Var}(X)$.
- Binomial: $P(X = k) = \binom{n}{k}p^k(1 - p)^{n-k}$, mean $np$, variance $np(1 - p)$.
- Poisson: $P(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}$, mean $=$ variance $= \lambda$; approximates binomial with $\lambda = np$ when $n$ is large and $p$ small.
- Normal: $f(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-(x - \mu)^2 / (2\sigma^2)}$; standardise with $Z = \frac{X - \mu}{\sigma}$. About 68%, 95%, 99.7% lie within 1, 2, 3 standard deviations.
- Uniform on $[a, b]$: mean $\frac{a + b}{2}$, variance $\frac{(b - a)^2}{12}$. Exponential with rate $\lambda$: mean $1/\lambda$, variance $1/\lambda^2$.
- Correlation: $r = \frac{\text{Cov}(X, Y)}{\sigma_X \sigma_Y}$, with $\text{Cov}(X, Y) = E[XY] - E[X]E[Y]$.
- Regression line of $y$ on $x$: $y - \bar{y} = b_{yx}(x - \bar{x})$, $b_{yx} = r\frac{\sigma_y}{\sigma_x}$; and $r^2 = b_{yx} b_{xy}$.
- Z-test for a mean with known $\sigma$: $Z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}$; use $t$ with $n - 1$ degrees of freedom when $\sigma$ is estimated from a small sample.

WORKED EXAMPLE
Faults on a line follow a Poisson distribution with mean 2 per day. Find the probability of at most one fault in a day.
- $P(X \le 1) = P(0) + P(1) = e^{-2}\left(\frac{2^0}{0!} + \frac{2^1}{1!}\right) = 3e^{-2}$.
- $e^{-2} \approx 0.13534$, so $P \approx 3 \times 0.13534 = 0.4060$.
- Probability of at least two faults $= 1 - 0.4060 = 0.5940$.

COMMON TRAPS
- Confusing independent with mutually exclusive.
- Adding standard deviations instead of variances for sums of independent variables.
- Forgetting that for a continuous variable $P(X = a) = 0$, so $<$ and $\le$ give the same probability.
- Mixing up $P(A|B)$ and $P(B|A)$ in Bayes problems; draw a tree.
- The regression coefficients $b_{yx}$ and $b_{xy}$ must share the sign of $r$.

GATE PATTERN
- Typically 2 to 4 questions: NAT on a conditional or Bayes probability, a distribution probability, or a mean/variance from a given PDF; MCQ on distribution properties; MSQ on statements about independence or correlation.
- Shortcut: "at least one" problems are fastest as $1 - P(\text{none})$.
- For a PDF with an unknown constant, first impose total area $= 1$.
- Recognise symmetry: for a symmetric distribution, mean = median (and mode if unimodal).
