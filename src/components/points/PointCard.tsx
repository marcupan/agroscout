import { Badge, Button, IconButton, useTwoStepConfirm } from '@/components/ui';
import { formatLatLng, formatMgrs, toMgrs } from '@/lib/mgrs';
import { POINT_TYPE_COLOR, POINT_TYPE_LABEL } from '@/lib/pointTypes';
import { usePointsStore } from '@/store/usePointsStore';

import type { MonitoringPoint } from '@/types';
import type { ReactElement } from 'react';

export interface PointCardProps {
  point: MonitoringPoint;
  fieldName?: string;
}

interface PointCardDeleteControlProps {
  pointLabel: string;
  onRemove: () => void;
}

const PointCardDeleteControl = ({ pointLabel, onRemove }: PointCardDeleteControlProps): ReactElement => {
  const { confirming, request, cancel, confirm } = useTwoStepConfirm(onRemove);

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <Button variant="danger" size="sm" onClick={confirm}>
          Підтвердити
        </Button>
        <Button variant="ghost" size="sm" onClick={cancel}>
          Скасувати
        </Button>
      </div>
    );
  }

  return (
    <IconButton aria-label={`Видалити точку ${pointLabel}`} onClick={request}>
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path
          d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconButton>
  );
};

const dateFormatter = new Intl.DateTimeFormat('uk-UA', { dateStyle: 'medium', timeStyle: 'short' });

export const PointCard = ({ point, fieldName }: PointCardProps): ReactElement => {
  const removePoint = usePointsStore((state) => state.removePoint);

  const handleRemove = (): void => {
    removePoint(point.id);
  };

  const mgrs = toMgrs(point);
  const description = point.description.trim();
  const pointLabel = description || POINT_TYPE_LABEL[point.type];

  return (
    <li className="flex flex-col gap-2 rounded-md border border-shell-600 bg-shell-800 p-3">
      <div className="flex items-start justify-between gap-2">
        <Badge color={POINT_TYPE_COLOR[point.type]}>{POINT_TYPE_LABEL[point.type]}</Badge>

        <PointCardDeleteControl pointLabel={pointLabel} onRemove={handleRemove} />
      </div>

      <p className="text-sm text-ink-100">{description || <span className="text-ink-300">Без опису</span>}</p>

      {fieldName ? <p className="text-xs text-ink-300">{fieldName}</p> : null}

      <div className="flex flex-col gap-0.5 font-mono text-xs text-ink-300">
        <span>{formatLatLng(point)}</span>
        <span>{mgrs ? formatMgrs(mgrs) : '—'}</span>
        <span>{dateFormatter.format(new Date(point.createdAt))}</span>
      </div>
    </li>
  );
};
