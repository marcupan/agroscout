import type { Feature, FeatureCollection, Polygon } from 'geojson';

export const POINT_TYPES = ['soil_sample', 'pest', 'disease', 'other'] as const;
export type PointType = (typeof POINT_TYPES)[number];

export interface FieldProperties {
  id: string;
  name: string;
  area: number;
  crop: string;
}

export type Field = Feature<Polygon, FieldProperties>;
export type FieldCollection = FeatureCollection<Polygon, FieldProperties>;

export interface MonitoringPoint {
  id: string;
  fieldId: string;
  lat: number;
  lng: number;
  type: PointType;
  description: string;
  createdAt: string;
}

export type SortOrder = 'newest' | 'oldest';

export interface FilterState {
  type: PointType | 'all';
  search: string;
  sort: SortOrder;
}

export interface LatLng {
  lat: number;
  lng: number;
}
