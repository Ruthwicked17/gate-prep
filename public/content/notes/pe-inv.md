Inverters and SPWM

An inverter converts DC to AC of controllable magnitude and frequency. A voltage source inverter (VSI) is fed from a stiff DC voltage (large capacitor) and defines the output voltage waveform; a current source inverter (CSI) is fed from a stiff DC current (large inductor) and defines the output current waveform. Sinusoidal PWM shapes the output so the fundamental is controlled and harmonics are pushed to high frequency.

KEY IDEAS
- VSI switches need anti-parallel (feedback) diodes to carry reactive load current. Switches in the same leg must never conduct together (shoot-through), so a dead time is inserted.
- CSI needs devices that block reverse voltage (or series diodes) and no feedback diodes. Load current is a quasi-square wave; output voltage depends on load. It is inherently short-circuit tolerant.
- Single-phase half bridge: output swings $\pm V_{dc}/2$. Full bridge: $\pm V_{dc}$, or three-level with phase shift control.
- Square-wave output contains all odd harmonics, $n$th harmonic amplitude $\propto 1/n$.
- Three-phase VSI in $180^\circ$ conduction: three switches on at a time; phase voltage is a six-step wave with levels $V_{dc}/3$ and $2V_{dc}/3$. In $120^\circ$ conduction: two switches on at a time.
- In three-phase balanced outputs, triplen harmonics are absent from line voltages; remaining orders are $6k \pm 1$.
- Sinusoidal PWM: a sine reference at output frequency is compared with a triangular carrier. Amplitude modulation index $m_a = V_{ref}/V_{carrier}$ controls fundamental magnitude; frequency modulation ratio $m_f = f_c/f_r$ places harmonics around $m_f$ and its multiples.
- Linear region $m_a \le 1$: fundamental proportional to $m_a$. Overmodulation $m_a > 1$: nonlinear, lower-order harmonics reappear, tending to square wave.
- Choose $m_f$ odd to keep half-wave symmetry; for three-phase also a multiple of 3 so dominant harmonics cancel in line voltage.
- Single-pulse (quasi-square) control with pulse width $2d$ eliminates harmonic $n$ when $nd = 180^\circ$, for example $2d = 120^\circ$ removes the third.

FORMULAS
- Full bridge square wave: $V_{n,peak} = \frac{4V_{dc}}{n\pi}$, fundamental rms $= \frac{2\sqrt{2}}{\pi}V_{dc} = 0.9V_{dc}$; total rms $= V_{dc}$
- Half bridge: fundamental rms $= 0.45V_{dc}$; total rms $= V_{dc}/2$
- Quasi-square (pulse width $2d$): $V_{n,peak} = \frac{4V_{dc}}{n\pi}\sin(nd)$
- Three-phase $180^\circ$ mode: line rms $= \sqrt{2/3}\,V_{dc} = 0.816V_{dc}$; line fundamental rms $= \frac{\sqrt{6}}{\pi}V_{dc} = 0.78V_{dc}$; phase rms $= \frac{\sqrt{2}}{3}V_{dc} = 0.471V_{dc}$; phase fundamental rms $= \frac{\sqrt{2}}{\pi}V_{dc} = 0.45V_{dc}$
- Three-phase $120^\circ$ mode: line rms $= V_{dc}/\sqrt{2}$, phase rms $= V_{dc}/\sqrt{6}$
- SPWM half bridge: $V_{1,peak} = m_a\frac{V_{dc}}{2}$; full bridge bipolar: $V_{1,peak} = m_a V_{dc}$
- SPWM three-phase: line fundamental peak $= \frac{\sqrt{3}}{2}m_a V_{dc}$, rms $= 0.612\,m_a V_{dc}$

WORKED EXAMPLE
A three-phase VSI has $V_{dc} = 600$ V. Find line rms, line fundamental rms in $180^\circ$ mode, and line fundamental rms with SPWM at $m_a = 0.8$.
- Line rms $= 0.8165 \times 600 = 489.9$ V
- Line fundamental rms $= \frac{\sqrt{6}}{\pi}\times600 = 0.7797\times600 = 467.8$ V
- SPWM: $\frac{\sqrt{3}}{2}\times0.8\times600 = 415.7$ V peak, rms $= 415.7/\sqrt{2} = 293.9$ V
- Check: $0.612\times0.8\times600 = 293.8$ V (rounding). Phase fundamental in $180^\circ$ mode $= 467.8/\sqrt{3} = 270.1$ V, matching $0.45\times600$. Verified.

COMMON TRAPS
- Using square-wave formulas for SPWM outputs; under linear SPWM the fundamental is $m_a$ times the half-bridge or full-bridge base, not $4V_{dc}/\pi$.
- Forgetting the factor $\sqrt{3}/2$ for three-phase SPWM line voltage.
- Swapping $180^\circ$ and $120^\circ$ mode rms values.
- Giving CSI feedback diodes or VSI reverse-blocking requirements; it is the other way round.
- Assuming SPWM harmonics sit at low orders; they cluster around $m_f$, $2m_f$ and so on.

GATE PATTERN
- NAT on rms and fundamental voltages, harmonic amplitudes, $m_a$ for a required output, and pulse width for harmonic elimination; MCQ on VSI versus CSI and on switching states; MSQ on harmonic content and $m_f$ selection.
- Shortcut: $n$th harmonic of a square wave is $1/n$ of the fundamental, so the 5th is 20 percent.
