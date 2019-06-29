<template lang="pug">
  .page
    .page__header
      page-title
      basic-button.create-button(@click="isShowModal = true") Создать вопрос
    .page__body
      card.page__filter
        card-header(slot="header") Фильтр
        card-body
          polls-filter(
            :sex.sync="filterSex"
            :age.sync="filterAge"
            :specialization.sync="filterSpecialization"
            :specializations="specializationOptions"
          )
      .page__questions(v-if="questions.length")
        polls-question-view(v-for="question in filteredQuestions" :key="question.id" :question="question" @edit="isShowModal = true" @delete="deleteQuestion(question.id)")
      .page__no-questions(v-else) Для выбранной аудитории пока нет ни одного вопроса. Создайте вопросы или измените параметры фиьтрации
    question-modal(v-if="isShowModal" :specializations="specializationOptions" @close="isShowModal = false" @create="createQuestion")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import PageTitle from '@/components/PageTitle.vue';
import Card from '@/components/Card.vue';
import CardHeader from '@/components/CardHeader.vue';
import CardBody from '@/components/CardBody.vue';
import BasicButton from '@/components/BasicButton.vue';
import PollsFilter from '@/components/PollsFilter.vue';
import PollsQuestionView from '@/components/PollsQuestionView.vue';
import QuestionModal from '@/components/QuestionModal.vue';

@Component({
  components: {
    PageTitle,
    Card,
    CardHeader,
    CardBody,
    BasicButton,
    PollsFilter,
    PollsQuestionView,
    QuestionModal,
  },
})
export default class Polls extends Vue {
  @State('questions')
  private questions!: any[];
  @State('specializations')
  private specializations: any;

  @Action('createQuestion')
  private addQuestion: any;
  @Action('deleteQuestion')
  private deleteQuestion: any;

  private isShowModal = false;
  private filterSex = null;
  private filterAge = [0, 100];
  private filterSpecialization: any = null;

  get specializationOptions() {
    return [{ id: null, title: 'Любая' }, ...this.specializations];
  }

  get sortedQuestions() {
    return this.questions.sort((a, b) => b.id - a.id);
  }

  get filteredQuestions() {
    return this.sortedQuestions.filter((question) => {
      if (this.filterSex && question.sex && this.filterSex !== question.sex) {
        return false;
      }
      if (this.filterSpecialization && question.specializations && question.specializations.length) {
        return this.filterSpecialization.every(
          (fs: number) => !!question.specializations.find((s: any) => s.id === fs),
        );
      }
      if (
        question.minAge &&
        question.maxAge &&
        !(question.minAge >= this.filterAge[0] && question.maxAge <= this.filterAge[1])
      ) {
        return false;
      }
      return true;
    });
  }

  private createQuestion(data: any, options: string[]) {
    this.addQuestion({ data, options });
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__header {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    padding-right: 2rem;
    padding-bottom: 1.5rem;
    z-index: 1;
  }
  &__body {
    flex-grow: 1;
    padding: 0rem 2rem 2rem 24rem;
    overflow: auto;
  }
  &__filter {
    position: absolute;
    top: 150px;
    left: calc(280px + 2rem);
    margin-right: 2rem;
    width: 20rem;
    align-self: flex-start;
  }
  &__questions {
    width: 100%;
    flex-grow: 1;
  }
  &__no-questions {
    width: 100%;
    color: var(--dark-gray);
    text-align: center;
  }
}
.create-button {
  align-self: flex-end;
}
</style>
