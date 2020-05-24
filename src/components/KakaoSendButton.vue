<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class KakaoSendButton extends Vue {
  onClick() {
    this.$emit('click');
  }
}
</script>

<template>
  <button
    @click="onClick"
    class="button"
  >
    <img
      class="button__logo"
      src="@/assets/etcs/kakao-icon.png"
    >
    카카오톡으로 전송하기
  </button>
</template>

<style lang="scss" scoped>
.button {
  background-color: #f5e14b;
  outline: none;
  border: none;
  padding: 10px 13px;
  font-size: 1.2rem;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;

  &__logo {
    height: 1rem;
    margin-right: 7px;
  }
}
</style>
