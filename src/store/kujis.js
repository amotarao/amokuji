import { firestore } from '../modules/firebase';

export default {
  namespaced: true,
  actions: {
    async addLog(_, data) {
      await firestore.collection('logs').add(data);
    },
  },
};
