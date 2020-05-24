<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<template>
  <div id="app">
    <Header class="app__header" />
    <router-view class="app__content" />
    <Footer class="app__footer" />
  </div>
</template>

<style lang="scss">
@import './styles/normalize.css';
@import './styles/font.scss';
@import './styles/theme.scss';

.app {
  &__header {
    height: 8rem;
  }

  &__content {
    box-sizing: border-box;
    min-height: calc(100vh - 12rem);
    padding: 0 5rem;
  }

  &__footer {
    height: 4rem;
  }
}
</style>
