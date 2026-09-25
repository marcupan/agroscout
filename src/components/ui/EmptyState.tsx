import type { ReactElement, ReactNode } from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export const EmptyState = ({ title, description, children }: EmptyStateProps): ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-10 text-center">
      <p className="text-base font-semibold text-ink-100">{title}</p>
      {description ? <p className="max-w-xs text-sm text-ink-300">{description}</p> : null}
      {children ? <div className="mt-2">{children}</div> : null}
    </div>
  );
};
