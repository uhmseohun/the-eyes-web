import Vue from 'vue';
import App from '@/App.vue';

import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';

import {
  BACKEND_API_URL,
  SOCKET_IO_URL,
  SWAL_OPTIONS,
  GOOGLE_TRACKING_ID,
  KAKAO_SDK_KEY,
  VISION_SERVER_URL,
} from '@/constants';
import axios from 'axios';
import socket from 'socket.io-client';

import camelCase from 'lodash/camelCase';

import VueAnalytics from 'vue-analytics';

import VueSweetalert2 from 'vue-sweetalert2';
import Sweetalert2 from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// @ts-ignore
import KakaoSDK from './kakao.min';

Vue.config.productionTip = false;
Vue.config.errorHandler = (err) => {
  console.error(err);
  Sweetalert2.fire({
    title: '에러!',
    text: err.message,
    icon: 'error',
    ...SWAL_OPTIONS,
  });
};

Vue.prototype.$io = socket(SOCKET_IO_URL);
Vue.prototype.$api = axios.create({
  baseURL: BACKEND_API_URL,
});
Vue.prototype.$vision = axios.create({
  baseURL: VISION_SERVER_URL,
});
KakaoSDK.init(KAKAO_SDK_KEY);
Vue.prototype.$kakao = KakaoSDK;

Vue.use(VueSweetalert2, {
  position: 'top-end',
  ...SWAL_OPTIONS,
});

Vue.use(VueAnalytics, {
  id: GOOGLE_TRACKING_ID,
  router,
});

const requireComponent = require.context(
  './totoro/components',
  false,
  /[A-Z]\w+\.vue$/,
);

requireComponent.keys().forEach((filename: string) => {
  const componentConfig = requireComponent(filename);
  const componentName = camelCase(
    `Toto${filename.split('/')[1].replace(/\.\w+$/, '')}`,
  );

  Vue.component(
    componentName,
    componentConfig.default || componentConfig,
  );
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
