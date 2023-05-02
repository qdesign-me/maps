<script setup lang="ts">
import { defineProps, watchEffect, shallowRef } from 'vue';
import { GeolocateControl } from 'mapbox-gl';

import { IGeolocateControl, TControlPosition } from '@/types/map';
import { useMapStore } from '@/stores/map';

interface IProps {
  position: TControlPosition;
  options?: IGeolocateControl;
}

const store = useMapStore();
const props = defineProps<IProps>();
const control = shallowRef({} as GeolocateControl);

watchEffect(() => {
  if (store.mapLoaded && !store.map.hasControl(control.value)) {
    addControl();
  }
});

const addControl = (): void => {
  const geolocate = new GeolocateControl(props.options);
  store.map.addControl(geolocate, props.position);

  geolocate.on('geolocate', (event: any) => {
    const lng: number = event?.coords?.longitude;
    const lat: number = event?.coords?.latitude;

    store.setUserLocation({ lng, lat });
  });
};
</script>
