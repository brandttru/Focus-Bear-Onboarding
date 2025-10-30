# Understanding Clean Code Principles
### Research and summarize the following clean code principles
Simplicty
- Code should be as simple as possible
- Makes it easier to understand, debug and maintain

Readability
- Code should be easy to read and understand
- Improves collaboration and reduces mistakes

Maintainability
- Code be easy to extend and modify in the future
- Ensures long term project growth and reduces technical debt

Consistency
- Follow established standards and conventions
- Consistent code is easier to maintain and understand

Efficiency
- Code should be optimized as much as possible and not be complicated
- Ensures better performance and resource usage

### Find an example of messy code online (or write one yourself) and describe why it's difficult to read.
Generated using ChatGPT
```
def x(a, b):
    if a > b:
        return a - b
    else:
        return b - a

y = x(10, 3)
print(y)
```

A few reasons why this is bad is:
- Bad variable names
    - Variable names should have meaning
- Unnecessary if else statement
    - The if else statement can be simplified

### Rewrite the code in a cleaner, more structured way.
```
def difference(num1, num2):
    return abs(num1 - num2)

result = difference(10, 3)
print(result)
```

# Naming Variables & Functions
### Find examples of unclear variable names in an existing codebase (or write your own).
Using the same example from beofre
```
def x(a, b):
    if a > b:
        return a - b
    else:
        return b - a

y = x(10, 3)
print(y)
```

### Refactor the code by renaming variables/functions for better clarity.
```
def difference(num1, num2):
    if num1 > num2:
        return num1 - num2
    else:
        return num2 - num1

result = difference(10, 3)
print(result)
```

### What makes a good variable or function name?
A good variable is one that is easy to understand by anyone, not just the person working on it. It also makes it clear what it represents. In the previous example the function is used to find the difference between two numbers. "x" does not tell me what its supposed to do, whereas "difference" tells me it finds the difference between two numbers.

### What issues can arise from poorly named variables?
When working with large code bases, it can be hard to keep track of variables as they are constantly changing throughout the code. Without meaningful names, it can be very hard to debug. For example you might see that variable "h" is returning null, but what is "h"? Having proper names removes this issue entirely.

### How did refactoring improve code readability?
Refactoring made it easier to read and keep track of whats happening in the code. In the original code, it is hard to initially figure out what the function was trying to do as well as what was happening with the parameters. Refactoring made it easier for me understand what was the original intention and keep track of what was happening to the parameters throughout the function.