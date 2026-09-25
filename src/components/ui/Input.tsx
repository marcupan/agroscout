import { useId } from 'react';

import type { InputHTMLAttributes, ReactElement } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel?: boolean;
}

export const Input = ({
  label,
  hideLabel = false,
  id,
  className = '',
  ...props
}: InputProps): ReactElement => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className={hideLabel ? 'sr-only' : 'text-sm font-medium text-ink-100'}>
        {label}
      </label>
      <input
        id={inputId}
        className={`h-10 rounded-md border border-shell-600 bg-shell-800 px-3 text-sm text-ink-100 placeholder:text-ink-300 focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    </div>
  );
};
