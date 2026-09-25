import type { ButtonHTMLAttributes, ReactElement } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-signal-400 text-shell-900 hover:bg-signal-400/90 border border-transparent',
  secondary: 'bg-shell-700 text-ink-100 hover:bg-shell-600 border border-shell-600',
  ghost: 'bg-transparent text-ink-100 hover:bg-shell-700 border border-transparent',
  danger: 'bg-transparent text-danger hover:bg-danger/10 border border-danger/40',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
};

export const Button = ({
  variant = 'secondary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps): ReactElement => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-sans font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    />
  );
};
