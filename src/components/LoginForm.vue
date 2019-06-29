<template lang="pug">
  card.login-form
    sign-in-form
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import SignInForm from '@/components/SignInForm.vue';

@Component({
  components: {
    Card,
    SignInForm,
  },
})
export default class LoginForm extends Vue {}
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  width: 400px;
  min-height: 300px;
  margin-bottom: 5rem;
  flex-shrink: 0;

  &__body {
    flex-grow: 1;
  }
}
</style>
