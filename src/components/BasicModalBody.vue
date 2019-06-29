<template lang="pug">
  .modal-body
    slot
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class BasicModalBody extends Vue {}
</script>

<style lang="scss" scoped>
.modal-body {
  padding: 1.75rem 2rem;
  color: var(--secondary);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
}
</style>
