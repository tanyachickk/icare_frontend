<template lang="pug">
  .content
    page-title
    .body
      statistic-filter.filter(
        :start-date.sync="filterStartDate"
        :end-date.sync="filterEndDate"
        :specialization.sync="filterSpecialization"
        :doctor.sync="filterDoctor"
      )
      .charts
        chart-container(title="Количество принятых пациентов по дням")
          appointments-count-chart
        chart-container(v-for="question in questions" :key="question.id" :title="question.text")
          rating-chart(v-if="question.type === 'rating'")
          options-chart(v-if="question.type === 'singleselect'")
          comments(v-if="question.type === 'comment'" :comments="answers.filter((a) => a.question.id === question.id)")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import moment from 'moment';
import PageTitle from '@/components/PageTitle.vue';
import StatisticFilter from '@/components/StatisticFilter.vue';
import ChartContainer from '@/components/ChartContainer.vue';
import RatingChart from '@/components/charts/RatingChart';
import OptionsChart from '@/components/charts/OptionsChart';
import AppointmentsCountChart from '@/components/charts/AppointmentsCountChart';
import Comments from '@/components/Comments.vue';

@Component({
  components: {
    PageTitle,
    StatisticFilter,
    ChartContainer,
    RatingChart,
    OptionsChart,
    AppointmentsCountChart,
    Comments,
  },
})
export default class Statistic extends Vue {
  @State('questions')
  private questions!: any[];
  @State('answers')
  private answers!: any[];

  filterStartDate = moment()
    .subtract(1, 'week')
    .toDate();
  filterEndDate = moment().toDate();
  filterSpecialization = null;
  filterDoctor = null;
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  overflow: auto;
}
.body {
  display: flex;
  width: 100%;
}
.filter {
  position: sticky;
  top: 2rem;
  margin: 1rem 0 1rem 2rem;
  max-width: 350px;
  align-self: flex-start;
}
.charts {
  margin-top: 1rem;
  padding: 0 2rem;
  flex-grow: 1;
}
</style>
