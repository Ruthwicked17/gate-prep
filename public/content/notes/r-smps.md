Switched Mode Power Supplies

KEY IDEAS
- A linear regulator drops the excess voltage across a transistor working in its active region, so efficiency is roughly $V_o / V_{in}$ and it gets hot. An SMPS instead switches a transistor fully on and fully off at high frequency and uses inductors and capacitors to store and transfer energy, giving efficiencies often above 80 to 90 percent.
- Duty ratio $D = t_{on} / T_s$, where $T_s = 1/f_s$ is the switching period. The output voltage is controlled by changing $D$ (pulse width modulation).
- Higher switching frequency allows smaller inductors, capacitors and transformers, but increases switching losses and electromagnetic interference.
- Basic non-isolated converters: buck (step down), boost (step up), buck-boost (step up or down, inverted polarity). Isolated versions use a high frequency transformer: flyback (derived from buck-boost) and forward (derived from buck); push-pull, half bridge and full bridge for higher power.
- Steady-state analysis rests on two facts: the average inductor voltage over one period is zero (volt-second balance) and the average capacitor current is zero (charge balance).
- Continuous conduction mode (CCM): inductor current never reaches zero. Discontinuous conduction mode (DCM): it does, and the simple gain formulas below no longer hold.
- Feedback control compares the output with a reference and adjusts $D$ to hold the output steady against load and input changes.

FORMULAS
- Buck (CCM): $V_o = D V_{in}$. Inductor ripple $\Delta I_L = \frac{V_o (1-D)}{L f_s}$. Output voltage ripple $\Delta V_o = \frac{\Delta I_L}{8 C f_s}$.
- Boost (CCM): $V_o = \frac{V_{in}}{1-D}$. Ripple $\Delta I_L = \frac{V_{in} D}{L f_s}$.
- Buck-boost (CCM): $V_o = -\frac{D}{1-D} V_{in}$ (magnitude above $V_{in}$ when $D > 0.5$).
- Flyback (CCM): $V_o = V_{in} \frac{N_2}{N_1} \frac{D}{1-D}$. Forward: $V_o = V_{in} \frac{N_2}{N_1} D$.
- Ideal converter power balance: $V_{in} I_{in} = V_o I_o$, so in a buck $I_{in} = D I_o$.
- Buck boundary between CCM and DCM: $I_o = \frac{\Delta I_L}{2}$.

WORKED EXAMPLE
- A buck converter has $V_{in} = 24$ V, $V_o = 12$ V, $f_s = 50$ kHz and $L = 100\ \mu H$. Find $D$ and the peak to peak inductor ripple.
- $D = V_o / V_{in} = 0.5$.
- $\Delta I_L = \frac{12 \times (1 - 0.5)}{100 \times 10^{-6} \times 50 \times 10^{3}} = \frac{6}{5} = 1.2$ A.
- Check using the on-interval instead: $\Delta I_L = \frac{(V_{in} - V_o) D}{L f_s} = \frac{12 \times 0.5}{5} = 1.2$ A. Both give 1.2 A, so the load must exceed 0.6 A to stay in CCM.
- Second part: a boost with $V_{in} = 12$ V and $D = 0.6$ gives $V_o = 12 / 0.4 = 30$ V.

COMMON TRAPS
- Mixing up boost $\frac{1}{1-D}$ and buck-boost $\frac{D}{1-D}$.
- Forgetting the polarity inversion in the buck-boost.
- Applying CCM formulas when the load is light enough for DCM.
- Ideal boost gain grows without limit as $D \to 1$; real circuits are limited by losses.
- Ripple formulas give peak to peak values; peak current is $I_L + \Delta I_L / 2$.

GATE PATTERN
- Expect numerical questions on output voltage for a given duty ratio, required $D$, inductor and capacitor ripple, average and peak currents, and the CCM boundary.
- Conceptual MCQs on why SMPS beats linear regulators, the effect of switching frequency, and which topology gives isolation or inversion.
- Shortcut: write volt-second balance for the inductor; it rederives any gain formula in one line if memory fails.
