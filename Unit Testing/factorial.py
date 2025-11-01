# Generated with ChatGPT

def factorial(n: int) -> int:
    """
    Calculate the factorial of a non-negative integer n.

    Args:
        n (int): A non-negative integer.

    Returns:
        int: The factorial of n.

    Raises:
        ValueError: If n is negative or not an integer.
    """
    if not isinstance(n, int):
        raise ValueError("Input must be an integer.")
    if n < 0:
        raise ValueError("Input must be non-negative.")
    if n in (0, 1):
        return 1
    
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
