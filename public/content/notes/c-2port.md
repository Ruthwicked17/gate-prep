Two-port, Three-phase, Complex Power

KEY IDEAS
- A two-port network is described by four variables $V_1, I_1, V_2, I_2$. Each parameter set expresses two of them in terms of the other two. Currents are taken as entering each port.
- Z (open-circuit) parameters: $V_1 = z_{11}I_1 + z_{12}I_2$ and $V_2 = z_{21}I_1 + z_{22}I_2$. Find each one by setting the other port's current to zero.
- Y (short-circuit) parameters: $I = YV$. Find each one by shorting the other port.
- h (hybrid) parameters: $V_1 = h_{11}I_1 + h_{12}V_2$ and $I_2 = h_{21}I_1 + h_{22}V_2$. They are used for transistor models.
- ABCD (transmission) parameters: $V_1 = AV_2 - BI_2$ and $I_1 = CV_2 - DI_2$. They are used for transmission lines and cascaded networks.
- Interconnections:
  - Series: Z matrices add.
  - Parallel: Y matrices add.
  - Cascade: ABCD matrices multiply, in order.
  - Series-parallel: h matrices add.
- Balanced three-phase supply: three equal-magnitude voltages displaced by $120^\circ$. In a positive-sequence star system, each line voltage leads its phase voltage by $30^\circ$.
- A balanced delta load can be converted to an equivalent star load for per-phase analysis.
- Complex power: $S = VI^{*} = P + jQ$. P is real power in W, Q is reactive power in var, and $|S|$ is apparent power in VA. Power factor is $\cos\phi = P/|S|$. Lagging power factor means inductive Q is positive.

FORMULAS
- Reciprocity: $z_{12} = z_{21}$, $y_{12} = y_{21}$, $h_{12} = -h_{21}$, $AD - BC = 1$
- Symmetry: $z_{11} = z_{22}$, $y_{11} = y_{22}$, $A = D$, $h_{11}h_{22} - h_{12}h_{21} = 1$
- Z to ABCD: $A = \frac{z_{11}}{z_{21}}$, $B = \frac{\Delta z}{z_{21}}$, $C = \frac{1}{z_{21}}$, $D = \frac{z_{22}}{z_{21}}$
- Y matrix is the inverse of the Z matrix: $Y = Z^{-1}$
- Star connection: $V_L = \sqrt{3}V_{ph}$ and $I_L = I_{ph}$. Delta connection: $V_L = V_{ph}$ and $I_L = \sqrt{3}I_{ph}$.
- Three-phase power: $P = \sqrt{3}V_LI_L\cos\phi$, $Q = \sqrt{3}V_LI_L\sin\phi$
- Balanced star-delta conversion: $Z_Y = \frac{Z_\Delta}{3}$
- General delta to star: $R_a = \frac{R_{ab}R_{ca}}{R_{ab}+R_{bc}+R_{ca}}$
- Power factor correction: $Q_C = P(\tan\phi_1 - \tan\phi_2)$
- Per-phase capacitance for a star bank: $C = \frac{Q_C/3}{\omega V_{ph}^2}$

WORKED EXAMPLE
A balanced star load of $6 + j8\,\Omega$ per phase is fed from a 400 V (line), 3-phase supply. Find P, Q and S.
- $V_{ph} = \frac{400}{\sqrt{3}} = 230.94$ V
- $|Z| = 10\,\Omega$, so $I = 23.094$ A
- Power factor: $\cos\phi = \frac{6}{10} = 0.6$ lagging
- $P = 3I^2R = 3 \times 533.33 \times 6 = 9600$ W
- $Q = 3I^2X = 12800$ var
- $S = 16000$ VA
- Check: $\sqrt{3} \times 400 \times 23.094 \times 0.6 = 9600$ W

COMMON TRAPS
- Using $z_{12} = z_{21}$ to test h-parameter reciprocity. The h condition is $h_{12} = -h_{21}$.
- The sign of $I_2$ in ABCD. The current $-I_2$ flows out of port 2.
- Multiplying cascaded ABCD matrices in the wrong order.
- Mixing line and phase quantities. Do the calculation per phase, then convert.
- Writing $S = VI$ without the conjugate, which gives the wrong sign for Q.

GATE PATTERN
- NAT: find a two-port parameter of a T or Pi network, a three-phase power or line current, or the capacitor kvar needed to correct power factor.
- MSQ: reciprocity and symmetry checks, or which parameter set adds for a given interconnection.
- Shortcut: in a T network, $z_{12}$ is simply the shunt arm impedance.
- Shortcut: for a power factor question, draw the power triangle and work with tangents.
