<template lang="pug">
  .field
    form-control-label Специализация
    .field__controls(:class="isInline && 'inline'")
      basic-checkbox.field__control(
        v-for="item in list"
        :key="item.id || 0"
        :is-active="Array.isArray(value) ? value.includes(item.id) : item.id === value"
        @click="onChange(item.id)"
      ) {{ item.title }}
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import BasicCheckbox from '@/components/BasicCheckbox.vue';
import FormControlLabel from '@/components/FormControlLabel.vue';

@Component({
  components: {
    BasicCheckbox,
    FormControlLabel,
  },
})
export default class SpecializationControl extends Vue {
  @Prop({ default: null })
  private value!: number[] | null;
  @Prop({ default: () => [] })
  private list!: any[];
  @Prop({ default: false })
  private isInline!: boolean;

  private onChange(id: number | null) {
    if (id === null) {
      this.$emit('input', id);
    } else if (this.value === null) {
      this.$emit('input', [id]);
    } else {
      const result = this.value.includes(id) ? this.value.filter((v) => v !== id) : [...this.value, id];
      this.$emit('input', result);
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  &__controls {
    &.inline {
      display: flex;
      flex-wrap: wrap;
      .field__control {
        margin-right: 1.5rem;
      }
    }
  }
  &__control {
    color: var(--secondary);
    font-size: 0.8rem;
    flex-shrink: 0;
    padding: 0.25rem 0;
  }
}
</style>
