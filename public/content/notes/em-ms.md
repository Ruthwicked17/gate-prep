Magnetostatics and Magnetic Circuits

Magnetostatics covers fields produced by steady currents. The main quantities are magnetic field intensity $\vec{H}$ (A/m), flux density $\vec{B}$ (tesla), and flux $\phi$ (weber), linked by $\vec{B} = \mu \vec{H}$ with $\mu = \mu_0 \mu_r$ and $\mu_0 = 4\pi\times10^{-7}$ H/m.

KEY IDEAS
- Biot-Savart law gives the field of any current element; integrate it for arbitrary shapes (finite wire, loop axis).
- Ampere's circuital law: the line integral of $\vec{H}$ around a closed path equals the current enclosed. Use it when symmetry exists (long wire, solenoid, toroid, coax).
- Magnetic field lines are closed: $\nabla\cdot\vec{B} = 0$, so there are no magnetic monopoles.
- Faraday's law: a changing flux linkage induces an emf. Lenz's law gives the minus sign: the induced current opposes the change. Emf can come from a time-varying field (transformer emf) or a moving conductor (motional emf).
- Lorentz force: a moving charge feels $q(\vec{E} + \vec{v}\times\vec{B})$. The magnetic part does no work since it is perpendicular to velocity. A current-carrying conductor in a field feels $I\vec{L}\times\vec{B}$.
- Magnetic circuits are analysed like resistive circuits: MMF acts like voltage, flux like current, reluctance like resistance. Series reluctances add; parallel paths combine like parallel resistors.
- An air gap usually dominates the total reluctance because $\mu_r$ of iron is in the thousands.
- Self inductance is flux linkage per unit current in the same coil; mutual inductance is flux linkage in one coil per unit current in another.

FORMULAS
- Biot-Savart: $d\vec{H} = \dfrac{I\, d\vec{l}\times\hat{a}_R}{4\pi R^2}$
- Infinite straight wire: $H = \dfrac{I}{2\pi r}$
- Finite wire: $H = \dfrac{I}{4\pi r}(\sin\alpha_2 - \sin\alpha_1)$ (angles measured from the perpendicular)
- Centre of circular loop of radius $a$: $H = \dfrac{I}{2a}$; on the axis: $H = \dfrac{I a^2}{2(a^2 + z^2)^{3/2}}$
- Long solenoid: $H = nI$ ($n$ turns per metre); toroid: $H = \dfrac{NI}{2\pi r}$
- Ampere: $\oint \vec{H}\cdot d\vec{l} = I_{enc}$
- Faraday: $e = -\dfrac{d\lambda}{dt} = -N\dfrac{d\phi}{dt}$; motional emf $e = Blv$
- Force on wire: $F = BIL\sin\theta$; force per metre between parallel wires: $\dfrac{\mu_0 I_1 I_2}{2\pi d}$ (attractive for same direction)
- MMF $= NI$, reluctance $\mathcal{R} = \dfrac{l}{\mu_0\mu_r A}$, flux $\phi = \dfrac{NI}{\mathcal{R}}$
- $L = \dfrac{N\phi}{I} = \dfrac{N^2}{\mathcal{R}}$, $M = k\sqrt{L_1 L_2}$, $0 \le k \le 1$
- Series coupled coils: $L_{eq} = L_1 + L_2 \pm 2M$
- Stored energy: $W = \tfrac{1}{2}LI^2$, energy density $\tfrac{1}{2}BH$

WORKED EXAMPLE
An iron ring has mean length 0.5 m, cross-section $4\times10^{-4}$ m^2, $\mu_r = 1000$, and a 500-turn coil carrying 2 A. Find flux and inductance.
- MMF $= 500\times2 = 1000$ A-turns.
- $\mathcal{R} = \dfrac{0.5}{4\pi\times10^{-7}\times1000\times4\times10^{-4}} = \dfrac{0.5}{5.027\times10^{-7}} \approx 9.947\times10^{5}$ A/Wb.
- $\phi = 1000/(9.947\times10^5) \approx 1.005\times10^{-3}$ Wb.
- $L = N^2/\mathcal{R} = 250000/(9.947\times10^5) \approx 0.251$ H.
- Check: $L = N\phi/I = 500\times1.005\times10^{-3}/2 = 0.251$ H. Both routes agree.

COMMON TRAPS
- Forgetting that $L$ scales with $N^2$, not $N$.
- Ignoring the air gap reluctance or computing it with $\mu_r$ of iron instead of 1.
- Sign of $2M$ in series coils: aiding (dot to non-dot) adds, opposing subtracts.
- Using $\sin$ versus $\cos$ wrongly in the finite-wire formula; sketch the angles.
- Treating the Lorentz magnetic force as able to change the speed of a charge.

GATE PATTERN
- NAT on flux, reluctance, inductance, force between conductors, and field at a point. MCQ on Faraday/Lenz direction and on coupled coil equivalents. MSQ may test Maxwell-equation statements.
- Shortcut: if an air gap of length $g$ is present with long iron, $\phi \approx \dfrac{\mu_0 N I A}{g}$ when iron reluctance is negligible.
- Shortcut: from two series measurements, $M = \dfrac{L_{aid} - L_{opp}}{4}$.
