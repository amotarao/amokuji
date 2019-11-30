<template>
  <div class="card">
    <transition name="page-fade" mode="out-in">
      <template v-for="page in pages">
        <page-wrapper v-if="currentPageId === page.id && pageNum % 2" :key="`${page.id}-a`" :page="page" @to="to" />
        <page-wrapper v-if="currentPageId === page.id && !(pageNum % 2)" :key="`${page.id}-b`" :page="page" @to="to" />
      </template>
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
    pages() {
      return this.card.pages;
    },
    currentPageId() {
      return this.pageHistory[this.pageHistory.length - 1];
    },
  },
  methods: {
    to(id) {
      this.pageHistory.push(id);
      this.pageNum++;
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
  transition: all 0.8s ease-out;
  z-index: 1;
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
