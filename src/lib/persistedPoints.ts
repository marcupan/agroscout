import { isPointType } from './pointTypes';

import type { MonitoringPoint } from '@/types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

export const isMonitoringPoint = (value: unknown): value is MonitoringPoint => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.fieldId === 'string' &&
    isFiniteNumber(value.lat) &&
    Math.abs(value.lat) <= 90 &&
    isFiniteNumber(value.lng) &&
    Math.abs(value.lng) <= 180 &&
    isPointType(value.type) &&
    typeof value.description === 'string' &&
    typeof value.createdAt === 'string' &&
    !Number.isNaN(Date.parse(value.createdAt))
  );
};

export const readPersistedPoints = (persisted: unknown): MonitoringPoint[] => {
  if (!isRecord(persisted) || !Array.isArray(persisted.points)) {
    return [];
  }

  return persisted.points.filter(isMonitoringPoint);
};
