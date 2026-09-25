import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  children: ReactNode;
}

export const IconButton = ({ className = '', children, ...props }: IconButtonProps): ReactElement => {
  return (
    <button
      type="button"
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-transparent text-ink-300 transition-colors duration-150 hover:bg-shell-700 hover:text-ink-100 focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
