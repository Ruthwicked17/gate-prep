Electrostatics

Electrostatics studies charges at rest and the fields they create. Three linked quantities appear everywhere: the electric field intensity $\vec{E}$ (V/m), the electric flux density $\vec{D}$ (C/m^2), and the potential $V$ (volts). In a linear medium they are tied by $\vec{D} = \varepsilon \vec{E}$ with $\varepsilon = \varepsilon_0 \varepsilon_r$.

KEY IDEAS
- Coulomb's law: the force between two point charges acts along the line joining them, is proportional to the product of charges, and falls off as the inverse square of distance.
- Field intensity is force per unit positive test charge. Fields of several charges add as vectors (superposition).
- Gauss's law: the total flux leaving any closed surface equals the free charge enclosed. It is the fastest route to the field whenever symmetry exists (point, sphere, infinite line, infinite plane, coaxial cylinder).
- The electrostatic field is conservative: $\nabla \times \vec{E} = 0$, so $\vec{E} = -\nabla V$ and the work done around any closed path is zero.
- Potential is a scalar, so it adds algebraically. It is defined relative to a reference (infinity for finite charge distributions; a chosen radius for an infinite line, because the potential of a line diverges at infinity).
- Inside a conductor in equilibrium, $\vec{E} = 0$, charge sits on the surface, and the conductor is an equipotential.
- Dielectrics polarise: bound dipoles reduce the field for a given free charge. $\vec{D} = \varepsilon_0 \vec{E} + \vec{P}$.
- Boundary conditions: tangential $\vec{E}$ is continuous; normal $\vec{D}$ is continuous if there is no free surface charge (otherwise it jumps by $\rho_s$).
- Capacitance $C = Q/V$ depends only on geometry and permittivity, not on the charge.

FORMULAS
- Coulomb: $F = \dfrac{Q_1 Q_2}{4\pi\varepsilon r^2}$, with $\dfrac{1}{4\pi\varepsilon_0} \approx 9\times10^9$ N m^2/C^2
- Point charge: $E = \dfrac{Q}{4\pi\varepsilon r^2}$, $V = \dfrac{Q}{4\pi\varepsilon r}$
- Gauss: $\oint \vec{D}\cdot d\vec{S} = Q_{enc}$, point form $\nabla\cdot\vec{D} = \rho_v$
- Infinite line charge: $E = \dfrac{\rho_L}{2\pi\varepsilon r}$, $V_{ab} = \dfrac{\rho_L}{2\pi\varepsilon}\ln\dfrac{r_b}{r_a}$
- Infinite plane sheet: $E = \dfrac{\rho_s}{2\varepsilon}$, independent of distance
- Charged sphere (radius $a$, total $Q$): outside $E = \dfrac{Q}{4\pi\varepsilon r^2}$; inside a conducting sphere $E = 0$; inside a uniformly charged solid sphere $E = \dfrac{Q r}{4\pi\varepsilon a^3}$
- Potential of a sphere: outside $V = \dfrac{Q}{4\pi\varepsilon r}$; on and inside a conducting sphere $V = \dfrac{Q}{4\pi\varepsilon a}$ (constant). Infinite sheet: $V$ falls linearly with distance, $V(x) = V_0 - \dfrac{\rho_s |x|}{2\varepsilon}$
- Parallel plate: $C = \dfrac{\varepsilon A}{d}$
- Coaxial: $C = \dfrac{2\pi\varepsilon L}{\ln(b/a)}$
- Isolated sphere: $C = 4\pi\varepsilon a$; concentric spheres: $C = \dfrac{4\pi\varepsilon a b}{b - a}$
- Energy: $W = \tfrac{1}{2}CV^2$, energy density $w = \tfrac{1}{2}\varepsilon E^2$

WORKED EXAMPLE
A parallel plate capacitor has plate area 0.01 m^2, gap 1 mm, and is filled with a dielectric of $\varepsilon_r = 5$. Find $C$.
- $C = \dfrac{\varepsilon_0 \varepsilon_r A}{d} = \dfrac{8.854\times10^{-12}\times 5 \times 0.01}{10^{-3}}$
- Numerator: $8.854\times10^{-12}\times0.05 = 4.427\times10^{-13}$
- Divide by $10^{-3}$: $C = 4.427\times10^{-10}$ F, about 442.7 pF.
- Check: without the dielectric $C_0 = 88.54$ pF, and $5 \times 88.54 = 442.7$ pF. Both routes agree.

COMMON TRAPS
- Using $\rho_s/\varepsilon$ for a single sheet. That is the field between two oppositely charged sheets (or just outside a conductor); a lone sheet gives $\rho_s/(2\varepsilon)$.
- Forgetting that potential is scalar while field is vector. Two equal and opposite charges give zero potential at the midpoint but non-zero field.
- Taking infinity as reference for an infinite line charge.
- Dielectrics in series (layers parallel to plates) versus in parallel (side by side): layered slabs act as capacitors in series.
- Mixing $\varepsilon_0$ and $\varepsilon$ when a dielectric is present.

GATE PATTERN
- Mostly NAT on capacitance, field or potential at a point, and MCQ on Gauss's law reasoning or boundary conditions. MSQ may test statements about conductors and conservative fields.
- Shortcut: for a capacitor with a dielectric slab of thickness $t$ ($t < d$) covering the full plate area, use $C = \dfrac{\varepsilon_0 A}{d - t + t/\varepsilon_r}$.
- Shortcut: with a battery connected, $V$ is fixed; with the battery removed, $Q$ is fixed. Decide this first before computing energy changes.
