<script lang="jsx">
import UiButton from './UiButton.vue';

export default {
  name: 'UiPanes',

  components: {
    UiButton,
  },

  render() {
    return (
    <div class="panes">
      {this.panes.map((el, ind, arr) => {
        return (
        <div class="pane">
          <div class="pane__content">{el}</div>
          <div class="pane__controls">
            <UiButton class={ind == 0 && 'pane__disabled-button'}
              variant="secondary" block onClick={() => this.up(ind)}>Up</UiButton>
            <UiButton class={ind == (arr.length - 1) && 'pane__disabled-button'}
              variant="danger" block onClick={() => this.down(ind)}>Down</UiButton>
          </div>
        </div>)
      })}
    </div>)
  },

  data() {
    return {
      panes: this.$slots.default()
    };
  },

  methods: {
    up(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i - 1];
      this.panes[i - 1] = temp;
    },
    down(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i + 1];
      this.panes[i + 1] = temp;
    },
  },
};
</script>

<style scoped>
.panes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pane {
  display: flex;
  flex-direction: row;
  border: 3px solid var(--blue-light);
}

.pane__content {
  border-right: 3px solid var(--blue-light);
  padding: 8px;
  flex: 1 0;
}

.pane__controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: min-content;
}

.pane__disabled-button {
  visibility: hidden;
}
</style>
