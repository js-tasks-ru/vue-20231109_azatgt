<template>
  <UiInput :model-value="model"
           @input="model = $event.target.valueAsNumber"
           :type="type">
    <template v-for="slotName of Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  components: { UiInput },
  props: {
    modelValue: Number,
    type: {
      type: String,
      default: 'date',
      validator: (val) => ['date', 'time', 'datetime-local'].includes(val)
    },
    step: String,
  },
  emits: ['update:modelValue'],

  computed: {
    model: {
      get() {
        if ([null, undefined].includes(this.modelValue)) return ''

        const isoDate = new Date(this.modelValue).toISOString()
        switch(this.type) {
          case 'date': return isoDate.slice(0, 10)
          case 'datetime-local': return isoDate.slice(0, 16)
          case 'time':
            return isoDate.slice(11, this.step && this.step % 60 !== 0 ? 19 : 16)
        }
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
};
</script>
