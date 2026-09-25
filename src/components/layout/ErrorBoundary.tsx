import { Component } from 'react';

import type { ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary перехопив помилку:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ error: null });
  };

  override render(): ReactNode {
    const { error } = this.state;
    const { fallbackTitle = 'Щось пішло не так', children } = this.props;

    if (!error) {
      return children;
    }

    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center">
        <p className="text-base font-semibold text-ink-100">{fallbackTitle}</p>
        <p className="max-w-sm text-sm text-ink-300">{error.message}</p>
        <button
          type="button"
          className="mt-2 inline-flex h-10 items-center justify-center rounded-md border border-transparent bg-signal-400 px-4 text-sm font-medium text-shell-900 transition-colors duration-150 hover:bg-signal-400/90 focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:outline-none"
          onClick={this.handleReset}
        >
          Спробувати знову
        </button>
      </div>
    );
  }
}
