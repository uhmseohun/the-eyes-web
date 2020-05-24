<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ServiceTitle extends Vue {}
</script>

<template>
  <h1 class="title">
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
.title {
  background-color: #f5d5cb;
  padding: 5px;
  margin-top: 0;
  width: fit-content;
  user-select: none;
}
</style>
