<template>
  <div class="top">
    <template v-for="(block, i) in blocks">
      <h2 class="head" v-if="block.type === 'head'" :key="i">{{ block.value }}</h2>
      <p class="text" v-if="block.type === 'text'" :key="i">{{ block.value }}</p>
      <p class="big-emoji" v-if="block.type === 'big-emoji'" :key="i">{{ block.value }}</p>
      <div class="inline-actions" v-if="block.type === 'inline-actions'" :key="i">
        <div class="inner">
          <button
            class="action-button"
            :data-size="block.size || 'default'"
            v-for="(action, j) in block.actions"
            :key="j"
            @click="onActionClick(action.to, action.value)"
          >
            {{ action.value }}
          </button>
        </div>
      </div>
      <div class="actions" v-if="block.type === 'actions'" :key="i">
        <div v-for="(action, j) in block.actions" :key="j">
          <button
            class="action-button"
            :data-size="block.size || 'default'"
            @click="onActionClick(action.to, action.value)"
          >
            {{ action.value }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: '',
    },
    blocks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    onActionClick(to, value) {
      this.$store.dispatch('kujis/addLog', {
        type: 'action',
        date: new Date(),
        kuji: this.$route.params.kuji_id,
        card: this.$route.params.card_id,
        page: this.id,
        to,
        value,
        user: this.$store.state.auth.user ? this.$store.state.auth.user.uid : null,
      });
      this.$emit('to', to);
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  overflow: auto;
  padding: 32px;
  text-align: center;
  width: 100%;

  > * + * {
    margin-top: 32px;
  }
}

.head {
  font-size: 32px;
  font-weight: 900;
  white-space: pre-wrap;
}

.text {
  font-size: 24px;
  font-weight: 400;
  white-space: pre-wrap;
}

.big-emoji {
  font-size: 160px;
  line-height: 1;
}

.inline-actions {
  > .inner {
    margin: -8px;
  }
}

.actions {
  > div {
    & + & {
      margin-top: 8px;
    }
  }
}

$default-color: rgba(#000, 0.02);
$blink-color: rgba(#4fc3f7, 0.2);

@keyframes blink {
  0% {
    background: $default-color;
  }
  80% {
    background: $default-color;
  }
  85% {
    background: $blink-color;
  }
  90% {
    background: $default-color;
  }
  95% {
    background: $blink-color;
  }
  100% {
    background: $default-color;
  }
}

.action-button {
  align-items: center;
  animation: blink 5s linear infinite;
  appearance: none;
  background: $default-color;
  border: 1px solid $default-color;
  border-radius: 9999px;
  color: inherit;
  display: inline-flex;
  font-family: inherit;
  font-size: 32px;
  justify-content: center;
  line-height: 1;
  margin: 8px;
  padding: 16px;

  &[data-size='large'] {
    font-size: 64px;
  }

  &[data-size='small'] {
    padding: 8px;
  }
}
</style>
