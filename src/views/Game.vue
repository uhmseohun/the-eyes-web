<script lang="ts">
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component } from 'vue-property-decorator';
import { RecordRTCPromisesHandler } from 'recordrtc';

@Component({
  filters: {
    filterTime(value: number) {
      const minutes = String(Math.floor(value / 60)).padStart(2, '0');
      const seconds = String(value % 60).padStart(2, '0');
      return `${minutes}분 ${seconds}초`;
    },
  },
  computed: {
    roomName() {
      const { roomKey } = this.$store.state;
      return roomKey.substring(0, roomKey.length - 13);
    },
  },
})
export default class Game extends Vue {
  stream!: any;

  recorder!: any;

  sleep = (m: number) => new Promise((r) => setTimeout(r, m));

  contentType = ({ _boundary: b }: any) => `multipart/form-data; boundary=${b}`;

  startTime: number;

  playingTime = 0;

  counterpartTime: number = undefined;

  async emitClosed(isGiveup: boolean) {
    const { $io } = Vue.prototype;
    $io.emit('eyeClosed', this.playingTime);

    this.$store.dispatch('leaveRoom');
    this.$router.push({
      name: 'GameFinished',
      params: {
        me: this.playingTime,
        counterpart: this.counterpartTime,
        giveUp: isGiveup,
      },
    });
  }

  async created() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { exact: 400 },
        height: { exact: 400 },
      },
    });
    this.$refs.video.srcObject = this.stream;
    this.recorder = new RecordRTCPromisesHandler(this.stream, {
      type: 'video',
    });

    this.startTime = new Date().getTime();

    setInterval(() => {
      const currentTime = new Date().getTime();
      this.playingTime = Math.floor((currentTime - this.startTime) / 1000);
    }, 1000);

    await this.sleep(2000);

    const { $io } = Vue.prototype;
    $io.on('eyeClosed', (data) => {
      this.counterpartTime = data;
    });

    try {
      // eslint-disable-next-line
      while (!await this.isEyeclosed());
    } catch (error) {
      await this.emitClosed(false);
      throw new Error(error.message);
    }

    await this.emitClosed(false);
  }

  async isEyeclosed() {
    this.recorder.startRecording();
    await this.sleep(1000);
    await this.recorder.stopRecording();

    const blob = await this.recorder.getBlob();
    const data = new FormData();
    data.append('video', blob, 'user_video.webm');

    const { $vision } = Vue.prototype;
    const { data: { result } } = await $vision.post('/predict', data, {
      headers: { 'Content-Type': this.contentType(data) },
    });

    return result.filter((v: number) => v === 0).length > 1;
  }
}
</script>

<template>
  <div class="container">
    <div class="section section-left">
      <video class="webcam" ref="video" autoplay />
    </div>
    <div class="section section-right">
      <div class="header">
        <h1 class="title">{{ roomName }}에서 게임 플레이 중</h1>
        <h2 class="timer">⏰ {{ playingTime | filterTime }}</h2>
      </div>
      <toto-button
        class="button-giveup"
        @click="emitClosed(true)"
      >
        포기하기
      </toto-button>
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
  width: 40vw;
  min-height: 550px;
  display: unset;

  &-left {}
  &-right {
    display: flex;
    flex-direction: column;
  }
}

.title {
  margin-right: 15px;
}

.webcam {
  width: 550px;
  height: 550px;
}

.button {
  &-giveup {
    margin-top: auto;
  }
}
</style>
