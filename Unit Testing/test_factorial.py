import pytest
from factorial import factorial

# Generated using ChatGPT

def test_factorial_basic():
    assert factorial(0) == 1
    assert factorial(1) == 1
    assert factorial(5) == 120
    assert factorial(7) == 5040

def test_factorial_large_number():
    assert factorial(10) == 3628800

def test_factorial_invalid_type():
    with pytest.raises(ValueError, match="Input must be an integer."):
        factorial(5.5)

def test_factorial_negative_input():
    with pytest.raises(ValueError, match="Input must be non-negative."):
        factorial(-3)
