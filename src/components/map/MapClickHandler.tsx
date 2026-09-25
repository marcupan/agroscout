import { useCallback, useMemo } from 'react';
import { useMapEvents } from 'react-leaflet';

import { isPointInField } from '@/lib/geo';
import { useFieldsStore } from '@/store/useFieldsStore';

import type { LatLng } from '@/types';
import type { LeafletEventHandlerFnMap } from 'leaflet';

export interface MapClickHandlerProps {
  onAddPointRequest: (point: LatLng) => void;
  onInvalidClick: (reason: 'no-field-selected' | 'outside-field', fieldName?: string) => void;
}

export const MapClickHandler = ({ onAddPointRequest, onInvalidClick }: MapClickHandlerProps): null => {
  const fields = useFieldsStore((state) => state.fields);
  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);

  const handleClick = useCallback(
    (latlng: LatLng) => {
      if (selectedFieldId == null) {
        onInvalidClick('no-field-selected');

        return;
      }

      const field = fields.find((candidate) => candidate.properties.id === selectedFieldId);

      if (!field || !isPointInField(latlng, field)) {
        onInvalidClick('outside-field', field?.properties.name);

        return;
      }

      onAddPointRequest(latlng);
    },
    [fields, selectedFieldId, onAddPointRequest, onInvalidClick],
  );

  const handlers = useMemo<LeafletEventHandlerFnMap>(
    () => ({
      click: (event) => {
        const { lat, lng } = event.latlng.wrap();

        handleClick({ lat, lng });
      },
    }),
    [handleClick],
  );

  useMapEvents(handlers);

  return null;
};
