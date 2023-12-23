<script>
import { compile, defineComponent, h } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    renderFunction() {
      console.log(compile(this.template));
      return compile(this.template)
    },
    _component() {
      return defineComponent({
        name: '_component',
        components: this.components,
        props: ['bindings'],
        render: this.renderFunction
      })
    }
  },

  render() {
    return h(this._component, { bindings: this.bindings })
  }
};
</script>
