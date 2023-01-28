<template>
  <div class="relative py-5">
    <div class="flex justify-between">
      <div class="flex items-center">
        <div class="mr-2">
          <icon-baby />
        </div>
        <p class="font-medium text-base text-main text-left">
          {{ i18n.$t("Baby") }}
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
          :class="babyOrder === 0 ? 'bg-disable' : 'bg-theme-red'"
          @click="onDecrementBaby"
        >
          &ndash;
        </button>
        <div class="w-12 text-center text-gray text-base rounded-full">
          {{ babyOrder }}
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
          @click="onIncrementBaby"
        >
          +
        </button>
      </div>
    </div>
    <div class="flex flex-row flex-wrap px-5">
      <p class="text-xs" v-if="babyAges.length > 0">
        {{ i18n.$t("fill ages") }}
      </p>
      <input
        v-for="ii in babyOrder"
        :key="ii"
        v-model="babyAges[ii - 1]"
        type="number"
        class="
          w-8
          h-4
          m-0.5
          rounded-full
          border
          text-xs text-dark
          font-medium
          text-center
          focus:outline-none
        "
        @change="onChangeAges"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import IconUser from "../Icons/IconUser.vue";
import useI18n from "../../plugins/useI18n";
import IconBaby from "../Icons/IconBaby.vue";
export default {
  components: {
    IconUser,
    IconBaby,
  },
  props: {
    init: {
      type: Array,
      default: [],
    },
    age: {
      type: String,
      default: "-2",
    },
  },
  setup(props, { emit }) {
    const babyOrder = ref(props.init.length);
    const { i18n } = useI18n();
    let babyAges = ref([]);
    for (const ch of props.init) {
      babyAges.value.push(parseInt(ch));
    }
    function onIncrementBaby() {
      babyAges.value.push("");
      babyOrder.value++;
      emitValue();
    }

    function onDecrementBaby() {
      if (babyOrder.value > 0) {
        babyOrder.value > 0 && babyOrder.value--;
        babyAges.value.shift();
        emitValue();
      }
    }

    function onChangeAges() {
      emitValue();
    }

    function emitValue() {
      emit("onchange", Object.values(babyAges.value));
    }

    return {
      babyOrder,
      babyAges,
      onIncrementBaby,
      onDecrementBaby,
      onChangeAges,
      i18n,
    };
  },
};
</script>
<style scoped>
input.border {
  border: 1px solid #777;
}
</style>