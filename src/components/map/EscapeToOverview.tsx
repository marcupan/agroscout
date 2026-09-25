import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import { useFieldsStore } from '@/store/useFieldsStore';

import { OVERVIEW_PADDING, fitView } from './fitView';

import type { LatLngBoundsExpression } from 'leaflet';

export interface EscapeToOverviewProps {
  overviewBounds: LatLngBoundsExpression;
}

const isEditable = (target: EventTarget | null): target is HTMLElement => {
  return (
    target instanceof HTMLElement && (target.isContentEditable || target.matches('input, textarea, select'))
  );
};

export const EscapeToOverview = ({ overviewBounds }: EscapeToOverviewProps): null => {
  const map = useMap();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape' || event.defaultPrevented || document.querySelector('dialog[open]')) {
        return;
      }

      if (isEditable(event.target)) {
        event.target.blur();

        return;
      }

      const { selectedFieldId, selectField } = useFieldsStore.getState();

      if (selectedFieldId !== null) {
        selectField(null);
      } else {
        fitView(map, overviewBounds, OVERVIEW_PADDING);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [map, overviewBounds]);

  return null;
};
