import { DivIcon } from 'leaflet';

import { POINT_TYPE_COLOR, POINT_TYPE_GLYPH } from '@/lib/pointTypes';

import type { PointType } from '@/types';

const HEAD_SIZE = 24;
const TAIL_HEIGHT = 10;
const ICON_WIDTH = 28;
const ICON_HEIGHT = HEAD_SIZE + TAIL_HEIGHT;
const HEAD_LEFT = (ICON_WIDTH - HEAD_SIZE) / 2;
const TAIL_LEFT = ICON_WIDTH / 2 - 6;
const TAIL_TOP = HEAD_SIZE - 2;

const iconCache = new Map<PointType, DivIcon>();

export const createPointIcon = (type: PointType): DivIcon => {
  const cached = iconCache.get(type);

  if (cached) {
    return cached;
  }

  const color = POINT_TYPE_COLOR[type];

  const html = `
    <span style="position:relative;display:block;width:${ICON_WIDTH}px;height:${ICON_HEIGHT}px;">
      <span style="
        position:absolute;top:0;left:${HEAD_LEFT}px;
        width:${HEAD_SIZE}px;height:${HEAD_SIZE}px;
        display:flex;align-items:center;justify-content:center;
        border-radius:50%;background:${color};
        border:2px solid #f4f6f2;
        box-shadow:0 1px 3px rgba(0,0,0,0.45);
        color:#ffffff;
      ">
        <span style="width:13px;height:13px;line-height:0;">${POINT_TYPE_GLYPH[type]}</span>
      </span>
      <span style="
        position:absolute;top:${TAIL_TOP}px;left:${TAIL_LEFT}px;
        width:0;height:0;
        border-left:6px solid transparent;
        border-right:6px solid transparent;
        border-top:${TAIL_HEIGHT}px solid ${color};
      "></span>
    </span>
  `;

  const icon = new DivIcon({
    html,
    className: '',
    iconSize: [ICON_WIDTH, ICON_HEIGHT],
    iconAnchor: [TAIL_LEFT + 6, ICON_HEIGHT],
    popupAnchor: [0, -ICON_HEIGHT],
  });

  iconCache.set(type, icon);

  return icon;
};
