<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ServiceWrapper from '@/components/ServiceWrapper.vue';

@Component({ components: { ServiceWrapper } })
export default class About extends Vue {}
</script>

<template>
  <service-wrapper>
    <template v-slot:content>
      <div class="content__description">
        <p>눈싸움 또는 눈겨룸은 보통 두 사람이 상대방의 눈을 응시하면서 누가 더 오랫동안 눈을 감지 않고 버티는지 겨루는 놀이이다.</p>
        <p>먼저 눈을 깜빡인 사람이 진다. 일부 사람들은 실눈을 떠 교묘하게 이기는 방식을 사용하는데,</p>
        <p>이것을 이용하는 등 규칙을 변형하여 눈을 깜박이는 것 말고도 다른 것까지도 금지하는 눈싸움도 있다. 눈쌈, 눈씨름이라고도 한다.</p>
      </div>

      <div class="content__meta">
        <span class="content__meta__text">
          출처 :
          <a
            href="https://ko.wikipedia.org/wiki/눈싸움_(응시)"
            target="_blank"
          >
            위키백과
          </a>
        </span>
      </div>
    </template>
  </service-wrapper>
</template>

<style lang="scss" scoped>
.content {
  &__description {
    font-size: 1.3rem;
    line-height: 1.6;
  }

  &__meta {
    display: flex;

    &__text {
      margin-left: auto;
      text-decoration: none;
    }
  }
}
</style>
