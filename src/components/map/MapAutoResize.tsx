import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import { OVERVIEW_PADDING } from './fitView';

import type { LatLngBoundsExpression } from 'leaflet';

export interface MapAutoResizeProps {
  initialBounds: LatLngBoundsExpression;
}

export const MapAutoResize = ({ initialBounds }: MapAutoResizeProps): null => {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    let hasFitted = false;

    const sync = (): void => {
      if (container.clientWidth === 0 || container.clientHeight === 0) {
        return;
      }

      map.invalidateSize({ pan: false });

      if (hasFitted) {
        return;
      }

      map.fitBounds(initialBounds, { padding: OVERVIEW_PADDING, animate: false });
      hasFitted = true;
    };

    sync();
    const observer = new ResizeObserver(sync);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [map, initialBounds]);

  return null;
};
