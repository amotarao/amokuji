<template>
  <div class="card">
    <transition name="page-fade">
      <page-wrapper v-if="pageNum % 2 === 0" :page="pageA" @to="to" />
    </transition>
    <transition name="page-fade">
      <page-wrapper v-if="pageNum % 2 === 1" :page="pageB" @to="to" />
    </transition>
  </div>
</template>

<script>
import PageWrapper from '../components/PageWrapper';
import { cards } from '../data/example';

export default {
  components: {
    PageWrapper,
  },
  data() {
    return {
      pageNum: 0,
      pageAId: 'top',
      pageBId: 'top',
      pageHistory: ['top'],
      kuji: {
        cards,
      },
    };
  },
  computed: {
    card() {
      return this.kuji.cards.find(({ id }) => id === this.$route.params.card_id);
    },
    pageA() {
      return this.card.pages.find(page => page.id === this.pageAId);
    },
    pageB() {
      return this.card.pages.find(page => page.id === this.pageBId);
    },
  },
  methods: {
    to(id) {
      this.pageNum++;
      if (this.pageNum % 2 === 0) {
        this.pageAId = id;
      } else {
        this.pageBId = id;
      }
      this.pageHistory.push(id);
      this.$store.dispatch('kujis/addLog', {
        type: 'pageHistory',
        date: new Date(),
        kuji: this.$route.params.kuji_id,
        card: this.$route.params.card_id,
        pageHistory: this.pageHistory,
        user: this.$store.state.auth.user ? this.$store.state.auth.user.uid : null,
      });
    },
  },
  async mounted() {
    await this.$store.dispatch('auth/signIn');
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  position: relative;
}

.page-fade-enter-active {
  transition: all 0.8s ease-out 0.2s;
  pointer-events: none;
}
.page-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  pointer-events: none;
}
.page-fade-enter,
.page-fade-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
