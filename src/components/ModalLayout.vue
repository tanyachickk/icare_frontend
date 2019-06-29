<template lang="pug">
  transition(appear name="modal")
    .modal-mask(@click.self="$emit('close')")
      card.modal(:class="[size]")
        .modal-header
          slot(name="header")
        .modal-body
          slot(name="body")
        .modal-footer
          slot(name="footer")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class ModalLayout extends Vue {
  @Prop({ type: String, default: 'static' })
  private size!: 'small' | 'static' | 'large';
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(100, 100, 100, 0.3);
  transition: opacity 0.3s ease;
}

.modal {
  transition: all 0.3s ease;
  &.static {
    width: 400px;
  }
  &.large {
    width: 650px;
  }
  &.small {
    width: 250px;
  }
}

.modal-enter,
.modal-leave-active {
  transform: translate(0, 0);
  opacity: 1;
}

.modal-enter .modal,
.modal-leave-active .modal {
  transform: translate(0, 50%);
  opacity: 0;
}
</style>
