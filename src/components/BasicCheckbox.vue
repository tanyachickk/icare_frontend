<template lang="pug">
  .checkbox(
    :class="[isActive ? 'active' : '', isDisabled ? 'disabled' : '', size]"
    @click="onClick"
  )
    .checkbox__control
    .checkbox__label
      slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {},
})
export default class BasicCheckbox extends Vue {
  @Prop({ type: Boolean, default: false })
  private isActive!: boolean;
  @Prop({ type: Boolean, default: false })
  private isDisabled!: boolean;
  @Prop({ type: String, default: 'default' })
  private size!: 'small' | 'default' | 'large';

  private onClick() {
    if (!this.isDisabled) {
      this.$emit('click');
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  &__control {
    position: relative;
    width: 1.125rem;
    height: 1.125rem;
    background-color: white;
    border-radius: 0.2rem;
    border: 1px solid var(--light-gray);
    transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
    box-shadow: none;
    &::after {
      content: '';
      position: absolute;
      border: 2px solid white;
      border-top: none;
      border-left: none;
      top: 50%;
      left: 50%;
      width: 0.25rem;
      height: 0.5rem;
      opacity: 0;
      transform-origin: center;
      transform: scale(0) translate(-50%, -60%) rotate(0deg);
      transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
    }
  }
  &__label {
    padding-left: 0.5em;
  }
  &.active {
    .checkbox__control {
      border-color: var(--primary);
      background-color: var(--primary);
      &::after {
        opacity: 1;
        transform: scale(1) translate(-50%, -60%) rotate(35deg);
      }
    }
  }
  &.disabled {
    cursor: default;
    .checkbox__control {
      opacity: 0.7;
    }
    .checkbox__label {
      opacity: 0.5;
    }
  }
  &.small {
    .checkbox__control {
      width: 0.75rem;
      height: 0.75rem;
      &::after {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
}
</style>
