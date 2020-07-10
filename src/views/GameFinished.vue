<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import KakaoSendButton from '@/components/KakaoSendButton.vue';
import { WEBAPP_URL } from '@/constants';

@Component({
  components: { KakaoSendButton },
  computed: {
    myTime() {
      return this.$route.params.me;
    },
    counterpartTime() {
      return this.$route.params.counterpart;
    },
    isGiveUp() {
      return this.$route.params.giveUp;
    },
  },
  created() {
    if (!this.$route.params.me) {
      this.$router.push({ name: 'Main' });
      throw new Error('잘못된 접근입니다. 메인 페이지로 돌아갑니다.');
    }
    const { $io } = Vue.prototype;
    $io.on('eyeClosed', (data: number) => {
      this.$route.params.counterpart = String(data);
    });
  },
  filters: {
    filterTime(value: number) {
      const minutes = String(Math.floor(value / 60)).padStart(2, '0');
      const seconds = String(value % 60).padStart(2, '0');
      return `${minutes}분 ${seconds}초`;
    },
  },
  methods: {
    shareByKakao() {
      const { $kakao } = Vue.prototype;
      $kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: 'ㅋㅋ1',
          description: 'ㅋㅋ2',
          imageUrl: WEBAPP_URL, // TEMP
          link: {
            webUrl: WEBAPP_URL,
            mobileWebUrl: WEBAPP_URL,
          },
        },
        buttons: [
          {
            title: '접속하기',
            link: {
              webUrl: WEBAPP_URL,
              mobileWebUrl: WEBAPP_URL,
            },
          },
        ],
      });
    },
  },
})
export default class GameFinished extends Vue {}
</script>

<template>
  <div class="container">
    <h1 class="form__title">⏰ 당신의 기록</h1>
    <h2 class="form__description">{{ myTime | filterTime }}나 버티셨네요! 🎉</h2>

    <h1 class="form__title">⏰ 친구의 기록</h1>
    <h2 class="form__description">{{ counterpartTime | filterTime }}나 버텼어요! 🎉</h2>
    <kakao-send-button @click="shareByKakao">
      카카오톡으로 친구에게 자랑하기
    </kakao-send-button>
  </div>
</template>

<style lang="scss" scoped>
