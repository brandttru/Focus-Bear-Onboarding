# Identifying & Fixing Code Smells
### Magic Numbers & Strings
```
if user_age > 18:  # What does 18 mean?
```
Fix: Use named variables
```
MINIMUM_AGE = 18
if user_age > MINIMUM_AGE:
```

### Long Functions
```
def process_order(order):
    validate_order(order)
    apply_discount(order)
    update_inventory(order)
    send_email(order)
    log_transaction(order)
    # Function keeps growing...
```
Fix: Split function up into other smaller functions
```
def process_order(order):
    validate_order(order)
    apply_discount(order)
    finalize_order(order)

def finalize_order(order):
    update_inventory(order)
    send_email(order)
    log_transaction(order)
```

### Duplicate Code
```
if user_type == "admin":
    print("Welcome, admin!")
elif user_type == "member":
    print("Welcome, member!")
```
Fix: Use functions
```
def greet_user(user_type):
    print(f"Welcome, {user_type}!")

greet_user("admin")
greet_user("member")
```

### Large Classes (God Objects)
```
class AppManager:
    def handle_user_login(self): ...
    def send_email(self): ...
    def process_payment(self): ...
    def log_error(self): ...
```
Fix: Create different classes for different responsibilities
```
class UserManager:
    def handle_login(self): ...

class EmailService:
    def send_email(self): ...

class PaymentProcessor:
    def process_payment(self): ...
```

### Deeply Nested Conditionals
```
if user:
    if user.is_active:
        if user.has_permission("admin"):
            print("Access granted")
```
Fix: Use guard clauses
```
if not user or not user.is_active or not user.has_permission("admin"):
    return

print("Access granted")
```

### Commented-Out Code
```
# def old_login():
#     print("Legacy login method")
# old_login()

def new_login():
    print("New secure login")
```
Fix: Delete unused code
```
def new_login():
    print("New secure login")
```

### Inconsistent Naming
```
def calc(u, p):
    return u * p
```
Fix: Use consistent and meaningful names
```
def calculate_total_cost(unit_price, quantity):
    return unit_price * quantity
```

### How did refactoring improve the readability and maintainability of the code?
Removing code smells helps code uphold design principles, thus helping improve readability and maintainability. For example, refactoring large classes upholds the Single Responsibility Principle, which reduces the size of classes as well as simplifying the class and making it easier to read and maintain. Additionally, with smells such as inconsistent naming and magic numbers/strings, refactoring those improves clarity of the code, thus improving readability. Maintainability is also improved when refactoring long functions and duplicate code as it improves extensibility. As a result, it will be easier to maintain in the future.

### How can avoiding code smells make future debugging easier?
With improved readability and maintainability, it will be easier to spot errors in the code and refactor it. As well, changes made are less likely to affect other areas of code, and future developers are able to understand the intent of the code.