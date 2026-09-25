import { useId } from 'react';

import type { ReactElement, SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
  label: string;
  options: SelectOption[];
  hideLabel?: boolean;
}

export const Select = ({
  label,
  options,
  hideLabel = false,
  placeholder,
  id,
  className = '',
  ...props
}: SelectProps): ReactElement => {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className={hideLabel ? 'sr-only' : 'text-sm font-medium text-ink-100'}>
        {label}
      </label>
      <select
        id={selectId}
        className={`h-10 rounded-md border border-shell-600 bg-shell-800 px-3 text-sm text-ink-100 focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled className="bg-shell-700 text-ink-300">
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-shell-700 text-ink-100">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
