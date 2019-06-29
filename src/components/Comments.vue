<template lang="pug">
  .comments
    .comment(v-for="comment in comments" :key="comment.id")
      .comment__user {{ `${comment.user.lastName} ${comment.user.firstName} ${comment.user.patronymic}` }}
      .comment__age {{ comment.user.age }}
      .comment__date {{ comment.appointment.dateTimestamp }}
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
</style>
