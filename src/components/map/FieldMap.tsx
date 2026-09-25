import { useMemo, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { useToast } from '@/components/ui';
import { getFeatureCollectionBounds } from '@/lib/geo';
import { useFieldsStore } from '@/store/useFieldsStore';

import { EscapeToOverview } from './EscapeToOverview';
import { FieldsLayer } from './FieldsLayer';
import { FitViewToSelection } from './FitViewToSelection';
import { MapAutoResize } from './MapAutoResize';
import { MapClickHandler } from './MapClickHandler';
import { PointsLayer } from './PointsLayer';

import type { LatLng } from '@/types';
import type { LeafletEventHandlerFnMap } from 'leaflet';
import type { ReactElement } from 'react';

export interface FieldMapProps {
  onAddPointRequest: (point: LatLng) => void;
  onInvalidClick: (reason: 'no-field-selected' | 'outside-field', fieldName?: string) => void;
}

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const FieldMap = ({ onAddPointRequest, onInvalidClick }: FieldMapProps): ReactElement => {
  const fields = useFieldsStore((state) => state.fields);
  const { showToast } = useToast();

  const tileErrorShown = useRef(false);

  const initialBounds = useMemo(
    () => getFeatureCollectionBounds({ type: 'FeatureCollection', features: fields }),
    [fields],
  );
  const initialCenter = useMemo<[number, number]>(() => {
    const [[south, west], [north, east]] = initialBounds;

    return [(south + north) / 2, (west + east) / 2];
  }, [initialBounds]);

  const tileEventHandlers = useMemo<LeafletEventHandlerFnMap>(
    () => ({
      tileerror: () => {
        if (tileErrorShown.current) {
          return;
        }

        tileErrorShown.current = true;
        showToast('Не вдалося завантажити частину карти. Перевірте з’єднання.', 'warn');
      },
    }),
    [showToast],
  );

  return (
    <div className="relative isolate h-full w-full">
      <MapContainer
        center={initialCenter}
        zoom={13}
        minZoom={5}
        maxZoom={19}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} eventHandlers={tileEventHandlers} />
        <FieldsLayer />
        <PointsLayer />
        <MapClickHandler onAddPointRequest={onAddPointRequest} onInvalidClick={onInvalidClick} />
        <MapAutoResize initialBounds={initialBounds} />
        <FitViewToSelection overviewBounds={initialBounds} />
        <EscapeToOverview overviewBounds={initialBounds} />
      </MapContainer>
    </div>
  );
};
