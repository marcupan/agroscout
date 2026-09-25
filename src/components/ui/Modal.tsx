import { useId, useLayoutEffect, useRef } from 'react';

import type { ReactElement, ReactNode, SyntheticEvent } from 'react';

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const titleId = useId();

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>): void => {
    event.preventDefault();
    onClose();
  };

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

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-lg border border-shell-600 bg-shell-800 p-0 text-ink-100 shadow-xl transition-[opacity,translate] duration-150 starting:translate-y-2 starting:opacity-0"
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
