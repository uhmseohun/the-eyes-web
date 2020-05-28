<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ServiceWrapper from '@/components/ServiceWrapper.vue';

interface RankResponse {
  name: string;
  record: number;
}

@Component({
  components: { ServiceWrapper },
  filters: {
    filterRecord: (value: number) => {
      if (value > 60) return `${Math.floor(value / 60)}분 ${value % 60}초`;
      return `${value}초`;
    },
  },
})
export default class Leaderboard extends Vue {
  records: Array<RankResponse> = [];

  async created() {
    const { $api } = Vue.prototype;
    const { data: { records } } = await $api.get('/leaderboard');
    this.records = records;
  }
}
</script>

<template>
  <service-wrapper>
    <template v-slot:content>
      <table class="leaderboard">
        <thead class="leaderboard__header">
          <tr>
            <th class="leaderboard__header__item" style="width: 15%;">등수</th>
            <th class="leaderboard__header__item" style="width: 60%;">이름</th>
            <th class="leaderboard__header__item" style="width: 25%;">기록</th>
          </tr>
        </thead>
        <tbody class="leaderboard__header__body">
          <tr
            :key="`row-${index}`"
            v-for="(record, index) in records"
            class="leaderboard__body"
          >
            <td class="leaderboard__body__item">{{ index + 1 }}위</td>
            <td class="leaderboard__body__item">{{ record.name }}</td>
            <td class="leaderboard__body__item">{{ record.time | filterRecord }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </service-wrapper>
</template>

<style lang="scss" scoped>
.leaderboard {
  width: 100%;
  margin-top: 60px;

  &__header {
    background-color: #f5d5cb;

    &__item {
      font-size: 1.3rem;
      text-align: left;
      font-weight: normal;
      padding: 5px 10px;
      line-height: 35px;
      text-align: center;
    }
  }

  &__body {
    &__item {
      font-size: 1.2rem;
      text-align: left;
      line-height: 30px;
      padding: 5px 10px;
      text-align: center;
    }
  }
}
</style>
