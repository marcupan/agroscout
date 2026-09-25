import type { LatLngBoundsExpression, Map as LeafletMap } from 'leaflet';

export const OVERVIEW_PADDING: [number, number] = [32, 32];

export const FIELD_PADDING: [number, number] = [48, 48];

export const fitView = (map: LeafletMap, bounds: LatLngBoundsExpression, padding: [number, number]): void => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    map.fitBounds(bounds, { padding, animate: false });
  } else {
    map.flyToBounds(bounds, { padding, duration: 0.6 });
  }
};
