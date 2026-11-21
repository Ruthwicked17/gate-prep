Engineering Mechanics

Engineering mechanics studies forces on bodies and the motion they cause: statics for equilibrium, dynamics for accelerating bodies.

KEY IDEAS
- Free-body diagram (FBD): isolate the body, draw every external force (weight, applied loads, contact normals, friction, support reactions) and couple. Internal forces never appear on the FBD of the whole body.
- Supports: a roller gives one reaction, a pin gives two, a fixed support gives two forces plus a moment.
- Planar equilibrium needs three equations: sum of forces in x and y, and sum of moments about any point, all zero.
- A two-force member carries force only along the line joining its two pins. Three non-parallel forces in equilibrium must be concurrent (three-force principle); Lami's theorem then relates their magnitudes.
- Dry friction: static friction adjusts up to $\mu_s N$; once sliding, kinetic friction is $\mu_k N$. The angle of friction satisfies $\tan\phi = \mu$, and a block on an incline is on the verge of sliding when the incline angle equals the friction angle.
- Belt and rope friction: tension ratio grows exponentially with wrap angle.
- Trusses: members are two-force members joined by pins. Method of joints solves forces at each pin; method of sections cuts through at most three unknown members and takes moments. A simple truss satisfies $m = 2j - 3$.
- Frames and machines contain multi-force members; split them into parts and use action-reaction at pins.
- Plane rigid body kinematics: every point shares the same angular velocity and angular acceleration. A point's velocity relative to another is $\omega$ times the distance, perpendicular to the line joining them. The instantaneous centre of rotation (ICR) has zero velocity at that instant.
- Dynamics: translation obeys $F = ma$ of the centre of mass; rotation obeys moment equals $I\alpha$. Energy and momentum methods avoid solving for accelerations.

FORMULAS
- Equilibrium: $\sum F_x = 0$, $\sum F_y = 0$, $\sum M = 0$
- Lami: $\dfrac{P}{\sin\alpha} = \dfrac{Q}{\sin\beta} = \dfrac{R}{\sin\gamma}$ (each force over the sine of the angle between the other two)
- Friction: $F \le \mu_s N$, $\tan\phi = \mu$
- Flat belt: $\dfrac{T_1}{T_2} = e^{\mu\theta}$, $\theta$ in radians; V-belt: $\dfrac{T_1}{T_2} = e^{\mu\theta/\sin\beta}$ with half groove angle $\beta$
- Belt power: $P = (T_1 - T_2)v$
- Relative velocity: $v_B = v_A + \omega \times r_{B/A}$; rolling without slip: $v = \omega r$, $a = \alpha r$
- Rotation: $\sum M_G = I_G\alpha$; parallel axis: $I = I_G + m d^2$
- Rod about end: $\tfrac{1}{3}mL^2$; about centre: $\tfrac{1}{12}mL^2$; disc: $\tfrac{1}{2}mr^2$; solid sphere: $\tfrac{2}{5}mr^2$
- Kinetic energy: $T = \tfrac{1}{2}mv_G^2 + \tfrac{1}{2}I_G\omega^2$

WORKED EXAMPLE
A rope wraps half a turn ($\theta = \pi$) around a fixed drum with $\mu = 0.3$. The slack side holds 100 N. What maximum tight-side tension can be resisted before slipping?
- $\mu\theta = 0.3\times3.1416 = 0.9425$.
- $e^{0.9425} \approx 2.566$.
- $T_1 = 100\times2.566 \approx 256.6$ N.
- Check: $\ln(256.6/100) = \ln2.566 = 0.9424$, which equals $\mu\theta$.

COMMON TRAPS
- Using degrees instead of radians in $e^{\mu\theta}$.
- Assuming friction always equals $\mu N$; it equals $\mu N$ only at impending or actual slip.
- Forgetting the moment reaction at a fixed support.
- Using $I_G\alpha$ about a point that is neither the centre of mass nor a fixed pivot.

GATE PATTERN
- NAT dominates: support reactions, truss member forces, friction limits, belt tensions, angular acceleration of pivoted rods. MCQ on identifying zero-force members and ICR location.
- Shortcut: at a joint with two non-collinear members and no load, both are zero-force members; with three members, two collinear and no load, the third is zero force.
- Shortcut: take moments about the point where most unknowns intersect to get one unknown directly.
- Shortcut: a uniform rod released horizontally about one end has initial $\alpha = \dfrac{3g}{2L}$.
