import { describe, expect, it } from 'vitest';

import { formatHectares, formatPointCount } from './format';

describe('formatHectares', () => {
  it('formats with a comma decimal separator and one fraction digit', () => {
    expect(formatHectares(97.7)).toBe('97,7 га');
  });

  it('always shows one fraction digit, even for whole numbers', () => {
    expect(formatHectares(12)).toBe('12,0 га');
  });

  it('rounds to one fraction digit', () => {
    expect(formatHectares(3.14)).toBe('3,1 га');
  });
});

describe('formatPointCount', () => {
  it.each([
    [0, '0 точок'],
    [1, '1 точка'],
    [2, '2 точки'],
    [5, '5 точок'],
    [11, '11 точок'],
    [21, '21 точка'],
    [22, '22 точки'],
  ])('formats %i as %s', (count, expected) => {
    expect(formatPointCount(count)).toBe(expected);
  });
});
