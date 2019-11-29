import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import kujis from './kujis';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    kujis,
  },
});
