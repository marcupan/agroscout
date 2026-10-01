import { useCallback, useMemo, useState } from 'react';
import { DomEvent } from 'leaflet';
import { Polygon, Tooltip } from 'react-leaflet';

import { formatHectares } from '@/lib/format';
import { useFieldsStore } from '@/store/useFieldsStore';

import type { Field } from '@/types';
import type { LeafletMouseEvent, PathOptions } from 'leaflet';
import type { ReactElement } from 'react';

const UNSELECTED_STYLE: PathOptions = { color: '#7fa650', weight: 1.5, fillOpacity: 0.1, dashArray: '4 4' };
const SELECTED_STYLE: PathOptions = { color: '#e3b23c', weight: 3, fillOpacity: 0.18, dashArray: '' };
const HOVER_FILL_BOOST = 0.06;

export interface FieldPolygonProps {
  field: Field;
  isSelected: boolean;
  onSelect: (field: Field, isSelected: boolean, event: LeafletMouseEvent) => void;
}

const toLatLngRings = (field: Field): [number, number][][] => {
  return field.geometry.coordinates.map((ring) => ring.map(([lng, lat]) => [lat, lng] as [number, number]));
};

const FieldPolygon = ({ field, isSelected, onSelect }: FieldPolygonProps): ReactElement => {
  const [hovered, setHovered] = useState(false);

  const positions = useMemo(() => toLatLngRings(field), [field]);

  const base = isSelected ? SELECTED_STYLE : UNSELECTED_STYLE;
  const pathOptions: PathOptions = hovered
    ? { ...base, fillOpacity: (base.fillOpacity ?? 0) + HOVER_FILL_BOOST }
    : base;

  const handleClick = useCallback(
    (event: LeafletMouseEvent) => {
      onSelect(field, isSelected, event);
    },
    [field, isSelected, onSelect],
  );
  const handleMouseOver = useCallback(() => {
    setHovered(true);
  }, []);
  const handleMouseOut = useCallback(() => {
    setHovered(false);
  }, []);
  const eventHandlers = useMemo(
    () => ({ click: handleClick, mouseover: handleMouseOver, mouseout: handleMouseOut }),
    [handleClick, handleMouseOver, handleMouseOut],
  );

  return (
    <Polygon positions={positions} pathOptions={pathOptions} eventHandlers={eventHandlers}>
      <Tooltip sticky>
        <span>{field.properties.name}</span>{' '}
        <span className="font-mono">{formatHectares(field.properties.area)}</span>
      </Tooltip>
    </Polygon>
  );
};

export const FieldsLayer = (): ReactElement => {
  const fields = useFieldsStore((state) => state.fields);
  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);
  const selectField = useFieldsStore((state) => state.selectField);

  const ordered = useMemo(() => {
    if (selectedFieldId == null) {
      return fields;
    }

    const others = fields.filter((field) => field.properties.id !== selectedFieldId);
    const selected = fields.find((field) => field.properties.id === selectedFieldId);

    return selected ? [...others, selected] : fields;
  }, [fields, selectedFieldId]);

  const handleSelect = useCallback(
    (field: Field, isSelected: boolean, event: LeafletMouseEvent) => {
      if (isSelected) {
        return;
      }

      DomEvent.stopPropagation(event);

      selectField(field.properties.id);
    },
    [selectField],
  );

  return (
    <>
      {ordered.map((field) => (
        <FieldPolygon
          key={field.properties.id}
          field={field}
          isSelected={field.properties.id === selectedFieldId}
          onSelect={handleSelect}
        />
      ))}
    </>
  );
};
