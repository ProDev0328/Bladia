<template>
  <div>
    <div class="w-full flex flex-col bg-white z-20">
      <div
        class="
          w-full
          h-16
          relative
          flex
          justify-center
          items-center
          bg-main
          rounded-b-20px
        "
      >
        <icon-left-new class="absolute left-5" @click="onGoback" />
        <p class="text-lg font-semibold text-white">
          {{ brand }} - {{ model }}
        </p>
      </div>
    </div>
    <div class="p-5">
      <div class="mt-4">
        <p class="text-left text-sm text-dark font-semibold">
          {{ i18n.$t("Are you carrying something on your vehicle") }}?<br />
          ( {{ i18n.$t("roof box") }}, {{ i18n.$t("bicycle") }},
          {{ i18n.$t("bagage") }}... )
        </p>
        <toggle-button
          v-model="isRoof"
          class="mt-2"
          :value="isRoof"
          @onchange="
            (val) => {
              isRoof = val;
            }
          "
        />
      </div>
      <div v-if="isRoof" class="mt-4">
        <p class="text-left text-sm text-dark font-semibold">
          {{ i18n.$t("Additional Height") }}
        </p>
        <select-size
          :items="additionalHeightUnits"
          @on-select-value="onSelectRoofHeight"
        />
      </div>
      <div v-if="isRoof" class="mt-4">
        <p class="text-left text-sm text-dark font-semibold">
          {{ i18n.$t("Additional Length") }}
        </p>
        <select-size
          :items="additionalLengthUnits"
          @on-select-value="onSelectRoofLength"
        />
      </div>
      <div class="mt-4">
        <p class="text-left text-sm text-dark font-semibold">
          {{ i18n.$t("Caravan") }} / {{ i18n.$t("Trailer") }}
          {{ i18n.$t("characteristics") }}
        </p>
        <toggle-button
          v-model="isTrailer"
          class="mt-2"
          :value="isTrailer"
          @onchange="
            (val) => {
              isTrailer = val;
            }
          "
        />
        <div v-if="isTrailer" class="mt-4">
          <button
            v-for="unit in caravanFeatures"
            :key="unit"
            class="border mt-1 text-left p-2 rounded w-1/2"
            :class="{
              'font-bold text-main border-main': unit === caravanFeature,
              'text-dark': unit !== caravanFeature,
            }"
            @click="() => onSelectCaravanFeature(unit)"
          >
            {{ i18n.$t(unit) }}
          </button>
        </div>
      </div>
      <div v-if="isTrailer" class="mt-4">
        <p class="text-left text-sm text-dark font-semibold">
          {{ i18n.$t("Additional Height") }}
        </p>
        <select-size
          :items="trailerHeightUnits"
          @on-select-value="onSelectTrHeight"
        />
      </div>
      <div v-if="isTrailer" class="mt-4">
        <p class="text-left text-sm text-dark font-semibold">
          {{ i18n.$t("Additional Length") }}
        </p>
        <select-size
          :items="trailerLengthUnits"
          @on-select-value="onSelectTrLength"
        />
      </div>
      <div class="mt-5 mb-2">
        <button
          type="button"
          class="
            h-12
            w-full
            text-lg
            rounded-xl
            font-medium
            uppercase
            shadow
            text-white
            duration-300
            bg-main
            hover:bg-opacity-90
          "
          @click="onConfirm"
        >
          {{ i18n.$t("Confirm") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  GET_SELECTED_VEHICLE_BRAND,
  GET_SELECTED_MODEL,
  GET_SELECTED_CODE,
  SET_SELECTED_VEHICLE,
  SET_INSTALLATION,
  SET_INSTALLATION_RETURN,
} from "../../../store/data/types";
import ToggleButton from "../../../components/UI/ToggleButton.vue";
import SelectSize from "../../../components/Vehicle/SelectSize.vue";
import IconLeftNew from "../../../components/Icons/IconLeftNew.vue";
import useI18n from "../../../plugins/useI18n";
export default {
  components: {
    SelectSize,
    IconLeftNew,
    ToggleButton,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const brand = computed(() => store.getters[GET_SELECTED_VEHICLE_BRAND]);
    const model = computed(() => store.getters[GET_SELECTED_MODEL]);
    const code = computed(() => store.getters[GET_SELECTED_CODE]);
    const isRoof = ref(false);
    const isTrailer = ref(false);
    const roofHeight = ref("50CM");
    const roofLength = ref("50CM");
    const trHeight = ref("2.00M");
    const trLength = ref("2.00M");
    const caravanFeature = ref("Trailer");
    const { i18n } = useI18n();
    function onSelectRoofHeight(val) {
      roofHeight.value = val;
    }

    function onSelectRoofLength(val) {
      roofLength.value = val;
    }

    function onSelectCaravanFeature(val) {
      caravanFeature.value = val;
    }

    function onSelectTrHeight(val) {
      trHeight.value = val;
    }

    function onSelectTrLength(val) {
      trLength.value = val;
    }

    function onGoback() {
      router.push({ path: `/vehicle/model` });
    }

    async function onConfirm() {
      const vehicles = {};
      vehicles.code = code.value;
      if (isTrailer.value) {
        vehicles.trailer = {
          height: trHeight.value,
          length: trLength.value,
          type: caravanFeature.value.toLowerCase()
        };
      }

      if (isRoof.value) {
        vehicles.roof = {
          height: roofHeight.value,
          length: roofLength.value,
        };
      }

      await store.commit(SET_SELECTED_VEHICLE, vehicles);

      store.commit(SET_INSTALLATION, null);
      store.commit(SET_INSTALLATION_RETURN, null);

      router.push({ path: `/` });
    }

    return {
      brand,
      model,
      code,
      isRoof,
      isTrailer,
      caravanFeature,
      trHeight,
      trLength,
      onSelectRoofHeight,
      onSelectRoofLength,
      onSelectCaravanFeature,
      onSelectTrHeight,
      onSelectTrLength,
      onConfirm,
      onGoback,
      i18n,
    };
  },
  data() {
    return {
      additionalHeightUnits: [
        "50CM",
        "75CM",
        "100CM",
        "125CM",
        "150CM",
        "175CM",
      ],
      additionalLengthUnits: [
        "0CM",
        "50CM",
        "75CM",
        "100CM",
        "125CM",
        "150CM",
        "175CM",
      ],
      trailerHeightUnits: [
        "0M",
        "1.00M",
        "2.00M",
        "2.50M",
        "3.00M",
      ],
      trailerLengthUnits: [
        "2.00M",
        "3.00M",
        "4.00M",
        "5.00M",
        "6.00M",
        "7.00M",
      ],
      caravanFeatures: ["Trailer", "Caravan"],
    };
  },
};
</script>