import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/k/:kuji_id/:card_id',
    name: 'card',
    component: () => import(/* webpackChunkName: "card" */ '../views/Card.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
