import { useDeferredValue, useMemo } from 'react';

import { usePointsStore } from './usePointsStore';

import type { MonitoringPoint } from '@/types';

export const useFilteredPoints = (fieldId?: string | null): MonitoringPoint[] => {
  const points = usePointsStore((state) => state.points);
  const type = usePointsStore((state) => state.filters.type);
  const search = usePointsStore((state) => state.filters.search);
  const sort = usePointsStore((state) => state.filters.sort);
  const deferredSearch = useDeferredValue(search);

  return useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    const filtered = points.filter((point) => {
      if (fieldId != null && point.fieldId !== fieldId) {
        return false;
      }

      if (type !== 'all' && point.type !== type) {
        return false;
      }

      if (query.length === 0) {
        return true;
      }

      return point.description.toLowerCase().includes(query);
    });

    return filtered.sort((a, b) => {
      const diff = Date.parse(a.createdAt) - Date.parse(b.createdAt);

      return sort === 'newest' ? -diff : diff;
    });
  }, [points, type, deferredSearch, sort, fieldId]);
};

export const usePointCountsByField = (): Record<string, number> => {
  const points = usePointsStore((state) => state.points);

  return useMemo(() => {
    const counts: Record<string, number> = {};

    for (const point of points) {
      counts[point.fieldId] = (counts[point.fieldId] ?? 0) + 1;
    }

    return counts;
  }, [points]);
};
