<template>
  <div class="shadow-card rounded-md px-2.5 py-4">
    <div class="flex justify-between mb-5">
      <div class="w-16 flex justify-center items-center flex-shrink-0 mr-4">
        <icon-restaurant />
      </div>
      <div>
        <p class="text-sm font-medium text-left mb-2.5">
          {{ name }}
        </p>
        <div class="flex items-center justify-end">
          <p class="text-sm font-medium mr-6">
            {{ i18n.$t("Price Unit") }}:
            <span class="font-semibold">{{ unitPrice }} €</span>
          </p>
          <div class="h-5 flex items-center rounded-md overflow-hidden">
            <button
              class="
                w-4
                h-full
                bg-main
                flex
                justify-center
                items-center
                text-white
                font-medium
              "
              @click="
                () => {
                  quantity > 0 && quantity--;
                  onChange();
                }
              "
            >
              -
            </button>
            <input
              v-model="quantity"
              type="number"
              class="
                w-6
                h-full
                p-0
                text-center
                border
                text-xs
                focus:outline-none
              "
              @change="onChange"
            />
            <button
              class="
                w-4
                h-full
                bg-main
                flex
                justify-center
                items-center
                text-white
                font-medium
              "
              @click="
                () => {
                  quantity++;
                  onChange();
                }
              "
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <dotted-line />
    <p class="mt-4">
      <span class="text-sm text-disable font-medium mr-3">
        {{ i18n.$t("Total Price") }}
      </span>
      <span class="text-lg font-bold text-dark">{{ total }}€</span>
    </p> -->
  </div>
</template>

<script>
import { ref } from "vue";
import IconRestaurant from "../Icons/IconRestaurant.vue";
import DottedLine from "../UI/DottedLine.vue";
import useI18n from "../../plugins/useI18n";
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
    const quantity = ref(props.init);
    const total = ref(0.0);
    const { i18n } = useI18n();
    //quantity.value = props.init;
    total.value = Math.round(quantity.value * props.unitPrice * 10) / 10;

    function onChange() {
      total.value = Math.round(quantity.value * props.unitPrice * 10) / 10;
      emit("onchange", quantity.value);
    }

    return { quantity, total, onChange, i18n };
  },
};
</script>