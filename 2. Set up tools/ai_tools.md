# Set Up AI Tools for Development

### Generate code snippets and analyze how useful they are.
Python Calculator

This is a simple Python calculator that can perform basic arithmetic operations: addition, subtraction, multiplication, and division.

Code

```python
def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "Error! Division by zero."
    return x / y

def calculator():
    print("Select operation:")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")

    choice = input("Enter choice (1/2/3/4): ")

    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))

    if choice == '1':
        print(f"{num1} + {num2} = {add(num1, num2)}")
    elif choice == '2':
        print(f"{num1} - {num2} = {subtract(num1, num2)}")
    elif choice == '3':
        print(f"{num1} * {num2} = {multiply(num1, num2)}")
    elif choice == '4':
        print(f"{num1} / {num2} = {divide(num1, num2)}")
    else:
        print("Invalid input")

if __name__ == "__main__":
    calculator()
```

Usage

1. Run the script.
2. Follow the prompts to select an operation and enter numbers.

Requirements

- Python 3.x


Overall I think this is a good example of AI generated code, its simple and easy enough for someone who has no coding knowledge to generate something they can use.

### Use AI for debugging a simple problem.
To address the issue of the BFS (Breadth-First Search) stopping too early, you may need to ensure that all nodes are being visited correctly and that the queue is being managed properly. However, since the provided code does not include a BFS implementation, please provide the relevant BFS code section for further assistance.

### Ask AI for explanations on a new concept you're learning.
Sports betting is wagering money on the outcome or events within athletic competitions; bettors place stakes on options such as picking a winner (moneyline), covering a point spread, totals (over/under), or specific events (prop bets). Bookmakers set odds that reflect the implied probability and determine potential payouts, and those odds can change with market action. While some bettors use analysis and strategy, sports betting carries financial risk and is subject to legal and regulatory rules, so responsible bankroll management and awareness of local laws are important.

## Reflection
### Which AI tools did you try?
I used GitHub Copilot in VS Code to generate code in the file. I also used Claude to compare results.

### What worked well? What didn’t?
When I told Copilot "my bfs is stopping too early" it could not proceed unless I gave it the code. But when I used the same prompt in Claude, I needed to be more specific with what I was asking about. I assume this is because Copilot being a VS Code extension means it already knows I'm asking about code. Once I specified I received a wider range of suggestions:
```
Got it! If your BFS is stopping too early, here are the most common causes:
1. Missing nodes in your visited set

Make sure you're marking nodes as visited when you add them to the queue, not when you dequeue them
If you mark as visited too late, you might stop before exploring everything

2. Wrong termination condition

Are you returning/breaking as soon as you find a target instead of exploring all reachable nodes?
BFS should only stop when the queue is empty (unless you specifically want to stop early)

3. Graph connectivity issues

Your graph might have disconnected components - BFS only explores nodes reachable from the starting point
If you need to visit ALL nodes, you might need to run BFS from multiple starting points

4. Edge cases in your graph structure

Self-loops or bidirectional edges not handled properly
Missing neighbors in your adjacency list

Could you share your code? That would help me pinpoint exactly what's going on. Or let me know:

What should BFS be doing in your case?
What's it doing instead (how early is it stopping)?
```

Overall AI worked better when I was more specific and didn't work well when I entered in prompts assuming that it knew what I was talking about.

### When do you think AI is most useful for coding?
AI is most useful when smaller and simpler snippets are inquired. Copy and pasting large chunks and code that is dependent on multiple files is harder get results with due to the number of interactions between components. 