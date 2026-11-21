Diode Circuits

KEY IDEAS
- A diode conducts when forward biased and blocks when reverse biased. Common models: ideal (short when on, open when off), constant voltage drop (about 0.7 V for silicon), and piecewise linear (drop plus a small series resistance).
- Method for any diode circuit: assume each diode state, solve the linear circuit, then check consistency (on diode has forward current, off diode has reverse or less than cut-in voltage).
- Clipping circuits (limiters) cut off part of the input waveform above or below a reference level. Series clippers put the diode in series with the load; shunt clippers put it in parallel. A bias battery shifts the clipping level.
- Clamping circuits (DC restorers) shift the whole waveform up or down by a DC level without changing its shape or peak-to-peak value. They use a capacitor, a diode and optionally a bias source. The RC time constant must be much larger than the signal period.
- A positive clamper (diode pointing up toward the output node from ground) pushes the waveform so that its minimum sits at about 0 V; a negative clamper puts the maximum at about 0 V.
- Rectifiers convert AC to pulsating DC. Half-wave uses one diode; full-wave uses a centre-tapped transformer with two diodes or a bridge with four diodes.
- A capacitor filter across the load charges to the peak and discharges slowly through the load, reducing ripple.

FORMULAS
- Half-wave (resistive load, peak $V_m$): $V_{dc} = \dfrac{V_m}{\pi}$, $V_{rms} = \dfrac{V_m}{2}$, ripple factor 1.21, maximum efficiency 40.6 percent, ripple frequency $f$.
- Full-wave: $V_{dc} = \dfrac{2V_m}{\pi}$, $V_{rms} = \dfrac{V_m}{\sqrt{2}}$, ripple factor 0.482, maximum efficiency 81.2 percent, ripple frequency $2f$.
- Peak inverse voltage: half-wave $V_m$ (but $2V_m$ with a capacitor filter), centre-tap full-wave $2V_m$, bridge $V_m$.
- Ripple factor: $r = \sqrt{\left(\dfrac{V_{rms}}{V_{dc}}\right)^2 - 1}$.
- Capacitor filter peak-to-peak ripple (approx.): half-wave $V_r = \dfrac{V_m}{fRC}$, full-wave $V_r = \dfrac{V_m}{2fRC}$.
- With capacitor filter: $V_{dc} \approx V_m - \dfrac{V_r}{2}$.
- Bridge with silicon diodes: two diodes conduct at a time, so the output peak is about $V_m - 1.4$ V.

WORKED EXAMPLE
A bridge rectifier with ideal diodes is fed from a 50 Hz supply with secondary peak $V_m = 20$ V. Load $R = 1$ k$\Omega$, filter $C = 1000$ $\mu$F. Find the ripple and DC output, and compare with no filter.
- Full-wave ripple: $V_r = \dfrac{20}{2 \times 50 \times 1000 \times 1000 \times 10^{-6}} = \dfrac{20}{100} = 0.2$ V peak-to-peak.
- DC output: $V_{dc} \approx 20 - 0.1 = 19.9$ V.
- Without filter: $V_{dc} = 2 \times 20/\pi = 12.73$ V.
- Check: $RC = 1$ s, which is 100 times the half-period of 10 ms, so the small-ripple approximation is valid. Recomputing $V_r = V_m T_{ripple}/(RC) = 20 \times 0.01/1 = 0.2$ V gives the same value.
- PIV per diode in the bridge is 20 V.

COMMON TRAPS
- Using PIV $= V_m$ for the centre-tapped circuit; it is $2V_m$.
- Forgetting that a full-wave ripple frequency is twice the supply frequency, which halves the ripple for the same $RC$.
- In clampers, assuming the peak-to-peak value changes; only the DC level shifts.
- Forgetting the diode drop or bias battery when finding the clipping level.
- Ignoring which diodes conduct in each half-cycle of a bridge, leading to doubled drops being missed.

GATE PATTERN
- NAT: average output of a rectifier, ripple voltage, capacitor value for given ripple, clipping level.
- MCQ: identify the output waveform of a clipper or clamper; pick the correct transfer characteristic.
- MSQ: properties of rectifier types (PIV, ripple frequency, efficiency).
- Shortcut: for clippers, find the input voltage at which the diode changes state; the output follows the input on one side and is fixed on the other.
- Shortcut: for clampers, find the voltage the capacitor charges to in the first conducting half-cycle, then add it to the input waveform.
