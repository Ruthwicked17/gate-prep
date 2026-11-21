Robot Applications and Accuracy

KEY IDEAS
- Point-to-point (PTP) control: the robot moves between taught points and only the end positions matter, not the path between them. Typical uses: spot welding, pick and place, machine loading and unloading, palletising.
- Continuous path (CP) control: the robot follows a defined path with controlled velocity, often by interpolating many closely spaced points (linear or circular interpolation). Typical uses: arc welding, spray painting, gluing and sealing, deburring.
- Controlled path is CP where the controller computes the straight line or circle between taught points so the tool tracks it precisely.
- Teaching methods: lead-through (powered via a teach pendant, or manual by moving the arm), and offline programming with a robot language or simulation.
- End-effectors: grippers hold the part (mechanical fingers, vacuum cups, magnetic, adhesive); tools do the work (welding gun, spray gun, spindle, screwdriver). A tool changer lets one robot use several end-effectors. Dual grippers cut cycle time in machine loading.
- Control resolution: the smallest increment the controller can command on an axis, set by the bit storage capacity or encoder.
- Spatial resolution: the smallest move the robot can actually make, combining control resolution with mechanical errors (backlash, deflection, gear errors).
- Accuracy: how close the robot gets to a commanded target point in space.
- Repeatability: how close the robot returns to a previously taught point over repeated attempts. Repeatability is usually much better than accuracy, which is why taught programs work well.

FORMULAS
- Control resolution with $B$ bits over axis range $L$: $CR = \frac{L}{2^B - 1}$ (number of intervals between $2^B$ addressable points).
- With mechanical errors normally distributed with standard deviation $\sigma$: spatial resolution $SR = CR + 6\sigma$.
- Accuracy $= \frac{SR}{2} = \frac{CR}{2} + 3\sigma$.
- Repeatability $= \pm 3\sigma$.
- For a rotary joint, angular resolution $= \frac{360^\circ}{2^B - 1}$ and the linear resolution at radius $r$ is about $r \, \Delta\theta$ in radians.
- Friction gripper holding weight $W$ with $n_f$ contact surfaces, friction coefficient $\mu$ and gripping force $F_g$: $\mu \, n_f \, F_g = W$ (multiply $W$ by $1 + a/g$ when the part is accelerated upward at $a$, against gravity).

WORKED EXAMPLE
- A linear robot axis has range 1.0 m and a 12-bit controller. Mechanical errors have $\sigma = 0.05$ mm. Find control resolution, spatial resolution, accuracy and repeatability.
- $CR = 1000 / (2^{12} - 1) = 1000 / 4095 = 0.2442$ mm.
- $SR = 0.2442 + 6 \times 0.05 = 0.5442$ mm.
- Accuracy $= 0.5442 / 2 = 0.2721$ mm; check: $CR/2 + 3\sigma = 0.1221 + 0.15 = 0.2721$ mm. Both routes match.
- Repeatability $= \pm 3 \times 0.05 = \pm 0.15$ mm.

COMMON TRAPS
- Some texts use $2^B$ instead of $2^B - 1$; with large $B$ the difference is tiny, but follow the question's convention.
- Repeatability depends only on mechanical variation, not on control resolution, under this model.
- Accuracy and repeatability are not the same: a robot can repeat a wrong position very consistently.
- Arc welding needs CP control, spot welding needs only PTP. Do not swap them.
- Resolution on a rotary joint gives a linear error that grows with arm reach.

GATE PATTERN
- Expect numerical questions on control resolution, spatial resolution, accuracy and repeatability, and gripper force.
- MCQs on matching applications to PTP or CP control, and on gripper and tool types.
- Shortcut: compute $CR$ first, then every other quantity follows from adding multiples of $\sigma$.
- Shortcut: if bits increase by one, control resolution roughly halves.
