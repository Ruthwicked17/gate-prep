Modelling, Transfer Functions, Block Diagrams

KEY IDEAS
- Mathematical modelling means writing the differential equations of a physical system (electrical, mechanical, electromechanical) and converting them to the Laplace domain with zero initial conditions.
- Analogies help: in the force-voltage analogy, mass $M$ maps to inductance $L$, damping $B$ to resistance $R$, spring constant $K$ to $1/C$, and velocity to current.
- Feedback principle: the output is measured and compared with the reference. Negative feedback reduces sensitivity to plant parameter changes, rejects disturbances, and can widen bandwidth, at the cost of gain and a possible risk of instability.
- Transfer function: ratio of the Laplace transform of output to input, $G(s) = Y(s)/U(s)$, with all initial conditions zero. It is defined only for linear time-invariant systems.
- Poles are roots of the denominator, zeros are roots of the numerator. The order of the system equals the highest power of $s$ in the denominator.
- The impulse response is the inverse Laplace transform of $G(s)$.
- Block diagram reduction uses a few rules: blocks in series multiply, blocks in parallel add, and a feedback loop collapses to a closed-loop expression. Moving a takeoff or summing point past a block needs a compensating block.
- A signal flow graph (SFG) represents the same equations with nodes (signals) and branches (gains). Mason's gain formula gives the overall gain directly.

FORMULAS
- Series: $G_1 G_2$. Parallel: $G_1 \pm G_2$.
- Negative feedback closed loop: $T(s) = \dfrac{G(s)}{1 + G(s)H(s)}$. Positive feedback: $\dfrac{G}{1 - GH}$.
- Sensitivity of $T$ to $G$: $S_G^T = \dfrac{1}{1 + GH}$. Sensitivity of $T$ to $H$: $S_H^T = \dfrac{-GH}{1 + GH}$.
- Mason's gain formula: $T = \dfrac{\sum_k P_k \Delta_k}{\Delta}$, where $\Delta = 1 - \sum L_i + \sum L_i L_j - \sum L_i L_j L_k + \dots$ (products taken only over non-touching loops).
- $\Delta_k$ is $\Delta$ computed after removing all loops that touch forward path $k$.
- Series RLC with output across $C$: $\dfrac{V_C(s)}{V_i(s)} = \dfrac{1}{LCs^2 + RCs + 1}$.
- Mass-spring-damper with force input: $\dfrac{X(s)}{F(s)} = \dfrac{1}{Ms^2 + Bs + K}$.
- Armature-controlled DC motor (neglecting inductance): $\dfrac{\omega(s)}{V_a(s)} = \dfrac{K_t}{R_a(Js + B) + K_t K_b}$.

WORKED EXAMPLE
A signal flow graph has one forward path $P_1 = G_1 G_2 G_3$ and two loops: $L_1 = -G_2 H_1$ and $L_2 = -G_1 G_2 G_3 H_2$. Both loops touch each other and touch the forward path. Take $G_1 = 2$, $G_2 = 5$, $G_3 = 1$, $H_1 = 0.2$, $H_2 = 0.5$.
- No non-touching loop pairs, so $\Delta = 1 - (L_1 + L_2) = 1 + G_2 H_1 + G_1 G_2 G_3 H_2$.
- $\Delta_1 = 1$ because both loops touch $P_1$.
- $P_1 = 2 \times 5 \times 1 = 10$.
- $G_2 H_1 = 1$ and $G_1 G_2 G_3 H_2 = 5$, so $\Delta = 1 + 1 + 5 = 7$.
- $T = 10/7 \approx 1.429$.
- Check by block reduction: the inner loop gives $G_2/(1 + G_2 H_1) = 5/2 = 2.5$. The forward gain becomes $2 \times 2.5 \times 1 = 5$. The outer loop gives $5/(1 + 5 \times 0.5) = 5/3.5 = 1.429$. Both methods agree.

COMMON TRAPS
- Forgetting that loop gains in Mason's formula carry their own sign; a negative feedback loop has a negative loop gain.
- Including touching loops in the product terms of $\Delta$.
- Using non-zero initial conditions when finding a transfer function.
- Moving a summing point ahead of a block without adding the $1/G$ correction block.
- Mixing up the sensitivity formulas: feedback reduces sensitivity to $G$, but $T$ stays almost fully sensitive to $H$ when the loop gain is large.

GATE PATTERN
- NAT questions ask for the overall gain of a block diagram or SFG at a given frequency or with numeric gains.
- MCQs ask for a transfer function from a circuit or mechanical system, or which statement about feedback is true.
- MSQs may test properties of transfer functions (LTI only, zero initial conditions, poles and zeros).
- Shortcut: for an SFG, list all forward paths and loops first, then mark touching pairs; this avoids most errors.
- Shortcut: for a single-loop system, the closed-loop gain is forward gain divided by one minus the loop gain.
