import { describe, expect, it } from 'vitest';

import { readPersistedPoints } from './persistedPoints';

const valid = {
  id: 'p-1',
  fieldId: 'field-1',
  lat: 50.29,
  lng: 30.888,
  type: 'pest',
  description: 'Попелиця',
  createdAt: '2026-09-20T08:10:00.000Z',
};

describe('readPersistedPoints', () => {
  it('keeps well-formed points', () => {
    expect(readPersistedPoints({ points: [valid] })).toEqual([valid]);
  });

  it('returns an empty list when the payload has the wrong shape', () => {
    expect(readPersistedPoints(undefined)).toEqual([]);
    expect(readPersistedPoints(null)).toEqual([]);
    expect(readPersistedPoints('oops')).toEqual([]);
    expect(readPersistedPoints({ points: 'oops' })).toEqual([]);
  });

  it('drops only the corrupt entries', () => {
    const corrupt = [
      { ...valid, id: 'bad-type', type: 'weeds' },
      { ...valid, id: 'bad-lat', lat: Number.NaN },
      { ...valid, id: 'out-of-range', lng: 181 },
      { ...valid, id: 'bad-date', createdAt: 'yesterday' },
      { ...valid, id: 'no-description', description: undefined },
      'not-an-object',
    ];

    expect(readPersistedPoints({ points: [valid, ...corrupt] })).toEqual([valid]);
  });
});
