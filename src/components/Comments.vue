<template lang="pug">
  .comments
    .no-comment(v-if="!comments.length") На этот вопрос пока никто не ответил
    .comment(v-for="comment in comments" :key="comment.id")
      .comment__header
        img.comment__avatar(src="~@/assets/images/user-placeholder.jpg")
        .comment__info
          .comment__user {{ `${comment.user.lastName} ${comment.user.firstName} ${comment.user.patronymic}` }}
          .comment__date Был на приеме {{ moment(+comment.appointment.dateTimestamp).format('DD.MM.YYYY') }}
      .comment__value {{ comment.value }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class Comments extends Vue {
  @Prop()
  private comments!: any[];

  moment = moment;
}
</script>

<style lang="scss" scoped>
.title {
  color: #3d5170;
  font-size: 1.625rem;
  font-weight: 500;
  padding: 1.5rem 0 1rem 2rem;
}
.no-comment {
  color: var(--gray);
  font-size: 0.875rem;
  text-align: center;
  margin: 1rem;
}
.comment {
  &:not(:last-child) {
    border-bottom: 1px solid var(--light-gray);
    margin-bottom: 2rem;
  }
  &__header {
    display: flex;
    align-items: center;
  }
  &__avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  &__info {
    margin-left: 1rem;
  }
  &__user {
    font-size: 1.125;
    color: var(--dark-gray);
    margin-bottom: 0.5rem;
  }
  &__date {
    font-size: 0.875rem;
    color: var(--gray);
    line-height: 1.5;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }
  &__value {
    margin: 1rem 0;
    font-size: 1.125;
    color: var(--gray);
  }
}
</style>
