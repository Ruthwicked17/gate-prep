Schmitt Trigger, S/H, ADC and DAC

KEY IDEAS
- A Schmitt trigger is a comparator with positive feedback. It has two thresholds, the upper threshold $V_{UT}$ and lower threshold $V_{LT}$. The gap between them is the hysteresis, which stops the output chattering when a noisy input is near a single threshold.
- In an inverting Schmitt trigger the input goes to the inverting terminal and a divider from the output feeds the non-inverting terminal. In a non-inverting Schmitt trigger the input goes through a resistor to the non-inverting terminal.
- A sample and hold (S/H) circuit uses a switch and a hold capacitor, usually buffered by op-amps. It samples the input, then holds it constant while an ADC converts it.
- S/H parameters: acquisition time (time to charge to the input within tolerance), aperture time (delay for the switch to open), and droop (the held voltage falls slowly due to leakage current).
- A DAC converts an $n$-bit code to an analog voltage. The weighted-resistor DAC needs a wide range of resistor values. The R-2R ladder needs only two values, so it is preferred.
- An ADC converts an analog voltage to an $n$-bit code. Main types: flash (fastest, $2^n - 1$ comparators), successive approximation (SAR, $n$ clock cycles), counter or ramp type (up to $2^n$ clock cycles), dual slope (slow but accurate and rejects noise).
- Resolution is the change for one LSB. Quantisation error is at most half an LSB for a rounding converter.

FORMULAS
- Inverting Schmitt trigger, divider $R_1$ (to ground) and $R_2$ (feedback), with $\beta = \frac{R_1}{R_1 + R_2}$: $V_{UT} = +\beta V_{sat}$, $V_{LT} = -\beta V_{sat}$
- Hysteresis width: $V_H = V_{UT} - V_{LT} = 2\beta V_{sat}$ (for symmetric saturation)
- Non-inverting Schmitt trigger, input resistor $R_1$, feedback $R_2$: thresholds $\pm \frac{R_1}{R_2} V_{sat}$
- S/H droop rate: $\frac{dV}{dt} = \frac{I_{leak}}{C_H}$
- DAC step size: $V_{LSB} = \frac{V_{ref}}{2^n}$; output $V_o = V_{LSB} \times D$ where $D$ is the decimal value of the code
- Full-scale output: $V_{FS} = V_{ref}\left(1 - 2^{-n}\right)$
- Percentage resolution: $\frac{1}{2^n - 1} \times 100\%$ (some texts use $2^n$)
- Dual slope ADC: $V_{in} = V_{ref}\,\frac{t_2}{t_1}$, where $t_1$ is the fixed integration time and $t_2$ the de-integration time
- Ideal ADC signal to noise ratio for a full-scale sine: $SNR \approx 6.02n + 1.76$ dB

WORKED EXAMPLE
An 8-bit R-2R DAC has $V_{ref} = 10$ V. Find the step size and the output for the input 10110100.
- Step size: $V_{LSB} = \frac{10}{2^8} = \frac{10}{256} = 0.0390625$ V, about 39.06 mV.
- Decimal value: $128 + 32 + 16 + 4 = 180$.
- Output: $V_o = 180 \times 0.0390625 = 7.03125$ V.
- Check by bit weights: $10\left(\frac{1}{2} + \frac{1}{8} + \frac{1}{16} + \frac{1}{64}\right) = 10 \times 0.703125 = 7.03125$ V. Both methods agree.

COMMON TRAPS
- Mixing up which resistor forms $\beta$ in inverting and non-inverting Schmitt circuits; always derive from the voltage at the non-inverting terminal.
- If a reference voltage $V_R$ is applied to the divider, both thresholds shift; the hysteresis width stays the same.
- Confusing step size $\frac{V_{ref}}{2^n}$ with full-scale value, which is one step less than $V_{ref}$.
- Counting comparators in a flash ADC as $2^n$ instead of $2^n - 1$.
- SAR conversion time is fixed at about $n$ clocks, but a counter-type ADC's time depends on the input.

GATE PATTERN
- NAT questions ask for Schmitt thresholds or hysteresis width, DAC output for a given code, ADC step size, digital output for a given input, or conversion time.
- MCQs compare ADC types by speed, comparator count or accuracy.
- MSQs may test S/H parameters and DAC properties.
- Tip: for a Schmitt trigger, assume the output is at $+V_{sat}$, find the switching input, then repeat for $-V_{sat}$.
- Tip: for an ADC, divide the input by the step size and round or truncate as the question states.
