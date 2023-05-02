<template>
  <div class="container">
    <VMap
      :access-token="mapInitialProps.accessToken"
      :zoom="mapInitialProps.zoom"
      :style="mapInitialProps.style"
      :center="mapInitialProps.center"
      @click="onClick"
    >
      <VControlNavigation position="top-right" />
      <VControlGeolocate position="top-right" />

      <!-- <VLayersGeojson :layers="directionGeo.layers" :source="directionGeo.source" :source-id="directionGeo.sourceId" /> -->
      <VLayersGeojson :layers="churchesGeo.layers" :source="churchesGeo.source" :source-id="churchesGeo.sourceId" />

      <!-- <VLayersGeojson :layers="parishesGeo.layers" :source="parishesGeo.source" :source-id="parishesGeo.sourceId" /> -->
      <VMapIcons :icons="icons" />
    </VMap>
  </div>
</template>

<script setup lang="ts">
import VMap from '@/components/map/VMap.vue';
import VControlNavigation from '@/components/map/VControlNavigation.vue';
import VControlGeolocate from '@/components/map/VControlGeolocate.vue';
import VLayersGeojson from '@/components/map/VLayersGeojson.vue';
import VMapIcons from '@/components/map/VMapIcons.vue';

import { mapInitialProps } from '@/constants/map';

import * as directionGeo from '@/constants/geojson/direction.geojson';
import * as churchesGeo from '@/constants/geojson/churches.geojson';
import * as parishesGeo from '@/constants/geojson/parishes.geojson';
import { icons } from '@/constants/map';
import { TMapBbox, TMapLayerMouseEvent } from '@/types/map';

import { useMapStore } from '@/stores/map';
import { castArray } from 'lodash';
const mapStore = useMapStore();

const clickBufferTolerance = 5;
function onClick(event: TMapLayerMouseEvent) {
  console.log(event.point.x);

  const bbox: TMapBbox = [
    [event.point.x - clickBufferTolerance, event.point.y - clickBufferTolerance],
    [event.point.x + clickBufferTolerance, event.point.y + clickBufferTolerance],
  ];

  console.log(mapStore.map.queryRenderedFeatures(bbox, { layers: [churchesGeo.layerId] }));
}
</script>

<style>
.container {
  display: flex;
  flex-wrap: nowrap;
}
</style>
