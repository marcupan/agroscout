import { create } from 'zustand';

import { FIELDS } from '@/data/fields';

import type { Field } from '@/types';

interface FieldsState {
  fields: Field[];
  selectedFieldId: string | null;
  selectField: (id: string | null) => void;
}

export const useFieldsStore = create<FieldsState>((set) => ({
  fields: FIELDS.features,
  selectedFieldId: null,
  selectField: (id) => {
    set({ selectedFieldId: id });
  },
}));
