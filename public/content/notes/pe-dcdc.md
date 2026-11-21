DC-DC Converters

Switched DC-DC converters change one DC voltage to another efficiently by switching a device on for a fraction $D$ (duty ratio) of each period $T = 1/f$ and using an inductor and capacitor to filter the result. The three basic topologies are buck (step down), boost (step up) and buck-boost (either, with polarity inversion). Analysis rests on two steady-state facts: average inductor voltage is zero (volt-second balance) and average capacitor current is zero (charge balance).

KEY IDEAS
- Continuous conduction mode (CCM): inductor current never falls to zero. Discontinuous mode (DCM): it does, and the output depends on load.
- Buck: switch in series with input; inductor in series with output, so average inductor current equals load current. Input current is pulsating.
- Boost: inductor in series with input, so input current is continuous and equals inductor current. Output current is pulsating; output capacitor supplies load while the switch is on.
- Buck-boost: inductor stores energy during on-time and releases to output during off-time. Output polarity is reversed. Both input and output currents are pulsating.
- Ideal gains rise sharply as $D \to 1$ for boost and buck-boost, but parasitic resistance limits the practical maximum.
- Switch and diode in boost and buck-boost must block the full output (or input plus output) voltage.
- Larger $L$ or higher $f$ reduces current ripple; larger $C$ reduces voltage ripple.

FORMULAS
- Buck: $V_o = D V_s$, $\Delta I_L = \frac{(V_s - V_o)D}{fL} = \frac{V_o(1 - D)}{fL}$, $I_L = I_o$
- Buck output ripple: $\frac{\Delta V_o}{V_o} = \frac{1 - D}{8LCf^2}$
- Buck CCM boundary: $L_{crit} = \frac{(1 - D)R}{2f}$
- Boost: $V_o = \frac{V_s}{1 - D}$, $\Delta I_L = \frac{V_s D}{fL}$, $I_L = I_s = \frac{I_o}{1 - D}$
- Boost output ripple: $\frac{\Delta V_o}{V_o} = \frac{D}{RCf}$
- Boost CCM boundary: $L_{crit} = \frac{D(1 - D)^2 R}{2f}$
- Buck-boost: $V_o = -\frac{D}{1 - D}V_s$, $\Delta I_L = \frac{V_s D}{fL}$, $I_L = \frac{I_o}{1 - D}$
- Buck-boost ripple: $\frac{\Delta V_o}{V_o} = \frac{D}{RCf}$; CCM boundary $L_{crit} = \frac{(1 - D)^2R}{2f}$
- Peak and valley inductor currents: $I_L \pm \frac{\Delta I_L}{2}$
- Ideal power balance: $V_s I_s = V_o I_o$

WORKED EXAMPLE
Boost converter: $V_s = 12$ V, $V_o = 30$ V, $R = 15\ \Omega$, $f = 50$ kHz, $L = 100\ \mu$H. Find $D$, inductor ripple and peak current.
- $D = 1 - V_s/V_o = 1 - 0.4 = 0.6$
- $\Delta I_L = \frac{12 \times 0.6}{50\times10^3 \times 100\times10^{-6}} = \frac{7.2}{5} = 1.44$ A
- $I_o = 30/15 = 2$ A, $I_L = 2/0.4 = 5$ A, so $I_{max} = 5.72$ A, $I_{min} = 4.28$ A (positive, so CCM holds)
- Check: $L_{crit} = \frac{0.6 \times 0.16 \times 15}{2\times 50000} = 14.4\ \mu$H, well below 100 $\mu$H. Also power: $12 \times 5 = 60$ W $= 30 \times 2$. Verified.

COMMON TRAPS
- Using $I_L = I_o$ for boost or buck-boost; it is $I_o/(1 - D)$.
- Forgetting the negative sign of buck-boost output.
- Applying CCM formulas when the converter is actually in DCM; check $I_{min} > 0$ first.
- Using $\Delta I_L$ formula with $V_o$ for boost; the on-time voltage across $L$ is $V_s$.
- Mixing peak-to-peak and amplitude of ripple.

GATE PATTERN
- NAT on duty ratio, ripple current, ripple voltage, critical inductance and average switch or diode current; MCQ on topology identification and waveforms; MSQ on CCM/DCM and stress statements.
- Shortcut: average diode current equals $I_o$ in boost and buck-boost. Average switch current is $D I_L$ (in buck-boost this equals the source current $I_s$; in boost $I_s = I_L$, so the switch carries only the fraction $D$ of it).
- Shortcut: buck-boost stress on switch is $V_s + |V_o|$.
