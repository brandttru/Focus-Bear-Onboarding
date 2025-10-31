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
Using the same example from before
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

# Writing Small, Focused Functions
### Find an example of a long, complex function in an existing codebase (or write your own).
Generated using ChatGPT
```
def process_orders(orders, inventory, discount_codes, shipping_rates):
    total_revenue = 0
    shipped_orders = []
    for order in orders:
        order_total = 0
        for item in order['items']:
            if item['id'] in inventory and inventory[item['id']] > 0:
                price = item['price']
                quantity = item['quantity']
                if item['id'] in discount_codes:
                    price *= 0.9  # apply discount
                if quantity > inventory[item['id']]:
                    quantity = inventory[item['id']]
                inventory[item['id']] -= quantity
                order_total += price * quantity
            else:
                print(f"Item {item['id']} is out of stock")
        if order_total > 100:
            shipping_cost = 0
        else:
            shipping_cost = shipping_rates.get(order['region'], 10)
        order_total += shipping_cost
        total_revenue += order_total
        if order_total > 0:
            shipped_orders.append({
                'order_id': order['id'],
                'total': order_total,
                'items': order['items'],
                'shipping': shipping_cost
            })
    print(f"Processed {len(shipped_orders)} orders, total revenue: {total_revenue}")
    return shipped_orders, total_revenue
```

### Refactor it into multiple smaller functions with clear responsibilities.
```
def apply_discount(item, discount_codes):
    """Calculate price after discount if applicable."""
    price = item['price']
    if item['id'] in discount_codes:
        price *= 0.9  # 10% discount
    return price

def adjust_quantity(item, inventory):
    """Ensure the quantity does not exceed inventory and update stock."""
    available = inventory.get(item['id'], 0)
    quantity = min(item['quantity'], available)
    inventory[item['id']] = available - quantity
    return quantity

def calculate_order_total(order, inventory, discount_codes):
    """Calculate total cost of items in the order."""
    total = 0
    for item in order['items']:
        if inventory.get(item['id'], 0) > 0:
            price = apply_discount(item, discount_codes)
            quantity = adjust_quantity(item, inventory)
            total += price * quantity
        else:
            print(f"Item {item['id']} is out of stock")
    return total

def calculate_shipping(order_total, region, shipping_rates):
    """Determine shipping cost based on total and region."""
    if order_total > 100:
        return 0
    return shipping_rates.get(region, 10)

def process_orders(orders, inventory, discount_codes, shipping_rates):
    """Process a list of orders and return shipped orders with total revenue."""
    total_revenue = 0
    shipped_orders = []

    for order in orders:
        order_total = calculate_order_total(order, inventory, discount_codes)
        shipping_cost = calculate_shipping(order_total, order['region'], shipping_rates)
        order_total += shipping_cost
        total_revenue += order_total

        if order_total > 0:
            shipped_orders.append({
                'order_id': order['id'],
                'total': order_total,
                'items': order['items'],
                'shipping': shipping_cost
            })

    print(f"Processed {len(shipped_orders)} orders, total revenue: {total_revenue}")
    return shipped_orders, total_revenue
```

### Why is breaking down functions beneficial?
Breaking down functions is good because:
- It is easier to read
- Easier to make changes to smaller individual functions than one huge one
- Smaller functions can be tested
- Small functions can be reused in other parts of code

### How did refactoring improve the structure of the code?
It made the function overall have less responsiblity, insteading breaking it up into difference sections that can then be reused in other parts of code. It also made it easier to read and maintain as well. At first I had no idea what exactly was happening in process_orders, but once it was broken up I understood what steps were needed to process an order. This is great for collaboration as you want other people to be able to quickly understand your code and get working on it.

# Avoiding Code Duplication
### Research the "Don't Repeat Yourself" (DRY) principle.
DRY refers to the expectation that you minimise copying code throughout a codebase. It ensures that code is cleaner, simplier to read and more flexible in terms of extension.

### Example of DRY code
Generated using ChatGPT
```
# Calculate area of rectangles
length1, width1 = 5, 10
area1 = length1 * width1
print(f"Area 1: {area1}")

length2, width2 = 7, 3
area2 = length2 * width2
print(f"Area 2: {area2}")

length3, width3 = 2, 8
area3 = length3 * width3
print(f"Area 3: {area3}")
```

### What were the issues with duplicated code?
The reason why this code violates DRY is that it copy and pastes the same code while only making minimal changes. This can be problematic as if I wanted to calculate areas of other rectangles I would have to copy and paste again. This is inefficient and will take up more space than necessary.

### How did refactoring improve maintainability?
```
def rectangle_area(length, width):
    return length * width

areas = [
    rectangle_area(5, 10),
    rectangle_area(7, 3),
    rectangle_area(2, 8)
]

for i, area in enumerate(areas, start=1):
    print(f"Area {i}: {area}")
```

The refractored version is a lot more maintainable because it now uses a function meaning that it is open to extension. It being open to extension means that it is easier to maintain and use in future. It will also be easier to debug, since if there were an issue with the original code you would have to go back and fix all instances of the copied code. Instead, by having one instance of the code bug fixes only need to be made once.