import { useMemo } from 'react';

import { Button, EmptyState } from '@/components/ui';
import { useFieldsStore } from '@/store/useFieldsStore';
import { useFilteredPoints } from '@/store/useFilteredPoints';
import { usePointsStore } from '@/store/usePointsStore';

import { PointCard } from './PointCard';

import type { MonitoringPoint } from '@/types';
import type { ReactElement } from 'react';

export interface PointListProps {
  fieldId?: string | null;
}

interface PointListEmptyStateProps {
  scopedToField: boolean;
}

const PointListEmptyState = ({ scopedToField }: PointListEmptyStateProps): ReactElement => {
  if (scopedToField) {
    return (
      <div className="p-3">
        <EmptyState
          title="На цьому полі ще немає точок"
          description="Натисніть у межах поля на карті, щоб додати першу точку моніторингу."
        />
      </div>
    );
  }

  return (
    <div className="p-3">
      <EmptyState
        title="Точок ще немає"
        description="Оберіть поле й натисніть у його межах на карті, щоб додати першу точку."
      />
    </div>
  );
};

interface PointListNoMatchesProps {
  onReset: () => void;
}

const PointListNoMatches = ({ onReset }: PointListNoMatchesProps): ReactElement => {
  return (
    <EmptyState
      title="Жодна точка не відповідає фільтрам"
      description="Змініть тип або пошуковий запит — чи скиньте фільтри, щоб побачити всі точки."
    >
      <Button variant="ghost" size="sm" onClick={onReset}>
        Скинути фільтри
      </Button>
    </EmptyState>
  );
};

interface PointListItemsProps {
  points: MonitoringPoint[];
  fieldId: string | null;
  fieldNameById: Map<string, string>;
}

const PointListItems = ({ points, fieldId, fieldNameById }: PointListItemsProps): ReactElement => {
  return (
    <ul className="flex flex-col gap-2">
      {points.map((point) => (
        <PointCard
          key={point.id}
          point={point}
          fieldName={fieldId == null ? fieldNameById.get(point.fieldId) : undefined}
        />
      ))}
    </ul>
  );
};

export const PointList = ({ fieldId = null }: PointListProps): ReactElement => {
  const allPoints = usePointsStore((state) => state.points);
  const resetFilters = usePointsStore((state) => state.resetFilters);
  const filterType = usePointsStore((state) => state.filters.type);
  const filterSearch = usePointsStore((state) => state.filters.search);
  const filterSort = usePointsStore((state) => state.filters.sort);
  const filtered = useFilteredPoints(fieldId);
  const fields = useFieldsStore((state) => state.fields);

  const isFilterActive = filterType !== 'all' || filterSearch !== '' || filterSort !== 'newest';
  const fieldNameById = useMemo(
    () => new Map(fields.map((field) => [field.properties.id, field.properties.name])),
    [fields],
  );
  const total = useMemo(
    () =>
      fieldId != null ? allPoints.filter((point) => point.fieldId === fieldId).length : allPoints.length,
    [allPoints, fieldId],
  );

  if (total === 0) {
    return <PointListEmptyState scopedToField={fieldId != null} />;
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="eyebrow">
          Показано <span className="font-mono text-ink-100">{filtered.length}</span> з{' '}
          <span className="font-mono text-ink-100">{total}</span>
        </p>
        {isFilterActive ? (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Скинути фільтри
          </Button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <PointListNoMatches onReset={resetFilters} />
      ) : (
        <PointListItems points={filtered} fieldId={fieldId} fieldNameById={fieldNameById} />
      )}
    </div>
  );
};
