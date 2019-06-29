<template lang="pug">
  .content
    page-title
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageTitle from '@/components/PageTitle.vue';

@Component({
  components: {
    PageTitle,
  },
})
export default class Settings extends Vue {}
</script>
