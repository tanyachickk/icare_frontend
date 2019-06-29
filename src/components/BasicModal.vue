<template lang="pug">
  modal-layout(@close="$emit('close')")
    basic-modal-header(slot="header" @close="$emit('close')")
      slot(name="header")
    basic-modal-body(slot="body")
      slot(name="body")
    basic-modal-footer(slot="footer" @cancel="$emit('close')" @save="$emit('save')")
      slot(name="footer")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ModalLayout from '@/components/ModalLayout.vue';
import BasicModalHeader from '@/components/BasicModalHeader.vue';
import BasicModalBody from '@/components/BasicModalBody.vue';
import BasicModalFooter from '@/components/BasicModalFooter.vue';

@Component({
  components: {
    ModalLayout,
    BasicModalHeader,
    BasicModalBody,
    BasicModalFooter,
  },
})
export default class BasicModal extends Vue {}
</script>

<style lang="scss" scoped></style>
