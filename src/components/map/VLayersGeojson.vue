<script setup lang="ts">
import { defineProps, onBeforeUnmount, watchEffect } from 'vue';

import { ILayerFilter, TMapSource, TMapLayer } from '@/types/map';
import { useMapStore } from '@/stores/map';
import { isArray } from 'lodash';

interface IProps {
  source: TMapSource;
  sourceId: string;
  layers: TMapLayer[];
  initialFilters?: ILayerFilter[];
}

const store = useMapStore();
const props = defineProps<IProps>();

watchEffect(() => {
  if (store.mapLoaded && !store.map.getSource(props.sourceId)) {
    addLayers();
  }
});

onBeforeUnmount(() => {
  props.layers.forEach(layer => {
    if (store.map.getLayer(layer.id)) {
      store.map.removeLayer(layer.id);
    }
  });
  store.map.removeSource(props.sourceId);
});

const addLayers = (): void => {
  store.map.addSource(props.sourceId, props.source);

  props.layers.forEach(layer => {
    store.map.addLayer({ ...layer, source: props.sourceId } as TMapLayer);
  });

  if (isArray(props.initialFilters)) {
    props.initialFilters.forEach(({ layerId, filter }) => {
      store.map.setFilter(layerId, filter);
    });
  }
};
</script>
