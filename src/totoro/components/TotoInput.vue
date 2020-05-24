<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  @Prop({ default: '' }) private value!: string;

  @Prop({ default: '' }) private placeholder!: string;

  @Prop({ default: 'text' }) private type!: string;

  innerValue = '';

  @Watch('value')
  onPropPassed(value: string) {
    this.innerValue = value;
  }

  @Watch('innerValue')
  onValueChanged(value: string) {
    this.$emit('input', value);
  }
}
</script>

<template>
  <input
    class="input"
    v-model="innerValue"
    :type="type"
    :placeholder="placeholder"
  >
</template>

<style lang="scss" scoped>
.input {
  outline: none;
  padding: 0 13px 10px 5px;
  border: 0;
  border-bottom: 1px solid #000000;
  font-size: 1.3rem;

  &::placeholder {
    color: #797979;
  }
}
</style>
