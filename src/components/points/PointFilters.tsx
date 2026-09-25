import { Input, Select, SegmentedControl } from '@/components/ui';
import { POINT_TYPE_OPTIONS, isPointType } from '@/lib/pointTypes';
import { usePointsStore } from '@/store/usePointsStore';

import type { SegmentedControlOption, SelectOption } from '@/components/ui';
import type { FilterState, SortOrder } from '@/types';
import type { ChangeEvent, ReactElement } from 'react';

const isTypeFilter = (value: string): value is FilterState['type'] => {
  return value === 'all' || isPointType(value);
};

const TYPE_OPTIONS: SelectOption[] = [{ value: 'all', label: 'Усі типи' }, ...POINT_TYPE_OPTIONS];

const SORT_OPTIONS: SegmentedControlOption<SortOrder>[] = [
  { value: 'newest', label: 'Нові' },
  { value: 'oldest', label: 'Старі' },
];

export const PointFilters = (): ReactElement => {
  const type = usePointsStore((state) => state.filters.type);
  const search = usePointsStore((state) => state.filters.search);
  const sort = usePointsStore((state) => state.filters.sort);
  const setFilter = usePointsStore((state) => state.setFilter);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilter('search', event.target.value);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const next = event.target.value;

    if (isTypeFilter(next)) {
      setFilter('type', next);
    }
  };

  const handleSortChange = (value: SortOrder): void => {
    setFilter('sort', value);
  };

  return (
    <div className="flex flex-col gap-2 p-3">
      <Input
        type="search"
        label="Пошук"
        hideLabel
        placeholder="Пошук за описом"
        value={search}
        onChange={handleSearchChange}
      />

      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <Select
            label="Тип точки"
            hideLabel
            options={TYPE_OPTIONS}
            value={type}
            className="w-full"
            onChange={handleTypeChange}
          />
        </div>
        <SegmentedControl<SortOrder>
          value={sort}
          options={SORT_OPTIONS}
          ariaLabel="Сортування за датою"
          onChange={handleSortChange}
        />
      </div>
    </div>
  );
};
