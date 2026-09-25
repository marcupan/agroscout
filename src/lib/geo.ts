import type { Field, LatLng } from '@/types';
import type { FeatureCollection, Polygon, Position } from 'geojson';

export const isPointInRing = (point: LatLng, ring: Position[]): boolean => {
  const { lat: y, lng: x } = point;
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];

    const crosses = yi > y !== yj > y;

    if (!crosses) {
      continue;
    }

    const xIntersect = ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (x < xIntersect) {
      inside = !inside;
    }
  }

  return inside;
};

export const isPointInPolygon = (point: LatLng, polygon: Polygon): boolean => {
  const [outer, ...holes] = polygon.coordinates;

  if (!isPointInRing(point, outer)) {
    return false;
  }

  return holes.every((hole) => !isPointInRing(point, hole));
};

export const isPointInField = (point: LatLng, field: Field): boolean =>
  isPointInPolygon(point, field.geometry);

const ringBounds = (ring: Position[]): [[number, number], [number, number]] => {
  let south = Infinity;
  let west = Infinity;
  let north = -Infinity;
  let east = -Infinity;

  for (const pos of ring) {
    const [lng, lat] = pos;

    if (lat < south) {
      south = lat;
    }

    if (lat > north) {
      north = lat;
    }

    if (lng < west) {
      west = lng;
    }

    if (lng > east) {
      east = lng;
    }
  }

  return [
    [south, west],
    [north, east],
  ];
};

export const getFieldBounds = (field: Field): [[number, number], [number, number]] => {
  const outer = field.geometry.coordinates[0] ?? [];

  return ringBounds(outer);
};

export const getFeatureCollectionBounds = (
  fc: FeatureCollection<Polygon, unknown>,
): [[number, number], [number, number]] => {
  let south = Infinity;
  let west = Infinity;
  let north = -Infinity;
  let east = -Infinity;

  for (const feature of fc.features) {
    const outer = feature.geometry.coordinates[0] ?? [];
    const [[featureSouth, featureWest], [featureNorth, featureEast]] = ringBounds(outer);

    if (featureSouth < south) {
      south = featureSouth;
    }

    if (featureWest < west) {
      west = featureWest;
    }

    if (featureNorth > north) {
      north = featureNorth;
    }

    if (featureEast > east) {
      east = featureEast;
    }
  }

  return [
    [south, west],
    [north, east],
  ];
};
