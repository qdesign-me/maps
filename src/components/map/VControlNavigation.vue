<script setup lang="ts">
import { defineProps, watchEffect, shallowRef } from 'vue';
import { NavigationControl } from 'mapbox-gl';

import { INavigationControl, TControlPosition } from '@/types/map';
import { useMapStore } from '@/stores/map';

interface IProps {
  position: TControlPosition;
  options?: INavigationControl;
}

const store = useMapStore();
const props = defineProps<IProps>();
const control = shallowRef({} as NavigationControl);

watchEffect(() => {
  if (store.mapLoaded && !store.map.hasControl(control.value)) {
    addControl();
  }
});

const addControl = (): void => {
  const navigation = new NavigationControl(props.options);
  store.map.addControl(navigation, props.position);
};
</script>
