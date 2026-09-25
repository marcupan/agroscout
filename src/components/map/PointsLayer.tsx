import { useCallback } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { Button, useTwoStepConfirm } from '@/components/ui';
import { formatLatLng, formatMgrs, toMgrs } from '@/lib/mgrs';
import { POINT_TYPE_LABEL } from '@/lib/pointTypes';
import { useFieldsStore } from '@/store/useFieldsStore';
import { useFilteredPoints } from '@/store/useFilteredPoints';
import { usePointsStore } from '@/store/usePointsStore';

import { createPointIcon } from './pointIcon';

import type { MonitoringPoint } from '@/types';
import type { LatLngTuple } from 'leaflet';
import type { MouseEvent, ReactElement } from 'react';

const dateFormatter = new Intl.DateTimeFormat('uk-UA', { dateStyle: 'medium', timeStyle: 'short' });

const keepClickInPopup = (event: MouseEvent<HTMLDivElement>): void => {
  event.stopPropagation();
};

const POPUP_PAN_PADDING_TOP_LEFT: [number, number] = [56, 16];

export interface PointDeleteActionProps {
  confirming: boolean;
  onRequest: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

const PointDeleteAction = ({
  confirming,
  onRequest,
  onCancel,
  onConfirm,
}: PointDeleteActionProps): ReactElement => {
  if (confirming) {
    return (
      <div className="mt-1 flex gap-2">
        <Button variant="danger" size="sm" className="flex-1" onClick={onConfirm}>
          Підтвердити
        </Button>
        <Button variant="ghost" size="sm" className="flex-1" onClick={onCancel}>
          Скасувати
        </Button>
      </div>
    );
  }

  return (
    <Button variant="secondary" size="sm" className="mt-1 w-full" onClick={onRequest}>
      Видалити точку
    </Button>
  );
};

export interface PointMarkerProps {
  point: MonitoringPoint;
  onRemove: (id: string) => void;
}

const PointMarker = ({ point, onRemove }: PointMarkerProps): ReactElement => {
  const label = POINT_TYPE_LABEL[point.type];
  const mgrs = toMgrs(point);
  const position: LatLngTuple = [point.lat, point.lng];
  const remove = useCallback(() => {
    onRemove(point.id);
  }, [onRemove, point.id]);
  const { confirming, request, cancel, confirm } = useTwoStepConfirm(remove);

  return (
    <Marker
      position={position}
      icon={createPointIcon(point.type)}
      keyboard
      alt={`Точка моніторингу: ${label}`}
      title={label}
    >
      <Popup autoPanPaddingTopLeft={POPUP_PAN_PADDING_TOP_LEFT}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- not an interaction, only stops propagation (see keepClickInPopup) */}
        <div className="min-w-[220px] space-y-1.5 text-sm text-ink-100" onClick={keepClickInPopup}>
          <p className="text-base font-semibold">{label}</p>
          <p className="font-mono text-xs text-ink-300">{formatLatLng(point)}</p>
          <p className="font-mono text-xs text-ink-300">{mgrs ? formatMgrs(mgrs) : '—'}</p>
          <p className="font-mono text-xs text-ink-300">{dateFormatter.format(new Date(point.createdAt))}</p>
          {point.description !== '' && <p className="text-ink-100">{point.description}</p>}
          <PointDeleteAction
            confirming={confirming}
            onRequest={request}
            onCancel={cancel}
            onConfirm={confirm}
          />
        </div>
      </Popup>
    </Marker>
  );
};

export const PointsLayer = (): ReactElement | null => {
  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);
  const points = useFilteredPoints(selectedFieldId);
  const removePoint = usePointsStore((state) => state.removePoint);

  return (
    <>
      {points.map((point) => (
        <PointMarker key={point.id} point={point} onRemove={removePoint} />
      ))}
    </>
  );
};
