<template lang="pug">
  .modal-footer
    slot
      basic-button.modal-footer__button(
        theme="primary"
        :outline="true"
        @click="$emit('cancel')"
      ) Cancel
      basic-button.modal-footer__button(
        theme="primary"
        @click="$emit('save')"
      ) Ok
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BasicButton from '@/components/BasicButton.vue';

@Component({
  components: {
    BasicButton,
  },
})
export default class BasicModalFooter extends Vue {}
</script>

<style lang="scss" scoped>
.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid var(--light-gray);
  padding: 0.75rem 1rem;
  &__button {
    &:last-child {
      margin-left: 0.5rem;
    }
  }
}
</style>
