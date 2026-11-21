Electromechanical Conversion and DC Machines

KEY IDEAS
- Electromechanical energy conversion happens through a coupling magnetic field. Electrical input equals mechanical output plus the change in stored field energy plus losses.
- Force or torque comes from the change of field energy or co-energy with position. In a linear magnetic system field energy equals co-energy.
- A singly excited system (one coil, variable inductance) produces reluctance torque, which tries to move the rotor toward the position of maximum inductance.
- A DC machine has a field winding on the stator and an armature winding on the rotor, connected through a commutator that keeps torque in one direction.
- Lap winding has as many parallel paths as poles; wave winding has two parallel paths.
- Excitation types: separately excited, shunt, series and compound (cumulative or differential).
- Generators: the open-circuit characteristic (OCC) is the magnetisation curve. A self-excited shunt generator builds up only if there is residual flux, correct field connection, and field resistance below the critical value.
- Armature reaction distorts and weakens the main field; interpoles and compensating windings reduce its effects on commutation.
- Shunt motor: nearly constant speed. Series motor: high starting torque, speed rises sharply at light load, so it must never be run without load.
- Speed control: armature voltage control below base speed (constant torque), field weakening above base speed (constant power), and armature series resistance (simple but wasteful). Ward-Leonard is a classic variable-voltage scheme.
- Swinburne's test is a no-load test that estimates efficiency of shunt machines.

FORMULAS
- Field energy (linear): $W_f = \frac{1}{2} L i^2$
- Force at constant current: $F = \frac{\partial W'_{co}}{\partial x}$; torque of a singly excited system: $T = \frac{1}{2} i^2 \frac{dL}{d\theta}$
- Generated EMF: $E = \frac{P \phi Z N}{60 A}$, with $A = P$ (lap) or $A = 2$ (wave)
- Torque: $T = \frac{P \phi Z I_a}{2 \pi A} = k \phi I_a$
- Power balance: $E I_a = T \omega$
- Motor: $V = E_b + I_a R_a$; generator: $E = V + I_a R_a$
- Speed relation: $\frac{N_2}{N_1} = \frac{E_2}{E_1} \cdot \frac{\phi_1}{\phi_2}$
- Series motor (unsaturated): $T \propto I_a^2$
- Maximum efficiency when variable copper loss equals constant losses

WORKED EXAMPLE
A 220 V DC shunt motor has $R_a = 0.5$ ohm and draws armature current 40 A at 1000 rpm. The field is weakened so the flux falls to 80% of its original value, with load torque constant. Find the new speed. Ignore armature reaction.
- Initial back EMF: $E_1 = 220 - 40 \times 0.5 = 200$ V.
- Constant torque means $\phi I_a$ is constant: $I_{a2} = \frac{40}{0.8} = 50$ A.
- New back EMF: $E_2 = 220 - 50 \times 0.5 = 195$ V.
- New speed: $N_2 = 1000 \times \frac{195}{200} \times \frac{1}{0.8} = 1218.75$ rpm.
- Check with $E = k\phi N$: $k\phi_1 = \frac{200}{1000} = 0.2$; $k\phi_2 = 0.16$; $N_2 = \frac{195}{0.16} = 1218.75$ rpm. Both agree.

COMMON TRAPS
- Forgetting that armature current rises when flux is reduced at constant torque.
- Using line current instead of armature current in a shunt machine; $I_a = I_L - I_f$ for a motor, $I_a = I_L + I_f$ for a generator.
- Mixing up lap and wave values of $A$.
- Assuming torque is proportional to current in a series motor; it is proportional to current squared below saturation.
- Ignoring brush drop when a question states it.

GATE PATTERN
- NAT questions on back EMF, speed after a change in flux, voltage or resistance, starting resistance, torque and efficiency.
- NAT or MCQ on force or torque from an inductance that varies with position.
- MCQs on characteristics of shunt, series and compound machines, and conditions for self-excitation.
- Tip: write $E \propto \phi N$ and $T \propto \phi I_a$ first; most speed control questions reduce to these two ratios.
- Tip: for reluctance torque, differentiate the given $L(\theta)$ and substitute the current.
