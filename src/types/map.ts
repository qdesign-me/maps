import type mapboxgl from 'mapbox-gl';

export type TMap = mapboxgl.Map;
export type TMapFilter = boolean | unknown[];
export type TPointLike = mapboxgl.PointLike;
export type TMapBbox = [mapboxgl.PointLike, mapboxgl.PointLike];
export type TLngLat = { lng: number; lat: number };

export type TMapLayer = mapboxgl.AnyLayer;
export type TGeojson = GeoJSON.FeatureCollection | GeoJSON.Feature;
export type TMapSource = mapboxgl.AnySourceData;
export type TMapEvent = mapboxgl.MapEventType;
export type TMapLayerMouseEvent = mapboxgl.MapLayerMouseEvent;
export type TGeolocateEvent = mapboxgl.MapboxEvent & {
  coords: { longitude: mapboxgl.PointLike; latitude: mapboxgl.PointLike };
};

export type TControlPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export type TCoordinates = mapboxgl.LngLatLike;

export interface INavigationControl {
  showCompass?: boolean;
  showZoom?: boolean;
  visualizePitch?: boolean;
}

export interface IGeolocateControl {
  positionOptions?: mapboxgl.PositionOptions | undefined;
  fitBoundsOptions?: mapboxgl.FitBoundsOptions | undefined;
  trackUserLocation?: boolean | undefined;
  showAccuracyCircle?: boolean | undefined;
  showUserLocation?: boolean | undefined;
  showUserHeading?: boolean | undefined;
  geolocation?: Geolocation | undefined;
}

export interface IScaleControl {
  maxWidth?: number;
  unit?: string;
}

export interface ILayerFilter {
  layerId: string;
  filter: TMapFilter;
}
