import Vue from 'vue';
import Vuex from 'vuex';
import productsModule from './store/products/module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    shopifyProducts:productsModule,
  },
});
