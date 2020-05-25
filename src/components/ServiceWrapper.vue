<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ServiceTitle from '@/components/ServiceTitle.vue';

@Component({
  components: { ServiceTitle },
})
export default class ServiceWrapper extends Vue {
  @Prop({ default: 'default.svg' }) private illust!: string;
}
</script>

<template>
  <div class="container">
    <div class="content">
      <service-title>
        <slot name="title" />
      </service-title>

      <slot name="content" />
    </div>

    <img
      class="illust"
      :src="require(`@/assets/illusts/${this.illust}`)"
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
