<template>
  <button @click="$emit('update:count', ++localCount)">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  data() {
    return {
      localCount: this.count
    }
  },

  props: {
    count: { type: Number, default: 0 }
  },
  emits: ['update:count'],

  watch: {
    count(newValue) {
      this.localCount = newValue
    }
  }
};
</script>
