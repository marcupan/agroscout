import { POINT_TYPES } from '@/types';

import type { PointType } from '@/types';

export const POINT_TYPE_LABEL: Record<PointType, string> = {
  soil_sample: 'Проба ґрунту',
  pest: 'Шкідники',
  disease: 'Хвороби рослин',
  other: 'Інше',
};

export const POINT_TYPE_COLOR: Record<PointType, string> = {
  soil_sample: 'var(--color-type-soil)',
  pest: 'var(--color-type-pest)',
  disease: 'var(--color-type-disease)',
  other: 'var(--color-type-other)',
};

export const POINT_TYPE_GLYPH: Record<PointType, string> = {
  soil_sample:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3 L19.79 16.5 L4.21 16.5 Z" fill="currentColor"/></svg>',
  pest: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor"/></svg>',
  disease:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12 L16.5 4.21 L7.5 4.21 L3 12 L7.5 19.79 L16.5 19.79 Z" fill="currentColor"/></svg>',
  other:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3 L21 12 L12 21 L3 12 Z" fill="currentColor"/></svg>',
};

export const POINT_TYPE_OPTIONS: { value: PointType; label: string }[] = POINT_TYPES.map((value) => ({
  value,
  label: POINT_TYPE_LABEL[value],
}));

export const isPointType = (value: unknown): value is PointType =>
  typeof value === 'string' && (POINT_TYPES as readonly string[]).includes(value);
