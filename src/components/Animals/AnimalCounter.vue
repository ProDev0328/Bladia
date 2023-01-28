<template>
  <div
    class="shadow-card rounded-md flex items-center justify-between p-3 mb-5"
  >
    <p class="font-medium text-base text-main">
      {{ i18n.$t(label) }}
    </p>
    <div class="flex items-center">
      <button
        class="flex justify-center items-center text-white text-base w-5 h-5 rounded-full"
        :class="amount === 0 ? 'bg-disable' : 'bg-theme-red'"
        @click="onDecrement"
      >
        &ndash;
      </button>
      <div class="w-12 text-center text-gray text-base rounded-full">
        {{ amount }}
      </div>
      <button
        class="flex justify-center items-center bg-theme-red text-white text-base w-5 h-5 rounded-full"
        @click="onIncrement"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useI18n from "../../plugins/useI18n";

export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    animalType: {
      type: String,
      default: "cats",
    },
    label: {
      type: String,
      default: "Cats",
    },
  },
  setup(props, { emit }) {
    const { i18n } = useI18n();
    let amount = ref(0);
    amount.value = props.value;

    function onIncrement() {
      amount.value++;
      emit("onchange", amount.value);
    }

    function onDecrement() {
      amount.value > 0 && amount.value--;
      emit("onchange", amount.value);
    }

    return {
      amount,
      onIncrement,
      onDecrement,
      i18n,
    };
  },
};
</script>