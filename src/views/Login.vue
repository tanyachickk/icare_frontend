<template lang="pug">
  .login-page
    img.login-page__main-image(src="~@/assets/images/med_img.png")
    img.login-page__icon-image(src="~@/assets/images/mobile_s.png")
    login-form.login-page__form
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginForm from '@/components/LoginForm.vue';

@Component({
  components: {
    LoginForm,
  },
})
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.login-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: auto;
  background-color: #f5f6f8;

  &__main-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 30vw;
    height: 30vw;
  }
  &__icon-image {
    position: absolute;
    top: 17vw;
    left: 17vw;
    width: 10vw;
    height: 10vw;
  }
  &__form {
    position: absolute;
    top: 30vh;
    right: 25vw;
  }
}
</style>
