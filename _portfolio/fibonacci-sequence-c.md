---
title: "Fibonacci Sequence in C"
excerpt: "A command-line tool written in C that generates the Fibonacci sequence using both iterative and recursive methods."
---

A command-line tool written in C that generates the Fibonacci sequence, demonstrating and comparing the performance of iterative and recursive solutions.

**Role:** Sole Developer

**Tools:** C (stdio.h)

**Challenges:** The primary challenge was to implement the recursive solution efficiently. A standard recursive approach is computationally expensive due to repeated calculations. This was solved by implementing memoisation (caching previously computed results in an array) to avoid redundant function calls, which significantly improved performance for larger sequences. The project also involved robust input validation to handle non-numeric or out-of-range user input gracefully.

[View project on GitHub](https://github.com/kyeotsuka/FibonacciSequence)