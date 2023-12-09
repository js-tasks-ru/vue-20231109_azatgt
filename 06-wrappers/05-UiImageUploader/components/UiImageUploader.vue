<template>
  <div class="image-uploader">
    <label class="image-uploader__preview"
           :class="{'image-uploader__preview-loading': uploading}"
           :style="fileUrl ? `--bg-url: url(${fileUrl})` : ''">
      <span class="image-uploader__text">
        {{ text }}
      </span>
      <input ref="input" type="file" accept="image/*"
             class="image-uploader__input" v-bind="$attrs"
             @change="onChange" @click="onClick"/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  data() {
    return {
      fileUrl: this.preview,
      uploading: false,
    }
  },

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['select', 'upload', 'error', 'remove'],

  computed: {
    text() {
      if (this.fileUrl) return 'Удалить изображение'
      if (this.uploading) return 'Загрузка...'
      return 'Загрузить изображение'
    }
  },

  methods: {
    onChange(event) {
      
      const file = event.target.files[0]

      if (!this.uploader)
        this.fileUrl = URL.createObjectURL(file)
      else {
        this.uploading = true
        this.uploader(file)
          .then(result => {
            this.fileUrl = result.image
            this.$emit('upload', result)
          })
          .catch(err => {
            this.$refs.input.value = null
            this.$emit('error', err)
          })
          .finally(() => this.uploading = false)
      }
      this.$emit('select', file)
    },
    onClick(event) {
      if (this.fileUrl) {
        event.preventDefault()
        this.$refs.input.value = null
        this.fileUrl = null
        this.$emit('remove')
      }
    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
