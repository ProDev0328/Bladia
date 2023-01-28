<template>
  <div class="shadow-card rounded-md p-2 px-5">
    <div class="flex relative items-center justify-around">
      <icon-car-new class="flex-shrink-0" />
      <div class="px-2">
        <p class="text-base font-semibold">
          {{ vehicle[0].brand_name }} - {{ vehicle[0].model }}
        </p>
        <br>
        <p class="text-sm font-medium">
          {{ i18n.$t('vehicle.length.max') }} : 
          {{
            (
              Math.round(parseFloat(vehicle && vehicle[0].length) * 10) / 10
            ).toFixed(2)
          }}
          / {{ i18n.$t('vehicle.height.max') }} : 
          {{
            (
              Math.round(parseFloat(vehicle && vehicle[0].height) * 10) / 10
            ).toFixed(2)
          }}
        </p>
      </div>
      <icon-check v-if="identification !== ''" class="flex-shrink-0" />
    </div>
    <br>
    <input
      v-model="identification"
      type="text"
      class="w-full text-center border focus:outline-none mr-2"
      :placeholder="i18n.$t('vehicle.identification')"
      @input="onChange"
    />
    <br>
  </div>
</template>

<script>
import { ref } from "vue";
import IconCheck from "../Icons/IconCheck.vue";
import IconCarNew from "../Icons/IconCarNew.vue";
import { useI18n } from "../../plugins/i18nPlugin";
export default {
  components: {
    IconCheck,
    IconCarNew,
  },
  props: {
    vehicleId: {
      type: String,
      default: "",
    },
    vehicle: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const i18n = useI18n();
    const identification = ref(props.vehicleId);

    emit("on-change", identification.value);

    function onChange(e) {
      emit("on-change", e.target.value);
    }
    return {
      identification,
      onChange,
      i18n,
    };
  },
};
</script>