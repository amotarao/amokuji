import { auth } from '../modules/firebase';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async signIn({ commit }) {
      await auth.signInAnonymously().catch(error => {
        console.error(error);
      });
      auth.onAuthStateChanged(user => {
        commit('setUser', user);
      });
    },
  },
};
