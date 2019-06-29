<template lang="pug">
  card.question
    .question__header
      .question__title {{ question.text }}
      .question__controls
        .question__control(@click="$emit('edit')")
          font-awesome-icon(icon="edit")
        .question__control(@click="$emit('delete')")
          font-awesome-icon(icon="trash-alt")
    .question__options(v-if="options")
      .question__option(v-for="option in options" :key="option.id") {{ option.text }}
    .question__tags
      .question__tag(v-if="!question.sex") Пол: Любой
      .question__tag.red(v-else) Пол: {{ sex }}
      .question__tag.green(v-if="question.minAge && question.maxAge") Возраст: {{ age }}
      .question__tag(v-else) Возраст: Любой
      .question__tag(v-if="!question.specializations || !question.specializations.length") Специализация: Любая
      .question__tag.orange(v-for="specialization in question.specializations" :key="specialization.id") {{ specialization.title }}
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Card from '@/components/Card.vue';

library.add(faTrashAlt);
library.add(faEdit);

@Component({
  components: {
    FontAwesomeIcon,
    Card,
  },
})
export default class PollsQuestionView extends Vue {
  @Prop() private question!: any;

  get options() {
    return this.question.options ? [...this.question.options].sort((a, b) => a.order - b.order) : null;
  }

  get sex() {
    const genderTitles: any = { male: 'Мужской', female: 'Женский' };
    return this.question.sex ? genderTitles[this.question.sex] : 'Любой';
  }

  get age() {
    return this.question.minAge && this.question.maxAge ? `${this.question.minAge} - ${this.question.maxAge}` : 'Любой';
  }
}
</script>

<style lang="scss" scoped>
.question {
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  min-height: 5rem;
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__title {
    position: relative;
    font-weight: 500;
    color: var(--dark-gray);
    margin-bottom: 0.5rem;
  }
  &__controls {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
  }
  &__control {
    padding: 0.5rem;
    color: var(--gray);
    transition: color 0.2s ease;
    cursor: pointer;
    &:hover {
      color: var(--blue);
    }
  }
  &__option {
    position: relative;
    padding-left: 2rem;
    color: var(--gray);
    font-size: 0.875rem;
    line-height: 2;
    &::before {
      content: '';
      position: absolute;
      left: 1rem;
      top: 50%;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      border: 1px solid var(--primary);
      transform: translateY(-50%);
    }
  }
  &__tags {
    display: flex;
    flex-wrap: wrap;
  }
  &__tag {
    font-size: 0.7rem;
    padding: 0.25rem 0.7rem;
    background-color: var(--light-secondary);
    color: var(--secondary);
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    &.red {
      background-color: var(--light-danger);
    }
    &.green {
      background-color: var(--light-success);
    }
    &.orange {
      background-color: var(--light-accent);
    }
  }
}
</style>
