<template>
  <div class="shadow-card p-2 rounded-md mb-5">
    <p
      class="font-bold text-xl pb-2 flex justify-left items-center"
      @click="view_serve"
    >
      <icon-right class="ml-2" v-if="!show_serv" />
      <icon-right class="ml-2 down" v-if="show_serv" />
      <span class="ml-2">
        {{ i18n.$t("Services") }}
      </span>
    </p>
    <div id="service_detail" class="hidden pt-4 py-2 relative overflow-hidden">
      <dotted-line />
      <img
        src="../../../assets/service.png"
        class="absolute -bottom-10 -right-10 w-40 h-40 opacity-10"
      />
      <div v-if="services.insurrance.active">
        <div class="flex justify-between items-center">
          <img src="../../../assets/assistance.png" />
          <p class="p-1 font-semibold text-center text-lg">
            {{ i18n.$t("Insurrance") }}
          </p>
          <p class="p-5"></p>
        </div>

        <p class="p-1 font-semibold text-left">
          {{ i18n.$t("Active") }}: {{ tf_to_yn(services.insurrance.active) }}
        </p>
        <p
          v-if="services.insurrance.active"
          class="p-1 font-semibold text-left"
        >
          {{ i18n.$t("Amount") }}: {{ insuranceAmount() }}€
        </p>
        <dotted-line class="p-1" />
      </div>
      <div v-if="services.ticket_by_mail">
        <div class="flex justify-between items-center">
          <img src="../../../assets/email.png" />
          <p class="p-1 font-semibold text-center text-lg">
            {{ i18n.$t("Email") }}
          </p>
          <p class="p-5"></p>
        </div>
        <p class="p-1 font-semibold text-left">
          {{ i18n.$t("Receive email") }}:
          {{ tf_to_yn(services.ticket_by_mail) }}
        </p>
        <dotted-line class="p-1" />
      </div>
      <div v-if="services.ancv.active">
        <div class="flex justify-between items-center">
          <img src="../../../assets/ancv.png" />
          <p class="p-1 font-semibold text-center text-lg">ANCV</p>
          <p class="p-5"></p>
        </div>
        <p class="p-1 font-semibold text-left">
          {{ i18n.$t("Active") }}: {{ tf_to_yn(services.ancv.active) }}
        </p>
        <p v-if="services.ancv.active" class="p-1 font-semibold text-left">
          {{ i18n.$t("Amount") }}: {{ services.ancv.amount }}€
        </p>
        <dotted-line class="p-1" />
      </div>
      <div v-if="services.promo.active">
        <div class="flex justify-between items-center">
          <img src="../../../assets/promo.png" />
          <p class="p-1 font-semibold text-center text-lg">
            {{ i18n.$t("Promo") }}
          </p>
          <p class="p-5"></p>
        </div>
        <p class="p-1 font-semibold text-left">
          {{ i18n.$t("Active") }}: {{ tf_to_yn(services.promo.active) }}
        </p>
        <p v-if="services.promo.active" class="p-1 font-semibold text-left">
          {{ i18n.$t("Name") }}: {{ services.promo.name }}
        </p>
        <p v-if="services.promo.active" class="p-1 font-semibold text-left">
          {{ i18n.$t("Amount") }}: {{ services.promo.value }}€
        </p>
        <dotted-line class="p-1" />
      </div>
      <div v-if="hasMeal()">
        <div class="flex justify-between items-center">
          <img src="../../../assets/food.png" />
          <p class="p-1 font-semibold text-center text-lg">
            {{ i18n.$t("Meal") }}
          </p>
          <p class="p-5"></p>
        </div>

        <p v-if="isReturn()" class="font-semibold text-left mb-2">
          {{ i18n.$t("Outward") }}:
        </p>
        <div v-for="ml in services.meal.outward" :key="ml.code">
          <div v-if="ml.quantity > 0">
            <p class="p-1 font-semibold text-left">
              {{ i18n.$t("Code") }}: {{ ml.code }}
            </p>
            <p class="p-1 font-semibold text-left">
              {{ i18n.$t("Name") }}: {{ ml.name }}
            </p>
            <p class="p-1 font-semibold text-left">
              {{ i18n.$t("Description") }}:
              <span class="font-medium">{{ ml.description }} </span>
            </p>
            <p class="p-1 font-semibold text-left">
              {{ i18n.$t("Price") }}: {{ ml.price }}€
            </p>
            <p class="p-1 font-semibold text-left">
              {{ i18n.$t("Quantity") }}: {{ ml.quantity }}
            </p>
          </div>
        </div>
        <dotted-line class="p-1" />
        <div v-if="isReturn()">
          <p class="font-semibold text-left my-2 p-1">Return:</p>
          <div v-for="rml in services.meal.return" :key="rml.code">
            <div v-if="rml.quantity > 0">
              <p class="p-1 font-semibold text-left">
                {{ i18n.$t("Code") }}: {{ rml.code }}
              </p>
              <p class="p-1 font-semibold text-left">
                {{ i18n.$t("Name") }}: {{ rml.name }}
              </p>
              <p class="p-1 font-semibold text-left">
                {{ i18n.$t("Description") }}:
                <span class="font-medium">{{ rml.description }} </span>
              </p>
              <p class="p-1 font-semibold text-left">
                {{ i18n.$t("Price") }}: {{ rml.price }}€
              </p>
              <p class="p-1 font-semibold text-left">
                {{ i18n.$t("Quantity") }}: {{ rml.quantity }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DottedLine from "../../UI/DottedLine.vue";
import useI18n from "../../../plugins/useI18n";
import {
  DIRECTION_RETURN,
  GET_INSTALLATION,
  GET_INSTALLATION_RETURN,
  GET_JOURNEY_DIRECTION,
} from "../../../store/data/types";
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import IconRight from "../../Icons/IconRight.vue";
export default {
  components: {
    DottedLine,
    IconRight,
  },
  props: {
    services: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { i18n } = useI18n();
    var show_serv = ref(false);
    var val;
    const store = useStore();
    const journeyDrt = computed(() => store.getters[GET_JOURNEY_DIRECTION]);
    const installation = computed(() => store.getters[GET_INSTALLATION]);
    const installationReturn = computed(
      () => store.getters[GET_INSTALLATION_RETURN]
    );

    function isReturn() {
      return journeyDrt.value === DIRECTION_RETURN;
    }
    function view_serve() {
      show_serv.value = !show_serv.value;
      if (show_serv.value) {
        document.getElementById("service_detail").style.display = "block";
      } else {
        document.getElementById("service_detail").style.display = "none";
      }
    }
    function insuranceAmount() {
      let totalPrice = parseFloat(installation.value.tariffs.price);
      for (const meal of installation.value.meals) {
        totalPrice += meal.price * meal.quantity;
      }
      if (isReturn()) {
        for (const rmeal of installationReturn.value.meals) {
          totalPrice += rmeal.price * rmeal.quantity;
        }
      }

      if (isReturn()) {
        totalPrice += installationReturn.value.tariffs.price;
        /* if (promo.active) {
          totalPrice -= promo.value;
        } */
      }
      if (props.services.insurrance.type == "fixed") {
        return props.services.insurrance.amount;
      } else {
        const ins = (totalPrice * props.services.insurrance.amount) / 100;
        return Math.round(ins * 100) / 100;
      }
    }

    function tf_to_yn(val) {
      if (val) {
        return i18n.$t("Yes");
      } else {
        return i18n.$t("No");
      }
    }
    function hasMeal() {
      if (
        !(
          (props.services.meal.outward &&
            props.services.meal.outward.length > 0) ||
          (props.services.meal.return && props.services.meal.return.length > 0)
        )
      )
        return false;
      for (const ml of props.services.meal.outward) {
        if (ml.quantity > 0) return true;
      }
      if (isReturn())
        for (const ml of props.services.meal.return) {
          if (ml.quantity > 0) return true;
        }
      return false;
    }
    return {
      view_serve,
      tf_to_yn,
      i18n,
      isReturn,
      insuranceAmount,
      hasMeal,
      show_serv,
    };
  },
};
</script>

<style scoped>
svg.down {
  transform: rotate(90deg);
}
</style>