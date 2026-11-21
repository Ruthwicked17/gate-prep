Robot Kinematics and Transformations

KEY IDEAS
- A manipulator is a chain of rigid links connected by joints. Revolute (R) joints rotate, prismatic (P) joints slide. Each gives one degree of freedom (DOF). Spherical joints give 3 and universal joints give 2.
- Serial manipulator: an open chain from base to end-effector (for example an industrial arm). Large workspace, but errors accumulate along the chain and stiffness is lower.
- Parallel manipulator: several chains link the base to a moving platform (for example the Stewart platform, delta robot). High stiffness, speed and accuracy, but a smaller workspace and harder forward kinematics.
- Positioning a body fully in space needs 6 DOF (3 position, 3 orientation); in a plane, 3 DOF. A robot with more DOF than the task needs is redundant.
- Common arm types by first three joints: Cartesian (PPP), cylindrical (RPP), spherical or polar (RRP), articulated (RRR), SCARA (RRP with parallel vertical axes).
- A rotation matrix $R$ describes the orientation of one frame relative to another. Its columns are the unit axes of the rotated frame expressed in the reference frame.
- A homogeneous transformation $T$ packs rotation $R$ and translation $d$ into one 4 by 4 matrix so that chained motions become matrix products.
- Forward kinematics: given joint variables, find end-effector position and orientation by multiplying link transforms, $T_n^0 = A_1 A_2 \cdots A_n$. Inverse kinematics is the reverse and may have several or no solutions.

FORMULAS
- Planar mobility (Gruebler): $M = 3(n-1) - 2 j_1 - j_2$, with $n$ links including ground, $j_1$ one-DOF joints, $j_2$ two-DOF joints.
- Spatial mobility (Kutzbach): $M = 6(n-1) - 5 j_1 - 4 j_2 - 3 j_3 - 2 j_4 - j_5$, where $j_k$ is the number of joints with $k$ DOF (R, P are 1; U is 2; S is 3). For an open serial chain $M$ is simply the sum of joint DOF.
- $R_z(\theta) = [[\cos\theta, -\sin\theta, 0], [\sin\theta, \cos\theta, 0], [0, 0, 1]]$ (rows listed). The 2D rotation is its upper-left 2 by 2 block, $[[\cos\theta, -\sin\theta],[\sin\theta, \cos\theta]]$.
- $R_x(\theta) = [[1,0,0],[0,\cos\theta,-\sin\theta],[0,\sin\theta,\cos\theta]]$ and $R_y(\theta) = [[\cos\theta,0,\sin\theta],[0,1,0],[-\sin\theta,0,\cos\theta]]$.
- Properties: $R^{-1} = R^T$, $\det R = +1$, columns are orthonormal.
- $T = [[R, d],[0\ 0\ 0, 1]]$ and $p_0 = R p_1 + d$. Inverse: $T^{-1} = [[R^T, -R^T d],[0\ 0\ 0, 1]]$.
- Composition: post-multiply for rotations about the current (moving) frame, pre-multiply for rotations about the fixed frame.
- Two-link planar arm: $x = l_1 \cos\theta_1 + l_2 \cos(\theta_1+\theta_2)$, $y = l_1 \sin\theta_1 + l_2 \sin(\theta_1+\theta_2)$.
- DH link transform: $A_i = R_z(\theta_i) \, Trans_z(d_i) \, Trans_x(a_i) \, R_x(\alpha_i)$.
- Expanded: $A_i = [[c\theta_i, -s\theta_i c\alpha_i, s\theta_i s\alpha_i, a_i c\theta_i],[s\theta_i, c\theta_i c\alpha_i, -c\theta_i s\alpha_i, a_i s\theta_i],[0, s\alpha_i, c\alpha_i, d_i],[0,0,0,1]]$. Parameters: $\theta_i$ joint angle about $z_{i-1}$, $d_i$ offset along $z_{i-1}$, $a_i$ link length along $x_i$, $\alpha_i$ twist about $x_i$. For a revolute joint $\theta_i$ is the variable; for a prismatic joint $d_i$ is.

WORKED EXAMPLE
- Frame 1 is rotated $90^\circ$ about $z_0$ and its origin sits at $d = (2, 1, 0)$ in frame 0. A point has coordinates $p_1 = (1, 0, 0)$. Find $p_0$.
- $R_z(90^\circ) = [[0,-1,0],[1,0,0],[0,0,1]]$, so $R p_1 = (0, 1, 0)$.
- $p_0 = (0, 1, 0) + (2, 1, 0) = (2, 2, 0)$.
- Check with the inverse: $p_0 - d = (0, 1, 0)$, and $R^T (0,1,0) = (1, 0, 0) = p_1$. Confirmed.
- Two-link arm, $l_1 = l_2 = 1$, $\theta_1 = 30^\circ$, $\theta_2 = 60^\circ$: $x = 0.866 + \cos 90^\circ = 0.866$, $y = 0.5 + \sin 90^\circ = 1.5$. Check: distance from base $= \sqrt{0.75 + 2.25} = \sqrt{3}$, matching the law of cosines $\sqrt{1+1+2\cos 60^\circ} = \sqrt 3$.
- DOF counts: planar four-bar, $n = 4$, $j_1 = 4$: $M = 3(3) - 2(4) = 1$. Stewart platform (6-UPS): $n = 14$ (ground, platform, 2 links per leg), 6 P, 6 U, 6 S joints: $M = 6(13) - 5(6) - 4(6) - 3(6) = 6$.

COMMON TRAPS
- Multiplying in the wrong order: matrix products do not commute.
- Using the wrong sign on $\sin$ in $R_y$, which differs from $R_x$ and $R_z$.
- Writing $T^{-1}$ with $-d$ instead of $-R^T d$.
- In the two-link formulas $\theta_2$ is measured relative to link 1, so the second link's absolute angle is $\theta_1 + \theta_2$.
- Forgetting to count the fixed ground as a link in Gruebler's formula.
- Using the planar formula (factor 3) for a spatial mechanism or vice versa. Both formulas can also mislead for overconstrained mechanisms or special geometry.

GATE PATTERN
- This is a high-weight topic. Expect numerical questions on point transformation, composite rotations, transform inverses, two-link forward kinematics, DOF counts and DH matrices.
- MCQs on properties of rotation matrices and on serial versus parallel trade-offs.
- Shortcut: check any answer matrix for orthonormal columns and $\det R = 1$.
- Shortcut: the distance from the origin to a point is unchanged by pure rotation, a quick sanity check.
