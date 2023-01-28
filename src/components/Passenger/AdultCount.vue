<template>
  <div class="flex justify-between py-5">
    <div class="flex items-center">
      <div class="mr-2">
        <icon-male v-if="gender == 'Man'" />
        <icon-female v-else />
      </div>
      <p class="font-medium text-base text-main text-left">
        {{ i18n.$t("Adults") }} {{ i18n.$t(gender) }}
        <br />
        <small> {{ age }} {{ i18n.$t("years") }} </small>
      </p>
    </div>
    <div class="flex items-center">
      <button
        class="
          flex
          justify-center
          items-center
          text-white text-base
          w-5
          h-5
          rounded-full
        "
        :class="adultOrder === 0 ? 'bg-disable' : 'bg-theme-red'"
        @click="onDecrementAdult"
      >
        &ndash;
      </button>
      <div class="w-12 text-center text-gray text-base rounded-full">
        {{ adultOrder }}
      </div>
      <button
        class="
          flex
          justify-center
          items-center
          bg-theme-red
          text-white text-base
          w-5
          h-5
          rounded-full
        "
        @click="onIncrementAdult"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useI18n from "../../plugins/useI18n";
import IconMale from "../Icons/IconMale.vue";
import IconFemale from "../Icons/IconFemale.vue";
export default {
  components: {
    IconMale,
    IconFemale,
  },
  props: {
    gender: {
      type: String,
      default: "Man",
    },
    init: {
      type: Number,
      default: 0,
    },
    age: {
      type: String,
      default: "+18",
    },
  },
  setup(props, { emit }) {
    const adultOrder = ref(props.init);
    const { i18n } = useI18n();
    function onIncrementAdult() {
      adultOrder.value++;
      emit("onchange", adultOrder.value);
    }

    function onDecrementAdult() {
      adultOrder.value > 0 && adultOrder.value--;
      emit("onchange", adultOrder.value);
    }

    return {
      adultOrder,
      onIncrementAdult,
      onDecrementAdult,
      i18n,
    };
  },
};
</script>