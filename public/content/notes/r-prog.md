Programming in Python

This topic tests whether you can read short programs and predict their output, from flowcharts and pseudo code to Python types, functions, collections and recursion.

KEY IDEAS
- Flowcharts use standard symbols: oval for start or end, rectangle for a process, diamond for a decision, parallelogram for input or output. Pseudo code states the same steps in plain structured language, independent of any programming language.
- Core data types: int (unbounded precision), float, bool, str, list, tuple, dict, set. Lists, dicts and sets are mutable; int, float, str and tuple are immutable.
- Division: / always returns a float; // is floor division (rounds toward minus infinity); % gives a remainder with the sign of the divisor. So $-7 // 2 = -4$ and $-7 \bmod 2 = 1$ in Python.
- Control flow: if, elif, else; for loops over any iterable; while loops; break exits the loop; continue skips to the next iteration. A for loop's else block runs only if the loop was not ended by break.
- range(a, b, s) starts at a, stops before b, step s. For example range(1, 10, 3) gives 1, 4, 7.
- Functions: defined with def; arguments are passed by object reference. Mutating a list argument changes the caller's list, but rebinding the name inside the function does not. A mutable default argument is created once and shared across calls.
- Scope: assigning to a name inside a function makes it local unless declared global.
- Lists: zero-indexed, negative indices count from the end, slicing s[a:b] excludes b, s[::-1] reverses. append adds one item; extend adds each item of an iterable.
- Strings are immutable; methods return new strings.
- Dictionaries map hashable keys to values; get(key, default) avoids errors for missing keys. Keys must be immutable.
- Recursion: a function calls itself on a smaller problem and must have a base case. Each call has its own local variables on the call stack.

FORMULAS
- Factorial recursion: $n! = n\times(n-1)!$ with $0! = 1$, needing $n+1$ calls if the base case is $n = 0$ (only $n$ calls if the base case is $n \le 1$)
- Slice length of s[a:b] with $0 \le a \le b \le$ len(s) is $b - a$
- Count of values in range(a, b, s) for positive s and $b > a$: $\lceil (b - a)/s \rceil$
- Binary search on $n$ sorted items needs at most about $\lfloor\log_2 n\rfloor + 1$ comparisons

WORKED EXAMPLE
A recursive function sumdig takes a non-negative integer n. If n is less than 10 it returns n. Otherwise it returns n mod 10 plus sumdig of n floor-divided by 10. Trace sumdig(472).
- Call 1: n is 472, not below 10. Last digit 472 mod 10 is 2; it calls sumdig(47).
- Call 2: n is 47. Last digit is 7; it calls sumdig(4).
- Call 3: n is 4, below 10, so it returns 4 (base case).
- Unwinding: call 2 returns 7 plus 4, which is 11. Call 1 returns 2 plus 11, which is 13.
- Check: adding digits directly, 4 plus 7 plus 2 equals 13; the 3 calls match the 3 digits.

COMMON TRAPS
- Off-by-one with range and slicing end points.
- Expecting // and % to truncate toward zero for negative numbers.
- Aliasing: after b = a on a list, changing b changes a.
- Missing or unreachable base case causing infinite recursion.
- 6 / 2 prints 3.0, not 3.

GATE PATTERN
- Mostly NAT asking for the printed value or the number of iterations or calls; MCQ asking which output or which statement is correct; MSQ on properties of data types and mutability.
- Shortcut: keep a small table of variable values per iteration.
- Shortcut: for recursion, draw the call tree, solve the base cases first, then fill values upward.
