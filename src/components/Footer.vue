<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<template>
  <footer class="footer">
    <span class="footer__item footer__copyright">© 2020 Seohun Uhm.</span>
    <a
      href="https://uhmtoto.space"
      class="footer__item footer__homepage"
    >
      📦 To Homepage
    </a>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: flex-start;
  padding: 0 5rem;

  &__item {
    font-size: 1.3rem;

    &:not(:last-child) {
      margin-right: 25px;
    }
  }

  &__homepage {
    font-size: 1.3rem;
    color: #000000;
    text-decoration: none;
  }
}
</style>
