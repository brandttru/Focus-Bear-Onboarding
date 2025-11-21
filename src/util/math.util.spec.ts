import { add } from './math.util';

describe('add()', () => {
  it('should return the sum of two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(add(-4, 10)).toBe(6);
  });
});