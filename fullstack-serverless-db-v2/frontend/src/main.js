import Vue from 'vue';
import App from './App.vue';
// import 'env';
import './style/app.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
