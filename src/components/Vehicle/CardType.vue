<template>
  <div
    class="
      w-1/4
      h-16
      relative
      flex flex-col
      items-center
      text-disable
      cursor-pointer
      border-b-2 border-white
    "
    :class="{ 'border-main': selected }"
  >
    <img :src="vehicleIcon" class="absolute top-6 transform -translate-y-1/2" />
    <p
      class="text-sm absolute bottom-2 vehicle-type"
      :class="{ 'text-main font-semibold': selected }"
    >
      {{ i18n.$t(vehicleType) }}
    </p>
  </div>
</template>

<script>
import useI18n from "../../plugins/useI18n";
export default {
  props: {
    vehicleType: {
      type: String,
    },
    vehicleIcon: {
      type: String,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { i18n } = useI18n();
    return { i18n };
  },
};
</script>
<style scoped>
.vehicle-type {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  max-width: 75%;
}
</style>