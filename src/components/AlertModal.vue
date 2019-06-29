<template lang="pug">
  modal-layout(@close="$emit('close')")
    basic-modal-header(slot="header" @close="$emit('close')")
    basic-modal-body(slot="body")
      slot
        .alert-body
          .alert-body__icon
            i.material-icons error_outline
          .alert-body__text
            slot(name="alert-message")
    basic-modal-footer(slot="footer")
      basic-button.modal-footer__button(
        theme="primary"
        @click="$emit('close')"
      ) Ok
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
export default class AlertModal extends Vue {}
</script>

<style lang="scss" scoped>
.alert-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.75rem;
    .material-icons {
      color: var(--light-gray);
      font-size: 6rem;
    }
  }
}
</style>
