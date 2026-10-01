import { useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Toast } from './Toast';
import { ToastContext } from './useToast';

import type { ToastItem, ToastTone } from './Toast';
import type { ToastContextValue } from './useToast';
import type { ReactElement, ReactNode } from 'react';

const AUTO_DISMISS_MS = 4000;

export interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps): ReactElement => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const timersRef = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const lastRef = useRef<{ message: string; tone: ToastTone; id: string } | null>(null);

  const nextIdRef = useRef(0);

  const dismiss = useCallback((id: string) => {
    if (lastRef.current?.id === id) {
      lastRef.current = null;
    }

    setToasts((current) => current.filter((toast) => toast.id !== id));

    const timer = timersRef.current.get(id);

    if (timer) {
      clearTimeout(timer);

      timersRef.current.delete(id);
    }
  }, []);

  const scheduleDismiss = useCallback(
    (id: string) => {
      const timer = setTimeout(() => {
        dismiss(id);
      }, AUTO_DISMISS_MS);

      timersRef.current.set(id, timer);
    },
    [dismiss],
  );

  const showToast = useCallback(
    (message: string, tone: ToastTone = 'info') => {
      const last = lastRef.current;

      if (last) {
        const isSameMessage = last.message === message && last.tone === tone;

        if (isSameMessage) {
          const existingTimer = timersRef.current.get(last.id);

          if (existingTimer) {
            clearTimeout(existingTimer);
          }

          scheduleDismiss(last.id);

          return;
        }
      }

      const id = `toast-${nextIdRef.current++}`;

      lastRef.current = { message, tone, id };

      setToasts((current) => [...current, { id, message, tone }]);

      scheduleDismiss(id);
    },
    [scheduleDismiss],
  );

  const value = useMemo<ToastContextValue>(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-100 flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end lg:bottom-12">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};
