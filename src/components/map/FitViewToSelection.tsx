import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';

import { getFieldBounds } from '@/lib/geo';
import { useFieldsStore } from '@/store/useFieldsStore';

import { FIELD_PADDING, OVERVIEW_PADDING, fitView } from './fitView';

import type { LatLngBoundsExpression } from 'leaflet';

export interface FitViewToSelectionProps {
  overviewBounds: LatLngBoundsExpression;
}

export const FitViewToSelection = ({ overviewBounds }: FitViewToSelectionProps): null => {
  const map = useMap();
  const fields = useFieldsStore((state) => state.fields);
  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);

  const previousFieldId = useRef<string | null>(null);

  useEffect(() => {
    if (selectedFieldId === previousFieldId.current) {
      return;
    }

    previousFieldId.current = selectedFieldId;

    if (selectedFieldId == null) {
      fitView(map, overviewBounds, OVERVIEW_PADDING);

      return;
    }

    const field = fields.find((candidate) => candidate.properties.id === selectedFieldId);

    if (field) {
      fitView(map, getFieldBounds(field), FIELD_PADDING);
    }
  }, [selectedFieldId, fields, map, overviewBounds]);

  return null;
};
