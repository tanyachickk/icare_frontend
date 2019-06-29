<template lang="pug">
  card.wrapper
    .filter__field
      form-control-label Период
      .period
        datepicker(:value="startDate" :language="ru" @input="$emit('update:start-date', $event)")
        .divider
        datepicker(:value="endDate" :language="ru" @input="$emit('update:end-date', $event)")
    .filter__field
      form-control-label Специализация
      vue-select(:value="specialization" :options="specializations" label="title" @input="$emit('update:specialization', $event)")
    .filter__field
      form-control-label Врач
      vue-select(:value="doctor" :disabled="!specialization" :options="doctorOptions" label="title" @input="$emit('update:doctor', $event)")
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import moment from 'moment';
import Card from '@/components/Card.vue';
import FormControlLabel from '@/components/FormControlLabel.vue';
import VueSelect from 'vue-select';
import Datepicker from 'vuejs-datepicker';
import * as ru from 'vuejs-datepicker/dist/locale/translations/ru.js';
import 'vue-select/dist/vue-select.css';

@Component({
  components: {
    Card,
    FormControlLabel,
    Datepicker,
    VueSelect,
  },
})
export default class StatisticFilter extends Vue {
  @Prop()
  private startDate!: any;
  @Prop({ default: moment().toDate() })
  private endDate!: any;
  @Prop()
  private specialization!: any;
  @Prop()
  private doctor!: any;

  @State('specializations')
  specializations!: any[];
  @State('doctors')
  doctors!: any[];

  @Watch('specialization')
  onChangeSpecialization() {
    this.$emit('update:doctor', null);
  }

  ru = ru;

  get doctorOptions() {
    if (!this.specialization) {
      return [];
    }
    return this.doctors
      .filter((doctor) => doctor.specialization.id === this.specialization.id)
      .map((doctor) => ({
        ...doctor,
        title: `${doctor.lastName} ${doctor.firstName} ${doctor.patronymic}`,
      }));
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 1.5rem;
}
.filter {
  &__field {
    margin-bottom: 0.5rem;
  }
}
.period {
  display: flex;
  align-items: center;
}
.divider {
  flex-shrink: 0;
  height: 1px;
  width: 0.5rem;
  margin: 0 0.5rem;
  background-color: var(--gray);
}
</style>

<style lang="scss">
.vdp-datepicker input,
.vs__dropdown-toggle {
  padding: 0.4375rem 0.75rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--dark-gray);
  background-color: white;
  border: 1px solid var(--light-gray);
  font-weight: 300;
  will-change: border-color, box-shadow;
  border-radius: 0.25rem;
  box-shadow: none;
  transition: box-shadow 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06), border 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
  &:focus {
    outline: none;
    color: var(--dark-gray);
    border-color: var(--primary);
    box-shadow: 0 0.313rem 0.719rem rgba(0, 123, 255, 0.1), 0 0.156rem 0.125rem rgba(0, 0, 0, 0.06);
  }
}
.vdp-datepicker input {
  width: 130px;
}
.vs__dropdown-menu {
  font-size: 0.8125rem;
  color: var(--dark-gray);
  font-weight: 300;
}
</style>

