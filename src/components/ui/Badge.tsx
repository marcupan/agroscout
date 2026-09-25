import type { ReactElement, ReactNode } from 'react';

export interface BadgeProps {
  color?: string;
  children: ReactNode;
}

export const Badge = ({ color, children }: BadgeProps): ReactElement => {
  const dotStyle = { backgroundColor: color };

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-shell-600 bg-shell-700 px-2.5 py-1 text-xs font-medium text-ink-100">
      {color ? <span className="h-2 w-2 shrink-0 rounded-full" style={dotStyle} aria-hidden="true" /> : null}
      {children}
    </span>
  );
};
