import { TMapSource, TMapLayer } from '@/types/map';

export const layerId = 'parishes-layer';

const layer: TMapLayer = {
  id: layerId,
  type: 'fill',
  'source-layer': 'agency-17808-customlayer-0', // reference the data source
  layout: {},
  paint: {
    'fill-color': ['get', 'fillColor'],
    'fill-opacity': ['interpolate', ['linear'], ['zoom'], 0, 0.5, 22, 0.5],
    'fill-outline-color': '#000',
  },
};
// const layerText: TMapLayer = {
//   id: 'parishes-layer-text',
//   type: 'symbol',
//   'source-layer': '161840',
//   source: 'mapbox-terrain',
//   layout: {
//     'text-field': ['get', 'name'],
//     'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
//     'text-offset': [0, 0],
//     'text-anchor': 'center',
//   },
// };

export const sourceId = 'agency-17808-customlayer-0';
export const layers: TMapLayer[] = [layer];
export const source: TMapSource = {
  type: 'vector',
  url: 'mapbox://pavel-m.doinopowwmjb',
  // url: 'mapbox://artem12345.clgfecf2g03wu2cmmot7hgtsf-0pfrf',
};

// export const initialFilter: ILayerFilter[] = [{ layerId: layerId, filter: ['in', 'agencyId', 2] }];
