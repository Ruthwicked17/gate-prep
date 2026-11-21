Power Devices and Gating

Power electronic converters use semiconductor switches that are either fully on or fully off. The thyristor (SCR) is a latching device that can be turned on by gate but not turned off by it. The power MOSFET and IGBT are fully controllable, voltage-driven switches. Gating circuits generate correctly timed, isolated pulses to switch them.

KEY IDEAS
- Thyristor: four-layer PNPN, three junctions. With forward voltage it blocks until gate current is applied or forward breakover voltage is exceeded. Reverse blocking up to reverse breakdown.
- Once on, the gate loses control; the thyristor stays on while anode current is above holding current $I_H$.
- Latching current $I_L$ is the minimum anode current that must be reached while the gate pulse is present to stay on. $I_L > I_H$ (typically two to three times).
- Turn-on methods: gate triggering (normal), forward voltage, $dv/dt$, temperature, light. Unwanted $dv/dt$ turn-on is prevented by an RC snubber; $di/dt$ is limited by a series inductor.
- Turn-off (commutation): reduce anode current below $I_H$ and apply reverse voltage for longer than turn-off time $t_q$. Natural (line) commutation in AC circuits, forced commutation in DC circuits.
- Power MOSFET: majority carrier, voltage-controlled gate, very fast switching, suits high frequency, low voltage. On-resistance has positive temperature coefficient, so parallel devices share current. Has an inherent body diode.
- IGBT: MOSFET-type insulated gate input with bipolar conduction, so low conduction drop at high voltage and current. Switching speed between MOSFET and BJT. Exhibits tail current at turn-off.
- V-I curves: MOSFET $I_D$ vs $V_{DS}$ for steps of $V_{GS}$ above $V_{GS(th)}$, switch operates in ohmic region; IGBT $I_C$ vs $V_{CE}$ for steps of $V_{GE}$, knee near 0.7 V, little reverse blocking.
- Gate drive needs isolation: pulse transformers or opto-couplers.
- Firing circuits for thyristors: R firing (delay limited to $90^\circ$), RC firing (up to nearly $180^\circ$), UJT relaxation oscillator for sharp pulses, and ramp-comparator schemes. Pulse train firing reduces pulse transformer size and gate dissipation.

FORMULAS
- Two-transistor model: $I_A = \frac{\alpha_2 I_g + I_{CBO1} + I_{CBO2}}{1 - (\alpha_1 + \alpha_2)}$; turn-on as $\alpha_1 + \alpha_2 \to 1$
- Minimum gate pulse width with inductive load: anode current rises as $V/L$ (pure L) so $t_{min} = \frac{I_L L}{V}$
- RL load: $i(t) = \frac{V}{R}\left(1 - e^{-tR/L}\right)$; solve $i = I_L$ for pulse width
- UJT peak voltage: $V_P = \eta V_{BB} + V_D$
- UJT oscillator period: $T \approx RC\ln\frac{1}{1-\eta}$
- MOSFET conduction loss: $P = I_{rms}^2 R_{DS(on)}$; switching loss $\frac{1}{2}V I (t_{on} + t_{off}) f_s$ for clamped inductive load, $\frac{1}{6}V I (t_{on} + t_{off}) f_s$ for resistive load

WORKED EXAMPLE
A thyristor with latching current 50 mA feeds a purely inductive load of 0.5 H from 100 V DC. Find the minimum gate pulse width.
- Current rises linearly: $di/dt = V/L = 100/0.5 = 200$ A/s
- Time to reach 50 mA: $t = 0.05/200 = 250\ \mu$s
- Check with the formula: $I_L L/V = 0.05 \times 0.5/100 = 2.5\times10^{-4}$ s $= 250\ \mu$s. Verified.

COMMON TRAPS
- Swapping latching and holding currents; latching is the larger one and applies at turn-on.
- Thinking a gate pulse can turn off an SCR; only GTO-type devices allow gate turn-off.
- Claiming IGBT is current-controlled; its gate is voltage-controlled like a MOSFET.
- Assuming MOSFETs are best at very high voltage; conduction losses grow steeply with voltage rating, so IGBTs dominate there.
- Forgetting that R firing cannot delay beyond $90^\circ$.

GATE PATTERN
- NAT on minimum gate pulse width, UJT frequency, snubber values, and device losses; MCQ on V-I characteristics and device comparison; MSQ on statements about MOSFET, IGBT and SCR properties.
- Shortcut: for RL loads, if $L/R$ is large compared with the pulse width, treat the load as pure L and use $t = I_L L/V$.
- Shortcut: rank speed MOSFET > IGBT > thyristor; rank voltage-current capability in the reverse order.
