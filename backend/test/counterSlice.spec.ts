import counterReducer, { increment, decrement, incrementByAmount } from '../src/counterSlice';

describe('counter reducer', () => {
  it('should handle increment', () => {
    const initialState = { value: 0 };

    const result = counterReducer(initialState, increment());
    
    expect(result).toEqual({ value: 1 });
  });

  it('should handle decrement', () => {
    const initialState = { value: 5 };

    const result = counterReducer(initialState, decrement());

    expect(result).toEqual({ value: 4 });
  });

  it('should handle incrementByAmount', () => {
    const initialState = { value: 10 };

    const result = counterReducer(initialState, incrementByAmount(3));

    expect(result.value).toBe(initialState.value + 3);
  });

  it('should return initial state when passed an unknown action', () => {
    const initialState = { value: 10 };

    const result = counterReducer(initialState, { type: 'unknown/action' });

    expect(result).toEqual(initialState);
  });
});
