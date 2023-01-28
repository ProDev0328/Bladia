<template>
  <div class="border border-teal-500 rounded p-3">
    <div class="flex flex-row justify-between px-2 mb-2">
      <icon-restaurant />
      <div>
        <p class="text-sm">{{ name }}</p>
        <div class="flex flex-row">
          <p class="text-sm mr-2">
            {{ i18n.$t("Price Unit") }}: {{ unitPrice }} €</p>
          <input
            v-model="quantity"
            type="number"
            class="max-w-10 border border-gray-800 rounded"
            @change="onChange"
          />
        </div>
      </div>
    </div>
    <dotted-line />
    <p class="mt-2">Total Price {{ total }}€</p>
  </div>
</template>

<script>
import { ref } from "vue";
import IconRestaurant from "../Icons/IconRestaurant.vue";
import DottedLine from "../UI/DottedLine.vue";
export default {
  components: {
    IconRestaurant,
    DottedLine,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    cardValue: {
      type: Number,
      default: 30,
    },
    unitPrice: {
      type: Number,
      default: 0.0,
    },
    init: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const quantity = ref(0);
    const total = ref(0.0);

    quantity.value = props.init;
    total.value = Math.round(quantity.value * props.unitPrice * 10) / 10;

    function onChange() {
      total.value = Math.round(quantity.value * props.unitPrice * 10) / 10;
      emit("onchange", quantity.value);
    }

    return { quantity, total, onChange };
  },
};
</script>