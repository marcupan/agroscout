import { describe, expect, it } from 'vitest';

import { formatLatLng, formatMgrs, splitMgrs, toMgrs } from './mgrs';

import type { LatLng } from '@/types';

const kyiv: LatLng = { lat: 50.4501, lng: 30.5238 };

describe('toMgrs', () => {
  it('converts a known Kyiv coordinate to a plausible zone-36U MGRS string', () => {
    const result = toMgrs(kyiv);

    expect(result).not.toBeNull();
    expect(result).toMatch(/^36U/);
  });

  it('returns null instead of throwing on invalid input', () => {
    expect(toMgrs({ lat: 190, lng: 30.5 })).toBeNull();
  });
});

describe('splitMgrs', () => {
  it('parses a full MGRS string into zone / square / easting / northing', () => {
    const mgrs = toMgrs(kyiv);

    if (mgrs === null) {
      throw new Error('toMgrs returned null for a coordinate known to be inside UTM zone 36U');
    }

    const segments = splitMgrs(mgrs);

    expect(segments).not.toBeNull();
    expect(segments?.zone).toBe('36U');
    expect(segments?.square).toBe('UA');
    expect(segments?.easting).toHaveLength(5);
    expect(segments?.northing).toHaveLength(5);
  });

  it('returns null for malformed input', () => {
    expect(splitMgrs('not-an-mgrs-string')).toBeNull();
    expect(splitMgrs('')).toBeNull();
    expect(splitMgrs('36U')).toBeNull();
  });
});

describe('formatLatLng', () => {
  it('formats lat/lng with fixed digits', () => {
    expect(formatLatLng({ lat: 50.4521, lng: 30.5288 })).toBe('50.45210, 30.52880');
  });
});

describe('formatMgrs', () => {
  it('formats a valid MGRS value into standard spaced notation', () => {
    const mgrs = toMgrs(kyiv);

    if (mgrs === null) {
      throw new Error('toMgrs returned null for a coordinate known to be inside UTM zone 36U');
    }

    const segments = splitMgrs(mgrs);

    if (!segments) {
      throw new Error('splitMgrs returned null for a value known to be splittable');
    }

    expect(formatMgrs(mgrs)).toBe(
      `${segments.zone} ${segments.square} ${segments.easting} ${segments.northing}`,
    );
  });

  it('falls back to the raw value when it cannot be split', () => {
    expect(formatMgrs('not-an-mgrs-string')).toBe('not-an-mgrs-string');
  });
});
