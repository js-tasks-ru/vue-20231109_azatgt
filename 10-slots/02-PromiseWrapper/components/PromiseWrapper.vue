<template>
  <slot v-if="!result && !error" name="pending"/>
  <slot v-if="result" :result="result" name="fulfilled"/>
  <slot v-if="error" :error="error" name="rejected"/>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  data() {
    return {
      result: null,
      error: null,
    }
  },

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  watch: {
    promise: {
      handler() {
        this.result = null
        this.error = null
        
        this.promise.then(
          result => this.result = result,
          error => this.error = error
        )
      },
      immediate: true
    }
  }
};
</script>
