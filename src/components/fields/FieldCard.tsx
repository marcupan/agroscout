import { formatHectares, formatPointCount } from '@/lib/format';

import type { Field } from '@/types';
import type { ReactElement } from 'react';

export interface FieldCardProps {
  field: Field;
  selected: boolean;
  onSelect: (id: string) => void;
  pointCount: number;
  className?: string;
}

export const FieldCard = ({
  field,
  selected,
  onSelect,
  pointCount,
  className = '',
}: FieldCardProps): ReactElement => {
  const { id, name, area } = field.properties;

  const handleSelect = (): void => {
    onSelect(id);
  };

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`relative flex flex-col justify-center gap-0.5 overflow-hidden rounded-md border px-3.5 py-2 text-left transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:outline-none ${selected ? 'border-signal-400 bg-signal-400/10' : 'border-shell-600 bg-shell-800 hover:bg-shell-700'} ${className}`}
      onClick={handleSelect}
    >
      {selected ? <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-signal-400" /> : null}

      <span className="truncate text-sm font-semibold text-ink-100" title={name}>
        {name}
      </span>
      <span className="font-mono text-xs text-ink-300">
        {formatHectares(area)} · {formatPointCount(pointCount)}
      </span>
    </button>
  );
};
