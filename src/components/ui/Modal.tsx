import { useId, useLayoutEffect, useRef } from 'react';

import type { KeyboardEvent, MouseEvent, ReactElement, ReactNode, SyntheticEvent } from 'react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export interface ModalSectionProps {
  children: ReactNode;
}

export const Modal = ({ open, onClose, title, children }: ModalProps): ReactElement => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog || !open) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>): void => {
    if (event.key !== 'Escape') {
      return;
    }

    event.preventDefault();
    onClose();
  };

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>): void => {
    event.preventDefault();
    onClose();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- dialog owns Escape/backdrop dismissal natively
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onKeyDown={handleKeyDown}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-lg border border-shell-600 bg-shell-800 p-0 text-ink-100 shadow-xl transition-[opacity,translate] duration-150 backdrop:bg-shell-900/70 starting:translate-y-2 starting:opacity-0"
    >
      <div className="flex max-h-[90vh] w-full flex-col">
        <div className="flex items-center justify-between border-b border-shell-600 px-5 py-4">
          <h2 id={titleId} className="text-lg font-semibold text-ink-100">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </dialog>
  );
};

export const ModalBody = ({ children }: ModalSectionProps): ReactElement => {
  return <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>;
};

export const ModalFooter = ({ children }: ModalSectionProps): ReactElement => {
  return <div className="flex justify-end gap-2 border-t border-shell-600 px-5 py-4">{children}</div>;
};
