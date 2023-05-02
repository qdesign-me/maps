import { ref, shallowRef } from 'vue';

import { defineStore } from 'pinia';
import { TMap, TLngLat } from '@/types/map';

export const useMapStore = defineStore('map', () => {
  const map = shallowRef<TMap>({} as TMap);
  const mapLoaded = ref<boolean>(false);
  const iconsLoaded = ref<boolean>(false);
  const userLocation = ref<TLngLat>({} as TLngLat);

  function setUserLocation(location: TLngLat) {
    userLocation.value = location;
  }

  function setMap(mapToSet: TMap) {
    map.value = mapToSet;
  }

  function setMapLoaded(loaded: boolean) {
    mapLoaded.value = loaded;
  }

  function setIconsLoaded(loaded: boolean) {
    iconsLoaded.value = loaded;
  }
  return { map, mapLoaded, userLocation, setMap, setMapLoaded, setIconsLoaded, setUserLocation };
});
