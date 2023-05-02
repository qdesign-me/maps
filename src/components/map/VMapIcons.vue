<script setup lang="ts">
import { defineProps, watchEffect } from 'vue';

import { useMapStore } from '@/stores/map';

interface Icon {
  name: string;
  url: string;
}
interface IProps {
  icons: Icon[];
}

const store = useMapStore();
const props = defineProps<IProps>();

watchEffect(() => {
  if (store.mapLoaded) {
    Promise.all(props.icons.map(icon => loadIcon(icon))).then(() => {
      store.setIconsLoaded(true);
    });
  }
});

const loadIcon = (icon: Icon) => {
  return new Promise<void>((resolve, reject) => {
    store.map.loadImage(icon.url, (error, image) => {
      if (error || !image) return reject(error);
      store.map.addImage(icon.name, image);
      return resolve();
    });
  });
};
</script>
