import { describe, expect, it } from 'vitest';

import { getFeatureCollectionBounds, getFieldBounds, isPointInField, isPointInPolygon } from './geo';

import type { Field, LatLng } from '@/types';

const square: Field = {
  type: 'Feature',
  id: 'field-test',
  properties: { id: 'field-test', name: 'Тестове поле', area: 25, crop: 'Пшениця' },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [30.0, 50.0],
        [30.01, 50.0],
        [30.01, 50.01],
        [30.0, 50.01],
        [30.0, 50.0],
      ],
    ],
  },
};

const squareWithHole: Field = {
  type: 'Feature',
  id: 'field-hole',
  properties: { id: 'field-hole', name: 'Поле з дірою', area: 20, crop: 'Кукурудза' },
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [30.0, 50.0],
        [30.01, 50.0],
        [30.01, 50.01],
        [30.0, 50.01],
        [30.0, 50.0],
      ],
      [
        [30.004, 50.004],
        [30.006, 50.004],
        [30.006, 50.006],
        [30.004, 50.006],
        [30.004, 50.004],
      ],
    ],
  },
};

describe('isPointInField', () => {
  it('accepts a point clearly inside', () => {
    const point: LatLng = { lat: 50.005, lng: 30.005 };

    expect(isPointInField(point, square)).toBe(true);
  });

  it('rejects a point clearly outside', () => {
    const point: LatLng = { lat: 50.02, lng: 30.02 };

    expect(isPointInField(point, square)).toBe(false);
  });

  it('rejects a point outside the bounding box entirely', () => {
    const point: LatLng = { lat: 51.5, lng: 32.0 };

    expect(isPointInField(point, square)).toBe(false);
  });

  it('handles a point near the boundary consistently with ray casting', () => {
    const point: LatLng = { lat: 50.005, lng: 30.0001 };

    expect(isPointInField(point, square)).toBe(true);
  });

  it('treats a point outside the polygon bounds as outside regardless of ring orientation', () => {
    const point: LatLng = { lat: 49.5, lng: 30.005 };

    expect(isPointInField(point, square)).toBe(false);
  });
});

describe('isPointInPolygon with holes', () => {
  it('is inside when inside the outer ring and outside the hole', () => {
    expect(isPointInPolygon({ lat: 50.002, lng: 30.002 }, squareWithHole.geometry)).toBe(true);
  });

  it('is outside when inside the hole', () => {
    expect(isPointInPolygon({ lat: 50.005, lng: 30.005 }, squareWithHole.geometry)).toBe(false);
  });

  it('is outside when outside the outer ring', () => {
    expect(isPointInPolygon({ lat: 50.02, lng: 30.02 }, squareWithHole.geometry)).toBe(false);
  });
});

describe('getFieldBounds', () => {
  it('returns Leaflet-style [[south, west], [north, east]]', () => {
    const bounds = getFieldBounds(square);

    expect(bounds).toEqual([
      [50.0, 30.0],
      [50.01, 30.01],
    ]);
  });
});

describe('getFeatureCollectionBounds', () => {
  it('unions bounds across multiple features', () => {
    const bounds = getFeatureCollectionBounds({
      type: 'FeatureCollection',
      features: [square, squareWithHole],
    });

    expect(bounds).toEqual([
      [50.0, 30.0],
      [50.01, 30.01],
    ]);
  });
});
