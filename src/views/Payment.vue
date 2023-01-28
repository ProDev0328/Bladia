<template>
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
      <p class="text-lg font-semibold text-white">
        {{ i18n.$t("Payment") }}
      </p>
    </div>
    <div v-if="isOpen" class="w-full z-50 mt-5 px-5">
      <div class="bg-green-400 rounded relative p-3" @click="onCloseModel">
        <h3 class="text-white font-medium">
          {{ i18n.$t("Booking saved") }} <br>
          {{ i18n.$t("Your reference is") }} : {{ booking.reference }}
        </h3>
      </div>
    </div>
    <div class="p-5">
      <div class="shadow-card rounded-md p-3">
        <p class="font-bold text-xl">
          {{ i18n.$t("Total Amount") }}
        </p>
        <p class="p-2 font-semibold text-center text-lg">
          {{ booking.price }}€
        </p>
        <Button
          class="
            h-12
            w-full
            flex
            items-center
            justify-center
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
          @click="doPay()"
        >
          {{ i18n.$t("Payer") }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import useI18n from "../plugins/useI18n";
import { GET_BOOKING_RESULT, GET_RESULT_TOTAL_COST } from "../store/data/types";
import { useRouter } from "vue-router";
export default {
  name: "Payment",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const totalPrice = computed(() => store.getters[GET_RESULT_TOTAL_COST]);
    const booking = computed(() => store.getters[GET_BOOKING_RESULT]);
    const { i18n } = useI18n();
    const isOpen = ref(true);

    function onCloseModel() {
      isOpen.value = false;
    }
    function doPay() {
      window.location.href = booking.value.payment_url;
      //console.log('redirect to pay',booking);
    }

    return {
      i18n,
      isOpen,
      onCloseModel,
      totalPrice,
      doPay,
      booking,
    };
  },
};
</script>