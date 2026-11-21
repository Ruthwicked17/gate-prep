Microcontrollers and Data Acquisition

KEY IDEAS
- A microcontroller puts a CPU, program memory, data memory, I/O ports, timers and serial or analog peripherals on one chip. A microprocessor needs these added externally. Robots use microcontrollers for joint control, sensor reading and motor drive.
- CPU: fetches, decodes and executes instructions. Key registers are the accumulator and general purpose registers, the program counter (address of the next instruction), the stack pointer and the status (flag) register.
- Memory: program code lives in non-volatile memory (ROM, flash, EEPROM); variables live in RAM, which is volatile. Harvard architecture uses separate program and data buses; von Neumann shares one bus.
- I/O ports: groups of pins configured as input or output through direction registers. Digital output drives LEDs, relays and motor driver inputs; digital input reads switches and encoders.
- Timers and counters: a timer counts internal clock pulses (to measure time or create delays and PWM); a counter counts external pulses (for example encoder ticks). Overflow sets a flag and can raise an interrupt.
- Interrupts: a hardware or software event pauses the main program, saves the return address on the stack, runs an interrupt service routine (ISR), then resumes. Interrupts beat polling because the CPU does not waste time checking a flag. Priorities and masking decide which interrupt wins.
- Interfacing: switches need debouncing; LEDs need series resistors; motors and relays need driver stages (transistor, H-bridge) because port pins source little current. Serial links include UART (asynchronous), SPI (synchronous, master-slave, full duplex) and I2C (two wires, addressed devices).
- Data acquisition (DAQ) chain: sensor, signal conditioning (amplify, filter, isolate), multiplexer, sample and hold, ADC, then processor. A DAC converts digital values back to analog.

FORMULAS
- ADC resolution (step size): $\Delta = \frac{V_{ref}}{2^n}$ for an $n$-bit converter (some texts use $2^n - 1$; follow the question).
- Digital output code: $D = \left\lfloor \frac{V_{in}}{\Delta} \right\rfloor$.
- Maximum quantisation error: $\pm \frac{\Delta}{2}$ with rounding.
- Nyquist criterion: sampling rate $f_s \ge 2 f_{max}$, else aliasing occurs. Use an anti-aliasing low pass filter before the ADC.
- Ideal SNR of an $n$-bit ADC: about $6.02n + 1.76$ dB.
- Timer delay: count needed $N = \frac{t_{delay}}{T_{tick}}$; for an up-counter that overflows at $2^k$, preload value $= 2^k - N$.

WORKED EXAMPLE
- An 8051 runs from a 12 MHz crystal. One machine cycle is 12 clock periods, so $T_{tick} = 12 / 12\text{ MHz} = 1\ \mu s$. Find the preload for a 50 ms delay using a 16-bit timer (mode 1).
- Counts needed: $N = 50\text{ ms} / 1\ \mu s = 50000$.
- Preload $= 65536 - 50000 = 15536$, which is 3CB0 in hex (TH = 3C, TL = B0).
- Check: $3 \times 4096 + 12 \times 256 + 11 \times 16 + 0 = 12288 + 3072 + 176 = 15536$. Counting from 15536 to 65536 takes 50000 ticks, which is 50 ms.
- Second part: a 10-bit ADC with $V_{ref} = 5$ V has step $5/1024 \approx 4.88$ mV. An input of 2 V gives code $\lfloor 2 / 0.004883 \rfloor = 409$.

COMMON TRAPS
- Forgetting the machine cycle divider (12 for the classic 8051) and using the crystal period directly.
- Using $2^n$ vs $2^n - 1$ inconsistently in ADC step size.
- Confusing timer (internal clock) and counter (external pulses) modes.
- Sampling at exactly $2 f_{max}$ is the theoretical limit; practical systems sample faster.
- An ISR should be short; long ISRs delay other interrupts.

GATE PATTERN
- Numerical questions on ADC step size, output code, quantisation error, sampling rate and timer preload values are the most natural targets.
- Conceptual MCQs on interrupts vs polling, memory types, serial protocols and the order of blocks in a DAQ chain.
- Shortcut: each extra ADC bit halves the step size and adds about 6 dB of SNR.
- Shortcut: for timer questions, first compute the tick period, then the count, then subtract from the overflow value.
