<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ServiceTitle from '@/components/ServiceTitle.vue';

@Component({
  components: { ServiceTitle },
})
export default class Main extends Vue {}
</script>

<template>
  <div class="container">
    <div class="brand">
      <service-title class="brand__title-1">
        지금, ✨<strong>눈싸움</strong>✨을
      </service-title>
      <service-title class="brand__title-2">
        친구와 웹으로 즐겨 보세요
      </service-title>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.brand {
  margin-top: 100px;

  &__title {
    &-1,
    &-2 {
      font-weight: normal;
    }

    &-2 {
      margin-left: 30px;
    }
  }
}
</style>
