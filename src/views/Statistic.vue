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
        chart-container(v-for="question in questions" :key="`${question.id}-${filteredAnswers.length}`" :title="question.text")
          rating-chart(v-if="question.type === 'rating'" :rating="resultRating[question.id]")
          options-chart(v-if="question.type === 'singleselect'" :options="resultOptions[question.id]")
          comments(v-if="question.type === 'comment'" :comments="resultComments(question)")
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
  @State('appointments')
  private appointments!: any[];
  @State('answers')
  private answers!: any[];
  @State('options')
  private options!: any[];

  filterStartDate = moment()
    .subtract(1, 'week')
    .toDate();
  filterEndDate = moment().toDate();
  filterSpecialization: any = null;
  filterDoctor: any = null;

  get filteredAnswers() {
    return this.answers.filter((answer) => {
      const date: any = moment(+answer.appointment.dateTimestamp);
      const isBetween = date.isBetween(this.filterStartDate, this.filterEndDate, null, '[]');
      if (!isBetween) {
        return false;
      }
      const appointment = this.appointments.find((a) => a.id === answer.appointment.id);
      if (this.filterDoctor !== null && appointment && this.filterDoctor.id !== appointment.doctor.id) {
        return false;
      }
      if (
        this.filterSpecialization !== null &&
        appointment &&
        this.filterSpecialization.id !== appointment.doctor.specialization.id
      ) {
        return false;
      }
      return true;
    });
  }

  get resultOptions() {
    const questions = this.questions.filter((q) => q.type === 'singleselect');
    const result: any = {};
    questions.forEach((q) => {
      result[q.id] = {};
      q.options.forEach((option: any) => {
        result[q.id][option.id] = 0;
      });
      this.filteredAnswers.forEach((a) => {
        if (a.question.id === q.id) {
          result[q.id][a.value]++;
        }
      });
    });
    const a: any = {};
    questions.forEach((q) => {
      const answers = q.options;
      answers.forEach((v: any) => {
        if (!a[q.id]) {
          a[q.id] = {};
        }
        a[q.id][v.text] = result[q.id][v.id];
      });
    });
    return a;
  }

  get resultRating() {
    const questions = this.questions.filter((q) => q.type === 'rating');
    const result: any = {};
    questions.forEach((q) => {
      result[q.id] = {};
      for (let i = 1; i <= 5; i++) {
        result[q.id][i] = 0;
      }
      this.filteredAnswers.forEach((a) => {
        if (a.question.id === q.id) {
          result[q.id][+a.value]++;
        }
      });
    });
    return result;
  }

  resultComments(question: any) {
    return this.filteredAnswers.filter((a) => a.question.id === question.id);
  }
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
