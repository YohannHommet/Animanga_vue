import { createApp } from 'vue';
import { createPinia } from 'pinia';

import router from './core/router/index';
import App from './App.vue';

import './assets/main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
