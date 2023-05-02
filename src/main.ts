import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';
import mapboxgl from 'mapbox-gl';

if (!mapboxgl.supported({ failIfMajorPerformanceCaveat: false })) {
  console.log("Mapbox's GL rendering is not supported");
}

// API call test - BEGIN
import client, { HelloRequest, HelloResponse } from './services/api.service';
const greeting = new HelloRequest();
greeting.setGreeting('World');

client.sayHello(greeting).then((response: HelloResponse) => {
  console.log(response.getReply());
});
// API call test - END

const pinia = createPinia();

createApp(App).use(pinia).mount('#app');
