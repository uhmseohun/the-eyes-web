<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  computed: {
    playedTime() {
      return this.$route.params.playedTime;
    },
  },
  created() {
    if (!this.$route.params.playedTime) {
      this.$router.push({ name: 'Main' });
      throw new Error('잘못된 접근입니다. 메인 페이지로 돌아갑니다.');
    }
  },
})
export default class GameFinished extends Vue {}
</script>

<template>
  <div class="container">
    {{ playedTime }}
  </div>
</template>

<style lang="scss" scoped>
</style>
