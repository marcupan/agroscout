import type { ReactElement } from 'react';

export type ToastTone = 'info' | 'success' | 'warn' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  tone: ToastTone;
}

export interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const TONE_BORDER: Record<ToastTone, string> = {
  info: 'border-l-ink-300',
  success: 'border-l-field',
  warn: 'border-l-signal-400',
  error: 'border-l-danger',
};

export const Toast = ({ toast, onDismiss }: ToastProps): ReactElement => {
  const handleDismiss = (): void => {
    onDismiss(toast.id);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md border border-l-4 border-shell-600 bg-shell-700 px-4 py-3 text-sm text-ink-100 shadow-lg transition-[opacity,translate] duration-150 ease-out starting:translate-y-2 starting:opacity-0 ${TONE_BORDER[toast.tone]}`}
    >
      <p className="min-w-0 flex-1 break-words">{toast.message}</p>
      <button
        type="button"
        aria-label="Закрити сповіщення"
        onClick={handleDismiss}
        className="shrink-0 rounded text-ink-300 transition-colors duration-150 hover:text-ink-100 focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:outline-none"
      >
        ✕
      </button>
    </div>
  );
};
