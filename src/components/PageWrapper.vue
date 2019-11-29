<template>
  <div class="page-wrapper">
    <top-template v-if="template === 'top'" v-bind="page" @to="to" />
  </div>
</template>

<script>
import TopTemplate from './PageTemplates/Top';

export default {
  components: {
    TopTemplate,
  },
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
  computed: {
    template() {
      return this.page.template;
    },
  },
  methods: {
    to(id) {
      this.$emit('to', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
