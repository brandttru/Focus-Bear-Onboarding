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