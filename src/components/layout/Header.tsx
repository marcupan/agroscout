import type { ReactElement } from 'react';

export interface HeaderStat {
  label: string;
  value: string;
}

export interface HeaderProps {
  title: string;
  subtitle?: string;
  stats?: HeaderStat[];
}

export const Header = ({ title, subtitle, stats }: HeaderProps): ReactElement => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-shell-600 bg-shell-900 px-5 py-4">
      <div className="min-w-0">
        <h1 className="truncate text-xl font-semibold text-ink-100">{title}</h1>
        {subtitle ? <p className="mt-0.5 text-sm text-ink-300">{subtitle}</p> : null}
      </div>
      {stats && stats.length > 0 ? (
        <dl className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="eyebrow">{stat.label}</dt>
              <dd className="font-mono text-lg font-medium text-ink-100">{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </header>
  );
};
