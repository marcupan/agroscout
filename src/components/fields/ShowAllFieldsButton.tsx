import { Button } from '@/components/ui';
import { useFieldsStore } from '@/store/useFieldsStore';

import type { ReactElement } from 'react';

export const ShowAllFieldsButton = (): ReactElement | null => {
  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);
  const selectField = useFieldsStore((state) => state.selectField);

  const handleShowAll = (): void => {
    selectField(null);
  };

  if (selectedFieldId === null) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      title="Показати всі поля (Esc)"
      aria-keyshortcuts="Escape"
      onClick={handleShowAll}
    >
      Показати всі
    </Button>
  );
};
