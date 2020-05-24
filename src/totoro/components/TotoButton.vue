<script lang="ts">
import {
  Vue, Component, Prop,
} from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop({ default: false }) private disabled!: boolean;

  @Prop({ default: false }) private pending!: boolean;

  get computedStyle() {
    return {
      'button': true, // eslint-disable-line
      'button-disabled': this.disabled,
      'button-pending': this.pending,
    };
  }

  onClick() {
    if (this.disabled || this.pending) return;
    this.$emit('click');
  }
}
</script>

<template>
  <button
    :class="computedStyle"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  outline: none;
  padding: 0 13px 10px 13px;
  border: 0;
  border-bottom: 1px solid #000000;
  font-size: 1.3rem;
  transition: color 0.3s;
  transition: border-bottom 0.3s;
  cursor: pointer;

  &-disabled,
  &-pending {
    color: #aaaaaa;
    border-bottom: 1px solid #aaaaaa;
  }

  &-disabled {
    cursor: not-allowed;
  }

  &-pending {
    cursor: wait;
  }
}
</style>
