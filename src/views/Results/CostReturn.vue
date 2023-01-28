<template>
  <div class="w-full h-16 relative flex justify-center items-center">
    <p class="flex items-center text-lg font-semibold">
      <span>{{ i18n.$t("Return") }}</span>
    </p>
  </div>
  <div class="p-5 pt-1">
    <empty-result-card
      v-if="resReturn.length == 0"
      :company_logo="installation.logo"
      :out_name="installation.arrive_name"
      :ret_name="installation.depart_name"
      :out_at="ret_at"
    />
    <return-result-card :item="resReturn[0]" v-else />

    <app-link to="/calendar?type=return" v-if="resReturn.length == 0" class="text-main underline ">
      {{ i18n.$t("Change return date") }}
    </app-link>
    <div v-if="canGoNext()" class="">
      <button
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
          mt-5
        "
        @click="onContinue"
      >
        {{
          resReturn.length
            ? i18n.$t("Continue")
            : i18n.$t("Continue without return")
        }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import useI18n from "../../plugins/useI18n";
import {
  GET_SEARCHED_RESPONSE,
  GET_JOURNEY_DIRECTION,
  GET_INSTALLATION_RETURN,
  GET_INSTALLATION,
  GET_SERVICES,
  SET_INSTALLATION_RETURN,
  GET_RET_AT,
} from "../../store/data/types";
import ResultCard from "../../components/Results/ResultCard.vue";
import ReturnResultCard from "../../components/Results/ReturnResultCard.vue";
import { DIRECTION_RETURN, DIRECTION_OUTWARD } from "../../store/data/types";
import EmptyResultCard from "../../components/Results/EmptyResultCard.vue";
export default {
  components: {
    ResultCard,
    ReturnResultCard,
    EmptyResultCard,
  },
  setup() {
    const { i18n } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const selectedIdx = ref();
    const routetype = ref(route.query.type);
    const response = computed(() => store.getters[GET_SEARCHED_RESPONSE]);
    const journeyDrt = computed(() => store.getters[GET_JOURNEY_DIRECTION]);
    const installation = computed(() => store.getters[GET_INSTALLATION]);

    const ret_at = computed(() => store.getters[GET_RET_AT]);
    const installationReturn = computed(
      () => store.getters[GET_INSTALLATION_RETURN]
    );
    const services = computed(() => store.getters[GET_SERVICES]);

    let insurrance = { active: false, amount: 0, type: "fixed" },
      promo = { active: false };
    if (services.value != null) {
      insurrance = services.value.insurrance
        ? services.value.insurrance
        : insurrance;
      promo = services.value.promo ? services.value.promo : promo;
    }
    function isSelected(idx) {
      return idx === selectedIdx.value;
    }
    var resReturn = computed(() => {
      const result = [];
      for (let i = 0; i <= response.value.length; i++) {
        const direction = response.value[i] && response.value[i].direction;
        if (direction !== undefined) {
          if (direction === "Return") {
            if (installation.value.company != response.value[i].company)
              continue;
            if (installationReturn.value == null) {
              store.commit(SET_INSTALLATION_RETURN, response.value[i]);
            }
            result.push(response.value[i]);
          }
        }
      }
      return result;
    });

    function getFormartedDate(val) {
      const date = moment(val).format("DD/MM/yyyy");
      const time =
        moment(val, "YYYY-MM-DD HH:mm").format("HH") +
        "H" +
        moment(val, "YYYY-MM-DD HH:mm").format("mm");
      return date + " " + time;
    }

    function isOutward() {
      return journeyDrt.value === DIRECTION_OUTWARD;
    }

    function isReturn() {
      return journeyDrt.value === DIRECTION_RETURN;
    }

    async function onSelectCard(idx, type) {
      if (type == "outward") {
        router.push({
          path: `/result/installation`,
          query: { type: `outward`, company: resReturn.value[0].company },
        });
      } else {
        router.push({
          path: `/result/installation`,
          query: { type: `return`, company: resReturn.value[0].company },
        });
      }
    }

    async function onContinue() {
      if (!resReturn.value || resReturn.value.length == 0) {
        router.push({ path: `/result/confirm` });
      }
      router.push({
        path: `/result/installation`,
        query: { type: `return`, company: resReturn.value[0].company },
      });
    }

    function canGoNext() {
      return true;
    }
    onMounted(() => {
      setTimeout(() => {
        if (resReturn.value && resReturn.value.length > 0) {
          onContinue();
        }
      }, 500);
    });
    return {
      installation,
      response,
      selectedIdx,
      onSelectCard,
      isSelected,
      isOutward,
      isReturn,
      resReturn,
      routetype,
      onContinue,
      i18n,
      canGoNext,
      ret_at,
    };
  },
};
</script>