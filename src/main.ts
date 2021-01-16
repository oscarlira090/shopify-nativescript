import Vue from 'nativescript-vue'
import App from './components/App.vue'
import VueDevtools from 'nativescript-vue-devtools'
import RadDataForm from 'nativescript-ui-dataform/vue';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';

//use icons {
TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './fonts/font-awesome.css',
  //'ion': './ionicons.css'
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);
//use icons}

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

//float botton
Vue.registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);
//forms
Vue.use(RadDataForm);

Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
