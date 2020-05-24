<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Error404 extends Vue {}
</script>

<template>
  <div class="container">
    <div class="section">
      <img class="illust" src="@/assets/illusts/404-error.svg">
      <h2 class="description">요청하신 페이지를 찾을 수 없습니다.</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.illust {
  width: 30vw;
}

.description {
  margin-top: 5rem;
  font-weight: lighter;
}
</style>
