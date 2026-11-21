Electrical and Electronic Measurements

This topic covers how electrical quantities are measured accurately: comparison methods (bridges and potentiometers), indicating instruments for V, I, power, energy and power factor, instrument transformers, digital voltmeters, oscilloscopes, and how errors combine.

KEY IDEAS
- A bridge is balanced when the detector reads zero; the unknown is then found from the other arms, independent of the source voltage.
- Wheatstone bridge measures medium resistance. Kelvin double bridge measures low resistance by removing lead and contact resistance. Megger or loss-of-charge methods suit high resistance.
- AC bridges need both magnitude and phase balance. Maxwell (inductance with a standard capacitor, suited to medium Q), Hay (high Q coils), Anderson (precise inductance), Schering (capacitance and loss angle), Wien (capacitance or frequency).
- A DC potentiometer measures emf by null comparison against a standardised wire, drawing no current at balance.
- PMMC instruments read average value and work on DC only; moving iron reads RMS on AC and DC; electrodynamometer instruments read true power.
- Ammeter range is extended with a shunt (parallel), voltmeter range with a multiplier (series).
- Three-phase power can be measured with two wattmeters for any three-wire load, balanced or not. Readings also give power factor for balanced loads.
- An induction energy meter's disc speed is proportional to power; the meter constant is revolutions per kWh.
- CT secondary must never be open-circuited under load (dangerous high voltage and core saturation). PT secondary must not be shorted.
- DVM types: ramp, dual-slope integrating (good noise rejection), successive approximation (fast). Resolution of an $n$-digit display is $1/10^n$ of full scale.
- Oscilloscope: Lissajous patterns give frequency ratio and phase difference.
- Errors: systematic (gross, instrumental, environmental) versus random. Limiting error is quoted as a percent of full scale or of reading.

FORMULAS
- Wheatstone balance: $R_x = \dfrac{R_2 R_3}{R_1}$ (opposite arm products equal)
- Shunt: $R_{sh} = \dfrac{I_m R_m}{I - I_m}$; multiplier: $R_s = \dfrac{V}{I_m} - R_m$
- Two-wattmeter: $P = W_1 + W_2$, $\tan\phi = \dfrac{\sqrt{3}(W_1 - W_2)}{W_1 + W_2}$
- Lissajous: $\dfrac{f_y}{f_x} = \dfrac{\text{horizontal tangencies}}{\text{vertical tangencies}}$; phase $\sin\phi = \dfrac{y_0}{y_{max}}$
- Product or quotient: relative limiting errors add, $\dfrac{\delta P}{P} = \dfrac{\delta A}{A} + \dfrac{\delta B}{B}$
- Power law $X = A^m B^n$: $\dfrac{\delta X}{X} = |m|\dfrac{\delta A}{A} + |n|\dfrac{\delta B}{B}$
- CT ratio error $= \dfrac{K_n I_s - I_p}{I_p}\times100$ percent

WORKED EXAMPLE
Two wattmeters on a balanced three-phase load read 1000 W and 500 W. Find total power and power factor.
- $P = 1000 + 500 = 1500$ W.
- $\tan\phi = \dfrac{\sqrt{3}\times500}{1500} = \dfrac{1.732}{3} = 0.577$, so $\phi = 30^\circ$.
- Power factor $= \cos30^\circ = 0.866$ lagging (assuming the usual connection).
- Check: $W_1 = V_L I_L\cos(30^\circ - \phi)$ and $W_2 = V_L I_L\cos(30^\circ + \phi)$. At $\phi = 30^\circ$ the ratio is $\cos0^\circ/\cos60^\circ = 2$, matching 1000/500.

COMMON TRAPS
- Two-wattmeter: at pf 0.5 one meter reads zero; below 0.5 one reading is negative and must be subtracted.
- Limiting error quoted on full scale grows as a percent of reading at low readings.
- A PMMC meter on a pure AC sine reads zero; on half-wave rectified signals it reads the average.
- Number of digits: a $3\tfrac{1}{2}$ digit display counts up to 1999.

GATE PATTERN
- NAT on shunt or multiplier values, bridge unknowns, two-wattmeter power factor, energy meter revolutions, and percent error. MCQ on bridge selection and instrument type. MSQ on instrument properties.
- Shortcut: for ratio $W_2/W_1 = r$, $\tan\phi = \sqrt{3}\dfrac{1 - r}{1 + r}$.
- Shortcut: in AC bridges, equate real parts and imaginary parts separately; the frequency-independent balance usually gives the answer.
