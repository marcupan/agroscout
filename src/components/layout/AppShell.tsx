import type { ReactElement, ReactNode } from 'react';

export interface AppShellProps {
  children: ReactNode;
}

export interface AppShellSlotProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps): ReactElement => {
  return (
    <div className="flex flex-col bg-shell-900 lg:grid lg:h-dvh lg:grid-cols-[400px_1fr] lg:grid-rows-[auto_1fr] lg:overflow-hidden">
      {children}
    </div>
  );
};

export const AppShellHeader = ({ children }: AppShellSlotProps): ReactElement => {
  return <div className="shrink-0 lg:col-span-2">{children}</div>;
};

export const AppShellMain = ({ children }: AppShellSlotProps): ReactElement => {
  return <div className="h-[52vh] lg:col-start-2 lg:row-start-2 lg:h-auto lg:min-h-0">{children}</div>;
};

export const AppShellSidebar = ({ children }: AppShellSlotProps): ReactElement => {
  return (
    <div className="flex flex-col lg:col-start-1 lg:row-start-2 lg:min-h-0 lg:overflow-hidden">
      {children}
    </div>
  );
};
