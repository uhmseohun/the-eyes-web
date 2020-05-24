<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { WEBAPP_URL, QRCODE_API_URI } from '@/constants';
import KakaoSendButton from '@/components/KakaoSendButton.vue';
import ServiceWrapper from '@/components/ServiceWrapper.vue';
import store from '@/store';

@Component({
  components: {
    ServiceWrapper,
    KakaoSendButton,
  },
})
export default class CreateGame extends Vue {
  roomName = '';

  roomKey: null | string = null;

  pending = false;

  get qrCodeURL() {
    return QRCODE_API_URI + this.generatedURL;
  }

  get generatedURL() {
    return `${WEBAPP_URL}/join-game/${this.roomKey}`;
  }

  get generated() {
    return this.roomKey !== null && !this.pending;
  }

  async onClickCreation() {
    this.pending = true;

    this.roomKey = await store.dispatch('createRoom', this.roomName);

    const qrImage = new Image();
    qrImage.src = this.qrCodeURL;
    qrImage.onload = () => {
      this.pending = false;
    };

    const { $io } = Vue.prototype;
    $io.on('newUser', () => {
      this.$router.push({ path: '/game' });
    });
  }

  shareByKakao() {
    const { $kakao } = Vue.prototype;
    $kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '친구가 눈싸움 게임에 초대했어요!',
        description: '지금 접속하세요',
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
            webUrl: this.generatedURL,
            mobileWebUrl: this.generatedURL,
          },
        },
      ],
    });
  }
}
</script>

<template>
  <service-wrapper illust="create-game.svg" >
    <template v-slot:title>
      🖼 새로운 게임 생성하기
    </template>

    <template v-slot:content>
      <div class="form__item">
        <toto-input
          v-model="roomName"
          class="form__input"
          placeholder="방 제목을 입력하세요"
        />
        <toto-button
          @click="onClickCreation"
          :disabled="roomName.length === 0"
          :pending="pending"
        >
          생성하기
        </toto-button>
      </div>

      <div v-if="generated" class="form__item">
        <div class="share-options">
          {{ generatedURL }}
          <img class="qr-code" :src="qrCodeURL">
          <kakao-send-button @click="shareByKakao"/>
        </div>
      </div>
    </template>
  </service-wrapper>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.form {
  width: 30%;
  min-height: 60vh;

  &__item {
    margin-top: 100px;
    display: flex;
    width: 100%;
  }

  &__input {
    flex: 1;
  }
}

.illust {
  height: 60vh;
}

.share-options {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.qr-code {
  width: 150px;
  height: 150px;
}
</style>
