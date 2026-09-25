import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_TIMEOUT_MS = 5000;

export interface TwoStepConfirm {
  confirming: boolean;
  request: () => void;
  cancel: () => void;
  confirm: () => void;
}

export const useTwoStepConfirm = (onConfirm: () => void, timeoutMs = DEFAULT_TIMEOUT_MS): TwoStepConfirm => {
  const [confirming, setConfirming] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    [],
  );

  const request = useCallback(() => {
    clearTimeout(timer.current);
    setConfirming(true);
    timer.current = setTimeout(() => {
      setConfirming(false);
    }, timeoutMs);
  }, [timeoutMs]);

  const cancel = useCallback(() => {
    clearTimeout(timer.current);
    setConfirming(false);
  }, []);

  const confirm = useCallback(() => {
    clearTimeout(timer.current);
    setConfirming(false);
    onConfirm();
  }, [onConfirm]);

  return { confirming, request, cancel, confirm };
};
