import type { ReactElement, ReactNode } from 'react';

export interface PanelProps {
  children: ReactNode;
  fill?: boolean;
}

export const Panel = ({ children, fill = false }: PanelProps): ReactElement => {
  return (
    <section className={`flex flex-col ${fill ? 'lg:min-h-0 lg:flex-1' : 'lg:shrink-0'}`}>{children}</section>
  );
};

export interface PanelHeaderProps {
  title: string;
  children?: ReactNode;
}

export const PanelHeader = ({ title, children }: PanelHeaderProps): ReactElement => {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-shell-600 px-4 py-3">
      <h2 className="eyebrow">{title}</h2>
      {children ? <div className="flex items-center gap-2">{children}</div> : null}
    </div>
  );
};

export interface PanelBodyProps {
  children: ReactNode;
  scroll?: boolean;
}

export const PanelBody = ({ children, scroll = false }: PanelBodyProps): ReactElement => {
  return <div className={scroll ? 'lg:min-h-0 lg:flex-1 lg:overflow-y-auto' : 'flex-1'}>{children}</div>;
};
