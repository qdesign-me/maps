import { TMapSource, TMapLayer, ILayerFilter } from '@/types/map';

export const layerId = 'churches-layer';

const layer: TMapLayer = {
  id: layerId,
  type: 'symbol',
  'source-layer': 'district-116-churches',
  layout: {
    //'icon-image': ['match', ['get', 'name'], 'gym', 'big-church', 'church'],

    'icon-image': 'church',

    'icon-allow-overlap': true,
    'text-allow-overlap': true,
    // get the title name from the source's "title" property
    'text-field': ['get', 'name'],
    'text-size': 10,
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-offset': [0, 1.25],

    'text-anchor': 'top',
  },
  // paint: {
  //   // 'circle-color': '#7F3121',
  //   // 'circle-opacity': 0.75,
  //   // 'circle-radius': 5,
  //   'icon-image': 'custom-marker',
  // },
};

// const layer: TMapLayer = {
//   id: layerId,
//   type: 'circle',
//   'source-layer': 'chu2',
//   // layout: {
//   //   'icon-image': 'church',
//   //   // get the title name from the source's "title" property
//   //   'text-field': ['get', 'name'],
//   //   'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
//   //   'text-offset': [0, 1.25],
//   //   'text-anchor': 'top',
//   // },
//   paint: {
//     'circle-color': '#7F3121',
//     'circle-opacity': 0.75,
//     'circle-radius': 5,
//   },
// };

export const sourceId = 'churches-source';
export const layers: TMapLayer[] = [layer];
export const source: TMapSource = {
  type: 'vector',
  url: 'mapbox://pavel-m.doinopowwmjb',
};

export const initialFilter: ILayerFilter[] = [{ layerId: layerId, filter: ['in', 'agencyId'] }];
