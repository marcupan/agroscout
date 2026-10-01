import { useId } from 'react';

import type { ReactElement } from 'react';

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SegmentedControlOption<T>[];
  ariaLabel: string;
}

interface SegmentedOptionProps<T extends string> {
  option: SegmentedControlOption<T>;
  name: string;
  selected: boolean;
  onSelect: (value: T) => void;
}

const SegmentedOption = <T extends string>({
  option,
  name,
  selected,
  onSelect,
}: SegmentedOptionProps<T>): ReactElement => {
  const handleChange = (): void => {
    onSelect(option.value);
  };

  return (
    <label className="cursor-pointer rounded px-3 py-1.5 text-sm font-medium text-ink-300 transition-colors duration-150 not-has-checked:hover:text-ink-100 has-checked:bg-signal-400 has-checked:text-shell-900 has-focus-visible:ring-2 has-focus-visible:ring-signal-400">
      <input
        type="radio"
        name={name}
        value={option.value}
        checked={selected}
        className="sr-only"
        onChange={handleChange}
      />
      {option.label}
    </label>
  );
};

export const SegmentedControl = <T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
}: SegmentedControlProps<T>): ReactElement => {
  const name = useId();

  return (
    <fieldset className="inline-flex rounded-md border border-shell-600 bg-shell-800 p-1">
      <legend className="sr-only">{ariaLabel}</legend>
      {options.map((option) => (
        <SegmentedOption
          key={option.value}
          option={option}
          name={name}
          selected={option.value === value}
          onSelect={onChange}
        />
      ))}
    </fieldset>
  );
};
