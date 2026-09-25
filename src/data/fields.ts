import type { FieldCollection } from '@/types';

export const FIELDS: FieldCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'field-1',
      properties: {
        id: 'field-1',
        name: 'Поле №1 — Пшениця',
        area: 97.7,
        crop: 'Пшениця',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [30.88144, 50.29432],
            [30.89528, 50.2939],
            [30.89506, 50.28504],
            [30.88122, 50.28532],
            [30.88144, 50.29432],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      id: 'field-2',
      properties: {
        id: 'field-2',
        name: 'Поле №2 — Кукурудза',
        area: 114.3,
        crop: 'Кукурудза',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [30.89704, 50.29376],
            [30.91604, 50.29333],
            [30.91582, 50.2849],
            [30.9056, 50.28483],
            [30.89704, 50.2894],
            [30.89704, 50.29376],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      id: 'field-3',
      properties: {
        id: 'field-3',
        name: 'Поле №3 — Соняшник',
        area: 114.3,
        crop: 'Соняшник',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [30.88122, 50.28434],
            [30.89506, 50.28406],
            [30.89528, 50.2738],
            [30.88364, 50.27352],
            [30.88144, 50.27479],
            [30.88122, 50.28434],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      id: 'field-4',
      properties: {
        id: 'field-4',
        name: 'Поле №4 — Ріпак',
        area: 151.8,
        crop: 'Ріпак',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [30.89682, 50.28392],
            [30.91593, 50.28378],
            [30.91604, 50.27535],
            [30.91329, 50.27352],
            [30.89704, 50.2738],
            [30.89682, 50.28392],
          ],
        ],
      },
    },
  ],
};
