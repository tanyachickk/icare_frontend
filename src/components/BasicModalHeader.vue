<template lang="pug">
  .modal-header
    .modal-header__title
      slot
    .modal-header__close(@click="$emit('close')")
      i.material-icons.modal-header__icon close
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class BasicModalHeader extends Vue {}
</script>

<style lang="scss" scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--light-gray);
  &__title {
    padding: 0.75rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    color: --var(--dark-gray);
  }
  &__close {
    align-self: flex-start;
    padding: 0.5rem;
    cursor: pointer;
    transition: color 0.2s ease;
    &:hover {
      .modal-header__icon {
        color: var(--secondary);
      }
    }
  }
  &__icon {
    color: var(--gray);
    font-size: 1.25rem;
  }
}
</style>
