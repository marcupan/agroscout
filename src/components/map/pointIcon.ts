import { DivIcon } from 'leaflet';

import { POINT_TYPE_GLYPH } from '@/lib/pointTypes';

import type { PointType } from '@/types';

const ICON_WIDTH = 28;
const ICON_HEIGHT = 34;

const iconCache = new Map<PointType, DivIcon>();

export const createPointIcon = (type: PointType): DivIcon => {
  const cached = iconCache.get(type);

  if (cached) {
    return cached;
  }

  const icon = new DivIcon({
    html: `<span class="point-pin" data-type="${type}"><span class="point-pin__head">${POINT_TYPE_GLYPH[type]}</span></span>`,
    className: '',
    iconSize: [ICON_WIDTH, ICON_HEIGHT],
    iconAnchor: [ICON_WIDTH / 2, ICON_HEIGHT],
    popupAnchor: [0, -ICON_HEIGHT],
  });

  iconCache.set(type, icon);

  return icon;
};
