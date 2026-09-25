import { useState } from 'react';

import { Button, Modal, ModalBody, ModalFooter, Select, Textarea } from '@/components/ui';
import { formatLatLng, formatMgrs, toMgrs } from '@/lib/mgrs';
import { POINT_TYPE_OPTIONS, isPointType } from '@/lib/pointTypes';
import { usePointsStore } from '@/store/usePointsStore';

import type { LatLng, MonitoringPoint, PointType } from '@/types';
import type { ChangeEvent, ReactElement, SubmitEvent } from 'react';

export interface PointFormModalProps {
  open: boolean;
  coords: LatLng | null;
  fieldId: string | null;
  fieldName: string | null;
  onClose: () => void;
  onCreated?: (point: MonitoringPoint) => void;
}

const MAX_DESCRIPTION_LENGTH = 500;

export const PointFormModal = ({
  open,
  coords,
  fieldId,
  fieldName,
  onClose,
  onCreated,
}: PointFormModalProps): ReactElement | null => {
  const [lastType, setLastType] = useState<PointType | null>(null);

  const handleCreated = (point: MonitoringPoint): void => {
    setLastType(point.type);
    onCreated?.(point);
  };

  if (!open || coords === null || fieldId === null) {
    return null;
  }

  return (
    <PointFormModalFields
      key={`${fieldId}-${coords.lat}-${coords.lng}`}
      coords={coords}
      fieldId={fieldId}
      fieldName={fieldName}
      initialType={lastType}
      onClose={onClose}
      onCreated={handleCreated}
    />
  );
};

interface PointFormModalFieldsProps {
  coords: LatLng;
  initialType: PointType | null;
  fieldId: string;
  fieldName: string | null;
  onClose: () => void;
  onCreated?: (point: MonitoringPoint) => void;
}

const PointFormModalFields = ({
  coords,
  fieldId,
  fieldName,
  initialType,
  onClose,
  onCreated,
}: PointFormModalFieldsProps): ReactElement => {
  const addPoint = usePointsStore((state) => state.addPoint);

  const [type, setType] = useState<PointType | ''>(initialType ?? '');
  const [description, setDescription] = useState('');

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const next = event.target.value;

    if (isPointType(next)) {
      setType(next);
    }
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (type === '') {
      return;
    }

    const point = addPoint({
      fieldId,
      lat: coords.lat,
      lng: coords.lng,
      type,
      description: description.trim(),
    });

    onCreated?.(point);
    onClose();
  };

  const mgrs = toMgrs(coords);

  return (
    <Modal open onClose={onClose} title={`Нова точка · ${fieldName ?? ''}`}>
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-md border border-shell-600 bg-shell-900/40 p-3">
              <span className="eyebrow">Координати</span>
              <span className="font-mono text-sm text-ink-100">{formatLatLng(coords)}</span>
              <span className="eyebrow">MGRS</span>
              <span className="font-mono text-sm text-ink-100">{mgrs ? formatMgrs(mgrs) : '—'}</span>
            </div>

            <Select
              label="Тип точки"
              options={POINT_TYPE_OPTIONS}
              value={type}
              placeholder="Оберіть тип"
              onChange={handleTypeChange}
              required
            />

            <Textarea
              label="Опис"
              value={description}
              onChange={handleDescriptionChange}
              maxLength={MAX_DESCRIPTION_LENGTH}
              hint="Необов’язково"
              placeholder="Що зафіксовано на точці..."
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Скасувати
          </Button>
          <Button type="submit" variant="primary">
            Додати точку
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
