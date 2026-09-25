import { forward } from 'mgrs';

import type { LatLng } from '@/types';

export const toMgrs = (point: LatLng, accuracy = 5): string | null => {
  try {
    return forward([point.lng, point.lat], accuracy);
  } catch {
    return null;
  }
};

export interface MgrsSegments {
  zone: string;
  square: string;
  easting: string;
  northing: string;
}

const MGRS_PATTERN = /^(\d{1,2}[C-HJ-NP-X])([A-HJ-NP-Z]{2})(\d+)$/;

export const splitMgrs = (value: string): MgrsSegments | null => {
  const match = MGRS_PATTERN.exec(value.trim().toUpperCase());

  if (!match) {
    return null;
  }

  const [, zone, square, digits] = match;

  if (!zone || !square || !digits || digits.length % 2 !== 0) {
    return null;
  }

  const half = digits.length / 2;

  return {
    zone,
    square,
    easting: digits.slice(0, half),
    northing: digits.slice(half),
  };
};

export const formatLatLng = (point: LatLng, digits = 5): string =>
  `${point.lat.toFixed(digits)}, ${point.lng.toFixed(digits)}`;

export const formatMgrs = (value: string): string => {
  const segments = splitMgrs(value);

  if (!segments) {
    return value;
  }

  return `${segments.zone} ${segments.square} ${segments.easting} ${segments.northing}`;
};
