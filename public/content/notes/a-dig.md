Digital Logic

KEY IDEAS
- Boolean algebra works on two values, 0 and 1, with AND, OR and NOT. Every logic function can be written as a sum of products (SOP, minterms) or a product of sums (POS, maxterms).
- NAND and NOR are universal gates: any function can be built from only one of them.
- Karnaugh maps group adjacent 1s in powers of two (1, 2, 4, 8) to minimise SOP; don't-care cells may be used as 1 or 0, whichever gives larger groups.
- Combinational circuits have outputs that depend only on present inputs: adders, comparators, encoders, decoders, multiplexers (MUX) and demultiplexers (DEMUX).
- A $2^n$:1 MUX has $n$ select lines and can implement any function of $n$ variables directly, or of $n+1$ variables if one variable (or its complement, 0 or 1) is fed to the data inputs.
- A DEMUX routes one input to one of $2^n$ outputs; a decoder with an enable line works as a DEMUX.
- Sequential circuits have memory: outputs depend on present inputs and stored state. The basic storage element is the latch (level triggered) or flip-flop (edge triggered).
- Flip-flop types: SR (S = R = 1 is forbidden), D (stores the input), JK (J = K = 1 toggles), T (T = 1 toggles).
- Counters: asynchronous (ripple) counters clock each stage from the previous output, so delays add up; synchronous counters clock all stages together and are faster.
- A mod-$N$ counter needs $\lceil \log_2 N \rceil$ flip-flops. A ring counter with $n$ flip-flops has $n$ states; a Johnson (twisted ring) counter has $2n$ states.

FORMULAS
- De Morgan: $\overline{A+B} = \bar{A}\,\bar{B}$ and $\overline{AB} = \bar{A}+\bar{B}$
- Absorption: $A + AB = A$, and $A + \bar{A}B = A + B$
- Consensus: $AB + \bar{A}C + BC = AB + \bar{A}C$
- Half adder: $S = A \oplus B$, $C = AB$
- Full adder: $S = A \oplus B \oplus C_{in}$, $C_{out} = AB + C_{in}(A \oplus B)$
- SR flip-flop: $Q^+ = S + \bar{R}Q$ (with $SR = 0$)
- JK flip-flop: $Q^+ = J\bar{Q} + \bar{K}Q$
- D flip-flop: $Q^+ = D$; T flip-flop: $Q^+ = T \oplus Q$
- Ripple counter, $n$ stages each of delay $t_{pd}$: $f_{max} = \frac{1}{n\,t_{pd}}$
- Synchronous counter: $f_{max} = \frac{1}{t_{pd,FF} + t_{comb} + t_{setup}}$

WORKED EXAMPLE
A 4-bit ripple (asynchronous) up counter uses flip-flops each with propagation delay $t_{pd} = 10$ ns. Find the highest clock frequency, and the number of flip-flops needed for a mod-12 counter.
- The last output settles only after all four stages toggle, so total delay is $4 \times 10 = 40$ ns.
- $f_{max} = \frac{1}{40 \times 10^{-9}} = 25$ MHz.
- Check: one clock period of 40 ns at 25 MHz gives $25 \times 10^6 \times 40 \times 10^{-9} = 1$, consistent.
- Mod-12: $2^3 = 8 < 12 \le 16 = 2^4$, so 4 flip-flops. The counter is reset when it reaches state 1100 (decimal 12).

COMMON TRAPS
- Forgetting that a mod-$N$ ripple counter divides the clock frequency by $N$ at its last output.
- Treating a level-triggered latch as edge triggered when tracing waveforms.
- In JK flip-flops with J = K = 1 and a level-triggered clock, the output can race around; edge triggering or master-slave avoids this.
- In K-maps, missing wrap-around adjacency between the left and right edges, and the top and bottom rows.
- Reading MUX select lines in the wrong bit order (check which line is the MSB).

GATE PATTERN
- MCQs ask for the minimised expression of a K-map, or the function implemented by a given MUX or gate network.
- NAT questions ask for counter modulus, number of states, output frequency, or the count after a number of clock pulses.
- MSQs list several Boolean identities or flip-flop statements to mark true.
- Tip: for a MUX circuit, write the output as a sum of (select-line minterm times data input) and simplify.
- Tip: for an unknown counter, tabulate present state, flip-flop inputs and next state for a few clocks; the sequence usually repeats quickly.
