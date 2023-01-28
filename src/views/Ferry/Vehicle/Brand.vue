<template>
  <div>
    <div class="w-full flex flex-col bg-white">
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
          {{ i18n.$t("Vehicle Brands") }}
        </p>
      </div>
      <div class="flex border-b border-disable">
        <card-type
          v-for="(key, vt) in vehicleTypes"
          :key="vt"
          :vehicle-icon="key"
          :vehicle-type="vt"
          :selected="vt == selectedType"
          @click="() => onSelectType(vt)"
        />
      </div>
    </div>
    <div class="p-5">
      <spinner v-if="isLoading" />
      <list-brand :items="brands" />
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useI18n from "../../../plugins/useI18n";
import {
  GET_VEHICLE,
  SET_SELECTED_VEHICLE_TYPE,
  GET_SELECTED_VEHICLE_TYPE,
  GET_VEHICLE_BRANDS,
  FETCH_VEHICLE_BRANDS,
  GET_FILTERED_VEHICLE_BRANDS,
} from "../../../store/data/types";

import IconLeftNew from "../../../components/Icons/IconLeftNew.vue";
import CardType from "../../../components/Vehicle/CardType.vue";
import ListBrand from "../../../components/Vehicle/ListBrand.vue";
import CarIcon from "../../../assets/car.png";
import VanIcon from "../../../assets/van.png";
import MotoIcon from "../../../assets/moto.png";
import CamperIcon from "../../../assets/camper.png";
import Spinner from "../../../components/UI/Spinner.vue";
import { useMeta } from "vue-meta";
import { baseLinks, commonMetaTags } from "../../../plugins/utility";

export default {
  name: "Vehicle",
  components: {
    CardType,
    ListBrand,
    IconLeftNew,
    Spinner,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { i18n } = useI18n();

    useMeta({
      title: i18n.$t("SEO")["select_vehicle_brand"]["title"],
      link: baseLinks("vehicle/brand"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["select_vehicle_brand"]["description"],
        },
      ].concat(
        commonMetaTags(
          i18n.$t("SEO")["select_vehicle_brand"]["title"],
          i18n.$t("SEO")["select_vehicle_brand"]["description"]
        )
      ),
    });

    const selectedType = computed(
      () => store.getters[GET_SELECTED_VEHICLE_TYPE]
    );

    const vehicles = computed(() => store.getters[GET_VEHICLE]);
    const allBrands = computed(() => store.getters[GET_VEHICLE_BRANDS]);
    if (allBrands.value.length == 0) {
      store.dispatch(FETCH_VEHICLE_BRANDS);
    }
    const isLoading = computed(() => allBrands.value.length == 0);
    const brands = computed(() => {
      return store.getters[GET_FILTERED_VEHICLE_BRANDS];
    });

    function onSelectType(val) {
      store.commit(SET_SELECTED_VEHICLE_TYPE, val);
    }

    function onGoback() {
      router.push({ path: `/` });
    }

    return {
      vehicles,
      brands,
      selectedType,
      onSelectType,
      onGoback,
      i18n,
      CarIcon,
      VanIcon,
      MotoIcon,
      CamperIcon,
      IconLeftNew,
      isLoading,
    };
  },
  data() {
    return {
      vehicleTypes: {
        Car: CarIcon,
        Van: VanIcon,
        Moto: MotoIcon,
        Camper: CamperIcon,
      },
    };
  },
};
</script>