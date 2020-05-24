<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { RouteItem } from '@/interfaces';

@Component
export default class Header extends Vue {
  routes: Array<RouteItem> = [
    { title: '게임 생성하기', to: '/create-game' },
    { title: '순위판 보기', to: '/leaderboard' },
    { title: '눈싸움에 대하여', to: '/about' },
  ]

  computedItemStyle({ to }: RouteItem) {
    return {
      'header__routes__item': true, // eslint-disable-line
      'header__routes__item-active': this.$route.path === to,
    };
  }
}
</script>

<template>
  <header class="header">
    <router-link to="/">
      <h1 class="header__brand">👁 The Eyes</h1>
    </router-link>

    <nav class="header__routes">
      <router-link
        :key="`route-item-${index}`"
        v-for="(route, index) in routes"
        :to="route.to"
        :class="computedItemStyle(route)"
      >
        <span>{{ route.title }}</span>
      </router-link>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0 5rem;
  user-select: none;

  &__brand {
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
    display: inline;
  }

  &__routes {
    margin-left: auto;

    &__item {
      font-size: 1.4rem;
      padding: 5px;
      user-select: none;

      &-active {
        background-color: #f5d5cb;
      }

      &:not(:last-of-type) {
        margin-right: 3.5rem;
      }
    }
  }
}

a {
  color: black;
  text-decoration: none;
}
</style>
