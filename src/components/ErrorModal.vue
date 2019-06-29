<template lang="pug">
  modal-layout(@close="$emit('close')")
    basic-modal-header(slot="header" @close="$emit('close')") Error!
    basic-modal-body(slot="body")
      slot
        .error-body
          .error-body__icon
            i.material-icons close
          .error-body__text
            slot(name="error-message")
    basic-modal-footer(slot="footer")
      basic-button.modal-footer__button(
        theme="primary"
        :outline="true"
        @click="$emit('back')"
      ) Go back
      basic-button.modal-footer__button(
        theme="primary"
        @click="$emit('retry')"
      ) Try again
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ModalLayout from '@/components/ModalLayout.vue';
import BasicModalHeader from '@/components/BasicModalHeader.vue';
import BasicModalBody from '@/components/BasicModalBody.vue';
import BasicModalFooter from '@/components/BasicModalFooter.vue';
import BasicButton from '@/components/BasicButton.vue';

@Component({
  components: {
    ModalLayout,
    BasicModalHeader,
    BasicModalBody,
    BasicModalFooter,
    BasicButton,
  },
})
export default class ErrorModal extends Vue {}
</script>

<style lang="scss" scoped>
.error-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.75rem;
    width: 3rem;
    height: 3rem;
    border: 3px solid var(--light-danger);
    border-radius: 50%;
    .material-icons {
      color: var(--light-danger);
      font-size: 2.25rem;
    }
  }
}
</style>
