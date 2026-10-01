import { useId, useState } from 'react';

import type { ChangeEvent, ReactElement, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

const computeInitialLength = (value: unknown, defaultValue: unknown): number => {
  if (typeof value === 'string') {
    return value.length;
  }

  if (typeof defaultValue === 'string') {
    return defaultValue.length;
  }

  return 0;
};

export const Textarea = ({
  label,
  hint,
  id,
  className = '',
  maxLength,
  defaultValue,
  value,
  onChange,
  ...props
}: TextareaProps): ReactElement => {
  const [length, setLength] = useState<number>(() => computeInitialLength(value, defaultValue));

  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const hintId = `${textareaId}-hint`;
  const counterId = `${textareaId}-counter`;
  const describedBy = [hint ? hintId : null, maxLength ? counterId : null].filter(Boolean).join(' ');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setLength(event.target.value.length);
    onChange?.(event);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor={textareaId} className="text-sm font-medium text-ink-100">
          {label}
        </label>
        {maxLength ? (
          <span id={counterId} className="font-mono text-xs text-ink-300">
            {length}/{maxLength}
          </span>
        ) : null}
      </div>
      <textarea
        id={textareaId}
        aria-describedby={describedBy || undefined}
        maxLength={maxLength}
        defaultValue={defaultValue}
        value={value}
        className={`min-h-24 resize-y rounded-md border border-shell-600 bg-shell-800 px-3 py-2 text-sm text-ink-100 focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        onChange={handleChange}
        {...props}
      />
      {hint ? (
        <p id={hintId} className="text-sm text-ink-300">
          {hint}
        </p>
      ) : null}
    </div>
  );
};
