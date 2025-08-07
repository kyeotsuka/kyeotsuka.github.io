---
title: "Fibonacci Sequence in C"
date: 2025-08-04T14:38:00+0100
categories:
  - blog
tags:
  - C
  - programming
---

This post will talk about my experience making the Fibonacci Sequence generator in C.

# Coding the base logic

I used a [YouTube video](https://www.youtube.com/watch?v=07rT0g_N5eY) by Portfolio Courses to learn the basic logic for generating the Fibonacci sequence in C. I’ve made a few small changes, such as renaming functions and allowing the user to choose between iterative and recursive methods, but the core structure remains similar to the video.

## Initial code

```c
#include <stdio.h>

int calculateFibonacci_Iterative(int length) {
    int a = 0;
    int b = 1;
    int fibN = 0;

    printf("\nIterative solution\n");

    // Print 0 and 1
    printf("%d,%d,", a, b);

    for (int i = 2; i < length; i++) {
        fibN = a + b;
        printf("%d", fibN);

        a = b;
        b = fibN;

        if (i != (length-1)) {
            printf(",");
        } else {
            printf("\n");
        }
    }

    return 0;
}

int fib(int n) {
    if (n > 1) return fib(n-1) + fib(n-2);
    else if (n == 1) return 1;
    else if (n == 0) return 0;
    else {
        printf("Error: n must be greater >= 0\n");
        return -1;
    }
}

int calculateFibonacci_Recursive(int length) {
    printf("\nRecursive solution\n");

    for (int i = 0; i < length; i++) {
        printf("%d", fib(i));

        if (i != (length-1)) {
            printf(",");
        } else {
            printf("\n");
        }
    }

    return 0;
}

int main(void) {
    int length = 0;
    int choice = 0;

    printf("======================\n");
    printf("The Fibonacci Sequence\n");
    printf("======================\n");

    do {
        printf("Enter sequence length: ");
        scanf("%d", &length);
        if (length <= 3) {
            printf("Please input a number greater than 3.\n");
        }
    } while (length <= 3);

    do {
        printf("Select iterative (0) or recursive (1): ");
        scanf("%d", &choice);

        if (choice == 0) {
            calculateFibonacci_Iterative(length);
        } else if (choice == 1) {
            calculateFibonacci_Recursive(length);
        } else {
            printf("Please input a valid choice (0 or 1).\n");
        }
    } while (choice != 0 | choice != 1);

    return 0;
}
```

# Implementing improvements

## Memoisation

A major improvement I introduced was memoisation in the recursive implementation. In the original tutorial, the recursive version recalculates the same Fibonacci numbers repeatedly, which leads to exponential time complexity. To optimise this, I added a simple caching mechanism using an array. When a Fibonacci number is calculated, it's stored in the array. If this same number is needed again, the function retrieves it from the cache instead of recalculating it. This update to the code improves performance dramatically, especially for longer sequences, and gave me a deeper understanding of how dynamic programming techniques like memoisation work in practice.

## Error handling

I enhanced the program's robustness by introducing input validation. The tutorial already included a basic check to ensure the sequence length is greater than or equal to 3, but I expanded on this by checking whether the user actually entered a number (using scanf return values) and by clearing the input buffer in case of invalid input. I also added validation for the method selection, ensuring the user only enters 0 or 1. These improvements prevent crashes and ensure the program behaves as expected regardless of what the user inputs, which is essential for writing safe and user-friendly software.

## Improved variable naming

I renamed the variable `fibN` to `nextFib` in the iterative function. This change makes the purpose of the variable clearer; it's used to hold the next value in the Fibonacci sequence during the loop. Semantic naming like this helps improve readability and maintainability of the code.

## Added some comments

To improve readability, I added comments here and there throughout the code to give a better understanding of what is happening to someone reading my code. Though, I also didn't want to overwhelm the person reading the code with loads of comments, explaining the obvious, so I was deliberate with my comments. An example of when to not comment, in my opinion, is when there is a print that already tells the user what the error is, so to the person reading the code, it will likely be obvious what code surrounding the print does/checks for.

## Improved code

```c
#include <stdio.h>

// Calculates and prints Fibonacci sequence using an iterative approach
int calculateIterativeFibonacci(int length) {
    int a = 0;
    int b = 1;
    int nextFib = 0;

    printf("\nIterative solution\n");

    // Print the first two Fibonacci numbers (0 and 1)
    printf("%d,%d,", a, b);

    // Calculate the rest of the sequence starting from index 2
    for (int i = 2; i < length; i++) {
        nextFib = a + b;
        printf("%d", nextFib);

        a = b;
        b = nextFib;

        if (i != (length-1)) {
            printf(",");
        } else {
            printf("\n");
        }
    }

    return 0;
}

// Memoisation cache for storing previously calculated Fibonacci numbers
int fibCache[50];

// Recursive Fibonacci function with memoisation
int fib(int n) {
    if (n >= 0) {
        // Return cached value if available
        if (fibCache[n] != -1) return fibCache[n];
        else {
            // Otherwise, calculate and cache the value
            fibCache[n] = (fib(n-1) + fib(n-2));
            return fibCache[n];
        }
    }
    else {
        // Handle invalid input
        printf("Error: n must be greater >= 0\n");
        return -1;
    }
}

// Calculates and prints Fibonacci sequence using a recursive approach
int calculateRecursiveFibonacci(int length) {
    printf("\nRecursive solution\n");

    for (int i = 0; i < length; i++) {
        printf("%d", fib(i));

        if (i != (length-1)) {
            printf(",");
        } else {
            printf("\n");
        }
    }

    return 0;
}

int main(void) {
    int length = 0;
    int choice = 0;
    int scanResult = 0;

    // Initialise the entire fibCache array to -1,
    // which indicates uncalculated values since Fibonacci numbers are never negative
    for (int i = 0; i < 50; i++) {
        fibCache[i] = -1;
    }

    // Known base cases for Fibonacci
    fibCache[0] = 0;
    fibCache[1] = 1;

    printf("======================\n");
    printf("The Fibonacci Sequence\n");
    printf("======================\n");

    // Prompt user to enter the sequence length
    do {
        printf("Enter sequence length: ");
        scanResult = scanf("%d", &length);

        if (scanResult == 1) {
            if (length <= 3) {
                printf("Please input a number greater than 3.\n");
            }
        }
        else {
            printf("Error: Invalid input. Please enter a number.\n");
            while (getchar() != '\n');  // Clear input buffer
        }
    } while (length <= 3);

    // Prompt user to choose between iterative or recursive method
    do {
        printf("Select iterative (0) or recursive (1): ");
        scanResult = scanf("%d", &choice);

        if (scanResult == 1) {
            if (choice != 0 && choice != 1) {
                printf("Error: Please enter either 0 or 1.\n");
            }
            else if (choice == 0) {
                calculateIterativeFibonacci(length);
            }
            else if (choice == 1) {
                calculateRecursiveFibonacci(length);
            }
        }
        else {
            printf("Error: Invalid input. Please enter a number.\n");
            while (getchar() != '\n');  // Clear input buffer
        }
    } while (scanResult != 1);

    return 0;
}
```

## View project on GitHub

Feel free to check out the project on GitHub by following the link below.
[View project on GitHub](https://github.com/kyeotsuka/FibonacciSequence)