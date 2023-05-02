import { TGeojson, TMapSource, TMapLayer } from '@/types/map';

export const layerId = 'directions-layer';

const layer: TMapLayer = {
  id: layerId,
  type: 'line',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#888',
    'line-width': 8,
  },
};

const geojson: TGeojson = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: [],
  },
};

export const sourceId = 'directions-source';
export const layers: TMapLayer[] = [layer];
export const source: TMapSource = { type: 'geojson', data: geojson };
