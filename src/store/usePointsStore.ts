import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { readPersistedPoints } from '@/lib/persistedPoints';

import type { FilterState, MonitoringPoint } from '@/types';

const generateId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `pt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
};

const DEFAULT_FILTERS: FilterState = {
  type: 'all',
  search: '',
  sort: 'newest',
};

interface PointsState {
  points: MonitoringPoint[];
  filters: FilterState;
  addPoint: (input: Omit<MonitoringPoint, 'id' | 'createdAt'>) => MonitoringPoint;
  removePoint: (id: string) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
}

interface PersistedPointsState {
  points: MonitoringPoint[];
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set) => ({
      points: [],
      filters: DEFAULT_FILTERS,
      addPoint: (input) => {
        const point: MonitoringPoint = {
          ...input,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };

        set((state) => ({ points: [...state.points, point] }));

        return point;
      },
      removePoint: (id) => set((state) => ({ points: state.points.filter((point) => point.id !== id) })),
      setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
      resetFilters: () => set({ filters: DEFAULT_FILTERS }),
    }),
    {
      name: 'agroscout-points',
      storage: createJSONStorage(() => localStorage),
      partialize: (state): PersistedPointsState => ({ points: state.points }),
      merge: (persisted, current) => ({ ...current, points: readPersistedPoints(persisted) }),
    },
  ),
);
