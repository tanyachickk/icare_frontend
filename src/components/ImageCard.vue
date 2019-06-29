<template lang="pug">
  .image-card(:style="{ width: `${width}${measure}`, height: `${height}${measure}` }")
    .image-card__content(v-if="src" :style="contentStyle")
    .image-card__placeholder(v-else)
      slot
        .image-placeholder
          i.material-icons.image-placeholder__icon(:style="`font-size: ${width / 2}${measure}`") landscape
          .image-placeholder__text(:style="`font-size: ${width / 6}${measure}; padding-bottom: ${height / 10}${measure}`") No image
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ImageCard extends Vue {
  @Prop({ type: Number, default: 3 })
  private width!: number;
  @Prop({ type: Number, default: 3 })
  private height!: number;
  @Prop({ type: Number, default: 0 })
  private rotate!: number;
  @Prop({ type: String, default: 'rem' })
  private measure!: any;
  @Prop({ type: String, default: '' })
  private src!: string;

  get contentStyle() {
    return this.src
      ? {
          backgroundImage: `url(${this.src})`,
          transform: `rotate(${this.rotate}deg)`,
        }
      : {};
  }
}
</script>

<style lang="scss" scoped>
.image-card {
  border-radius: 0.25rem;
  border: 1px solid var(--light-gray);
  &__content {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
  &__placeholder {
    height: 100%;
  }
}
.image-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--light-gray);
}
</style>
