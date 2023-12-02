<template>
  <div class="toasts">
    <UiToast v-for="item in toastList" :text="item.text" :type="item.type" :key="item.id"/>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from './UiToast.vue';

let counter = 0;

export default {
  name: 'TheToaster',
  data() {
    return {
      toastList: []
    }
  },

  props: {
    delay: { type: Number, default: 5000 }
  },

  components: { UiIcon, UiToast },
  methods: {
    toast(text, type = 'info', delay = this.delay) {
      const id = counter++
      this.toastList.push({ id, text, type })

      setTimeout(() => {
        this.toastList = this.toastList.filter(t => t.id !== id)
      }, delay)
    },

    success(text) {
      this.toast(text, 'success')
    },
    error(text) {
      this.toast(text, 'error')
    },
    warn(text) {
      this.toast(text, 'warning')
    },
    info(text) {
      this.toast(text, 'info')
    },
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

</style>
