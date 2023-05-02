<template>
  <div class="map" id="map">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineProps, defineEmits } from 'vue';
import * as mapboxgl from 'mapbox-gl';

import { useMapStore } from '@/stores/map';
import { TCoordinates } from '@/types/map';
import { mapEvents } from '@/constants/map';

interface IProps {
  accessToken: string;
  style: string;
  zoom: number;
  center: TCoordinates;
}

const store = useMapStore();
const props = defineProps<IProps>();
const emit = defineEmits(['load', ...mapEvents]);

const listenOnLoad = () => {
  store.map.on('load', () => {
    store.setMapLoaded(true);
  });
};

function listenMapEvents(): void {
  mapEvents.forEach(eventName => {
    store.map.on(eventName, evt => {
      emit(eventName, evt);
    });
  });
}

onMounted(() => {
  store.setMap(
    new mapboxgl.Map({
      container: 'map',
      accessToken: props.accessToken,
      style: props.style,
      zoom: props.zoom,
      center: props.center,
    }),
  );

  listenOnLoad();
  listenMapEvents();
});
</script>

<style>
.map {
  height: 100vh;
  flex-grow: 1;
}
</style>
