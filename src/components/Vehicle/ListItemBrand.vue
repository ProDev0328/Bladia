<template>
  <li
    class="
      w-full
      flex
      items-center
      rounded-md
      p-3
      shadow-card
      mb-2.5
      cursor-pointer
    "
    @click="onSelectBrand"
  >
    <div
      class="
        w-14
        h-7
        rounded-md
        bg-red-500
        flex
        justify-center
        items-center
        px-0.5
        box-content
        mr-4
        bg-indigo-50
      "
    >
      <img :src="logoImg" @error="replaceByDefault" />
    </div>
    <p class="text-md font-semibold text-dark text-left">
      {{ brand }}
    </p>
  </li>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CarIcon from "../../assets/car.png";
import {
  SET_SELECTED_VEHICLE_BRAND,
  GET_SELECTED_VEHICLE_BRAND,
} from "../../store/data/types";

export default {
  props: {
    brand: {
      type: String,
      default: "Unknown",
    },
    logo: {
      type: String,
      default: CarIcon,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const selected = computed(() => store.getters[GET_SELECTED_VEHICLE_BRAND]);
    const logoImg = ref(props.logo);

    async function onSelectBrand() {
      await store.commit(SET_SELECTED_VEHICLE_BRAND, props.brand);
      router.push({ path: `/vehicle/model` });
    }
    function replaceByDefault(e) {
      logoImg.value = CarIcon;
      //console.log('error',e)
    }
    return { logoImg, onSelectBrand, selected, replaceByDefault };
  },
};
</script>
