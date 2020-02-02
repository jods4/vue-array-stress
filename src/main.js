import { createApp } from 'vue';
import App from './app.vue';

createApp(App).mount('#app');

// naive (20 x 60): 4.5Mo, 1364 Set, 10.5ms task
// fast (20 x 60): 4.4Mo, 164 Set, 8.1ms task