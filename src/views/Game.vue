<script lang="ts">
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component } from 'vue-property-decorator';
import { RecordRTCPromisesHandler } from 'recordrtc';

@Component
export default class Game extends Vue {
  stream!: any;

  recorder!: any;

  sleep = (m: number) => new Promise((r) => setTimeout(r, m));

  contentType = ({ _boundary: b }: any) => `multipart/form-data; boundary=${b}`;

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
  }

  async getResult() {
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
  <video ref="video" width="400" height="400" autoplay />
</template>
