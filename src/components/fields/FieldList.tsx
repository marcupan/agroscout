import { useFieldsStore } from '@/store/useFieldsStore';
import { usePointCountsByField } from '@/store/useFilteredPoints';

import { FieldCard } from './FieldCard';

import type { ReactElement } from 'react';

export const FieldList = (): ReactElement => {
  const fields = useFieldsStore((state) => state.fields);
  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);
  const selectField = useFieldsStore((state) => state.selectField);
  const pointCounts = usePointCountsByField();

  return (
    <div className="flex gap-2 overflow-x-auto p-3 lg:grid lg:grid-cols-2 lg:overflow-visible">
      {fields.map((field) => (
        <FieldCard
          key={field.properties.id}
          field={field}
          selected={field.properties.id === selectedFieldId}
          onSelect={selectField}
          pointCount={pointCounts[field.properties.id] ?? 0}
          className="w-56 shrink-0 lg:w-full lg:shrink"
        />
      ))}
    </div>
  );
};
