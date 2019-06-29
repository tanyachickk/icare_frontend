<template lang="pug">
  .content
    page-title
    .charts
      chart-container(title="Количество принятых пациентов по дням")
        appointments-count-chart
      chart-container(v-for="question in questions" :key="question.id" :title="question.text")
        rating-chart(v-if="question.type === 'rating'")
        options-chart(v-if="question.type === 'singleselect'")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import PageTitle from '@/components/PageTitle.vue';
import ChartContainer from '@/components/ChartContainer.vue';
import RatingChart from '@/components/charts/RatingChart';
import OptionsChart from '@/components/charts/OptionsChart';
import AppointmentsCountChart from '@/components/charts/AppointmentsCountChart';

@Component({
  components: {
    PageTitle,
    ChartContainer,
    RatingChart,
    OptionsChart,
    AppointmentsCountChart,
  },
})
export default class Statistic extends Vue {
  @State('questions')
  private questions!: any[];
}
</script>

<style lang="scss" scoped>
.content {
  overflow: auto;
}
.charts {
  margin-top: 2rem;
  padding: 0 2rem;
}
</style>
