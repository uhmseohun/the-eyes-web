<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ServiceTitle from '@/components/ServiceTitle.vue';

@Component({
  components: { ServiceTitle },
  computed: {
    serviceTitle() {
      return this.$route.meta.title;
    },
    illustName() {
      return this.$route.meta.illust || 'default.svg';
    },
  },
})
export default class ServiceWrapper extends Vue {}
</script>

<template>
  <div class="container">
    <div class="content">
      <service-title>
        {{ serviceTitle }}
      </service-title>

      <slot name="content" />
    </div>

    <img
      class="illust"
      :src="require(`@/assets/illusts/${this.illustName}`)"
    >
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.content {
  width: 33%;
  min-height: 60vh;
}

.illust {
  max-height: 60vh;
  width: 30vw;
}
</style>
