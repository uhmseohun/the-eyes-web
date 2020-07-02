<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import KakaoSendButton from '@/components/KakaoSendButton.vue';

@Component({
  components: { KakaoSendButton },
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
  filters: {
    filterTime(value: number) {
      const minutes = String(Math.floor(value / 60)).padStart(2, '0');
      const seconds = String(value % 60).padStart(2, '0');
      return `${minutes}분 ${seconds}초`;
    },
  },
})
export default class GameFinished extends Vue {}
</script>

<template>
  <div class="container">
    <h1 class="form__title">⏰ 당신의 기록</h1>
    <h2 class="form__description">{{ playedTime | filterTime }}나 버티셨네요! 🎉</h2>

    <h1 class="form__title">⏰ 친구의 기록</h1>
    <h2 class="form__description">{{ playedTime | filterTime }}나 버티셨네요! 🎉</h2>
    <kakao-send-button>
      카카오톡으로 친구에게 자랑하기
    </kakao-send-button>
  </div>
</template>

<style lang="scss" scoped>
