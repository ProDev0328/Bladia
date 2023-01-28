<template>
  <div
    v-if="isReturn()"
    class="w-full h-16 relative flex justify-center items-center"
  >
    <p class="flex items-center text-lg font-semibold">
      <span>{{ i18n.$t("Outward") }}</span>
    </p>
  </div>
  <div class="p-5 pt-1">
    <div v-for="company of companies" :key="company.company">
      <result-card
        :class="{
          'border-green-400 border border-opacity-50':
            selectedCompany == company.company,
        }"
        v-if="resOutward[company.company]"
        :company="company.company"
        :item="resOutward[company.company][0]"
        :selected="selectedCompany == company.company"
        @click="selectCompany(company.company)"
      />
    </div>
    <!-- <div class="mt-5">
      <button
        class="
          h-12
          w-full
          text-lg
          rounded-xl
          font-medium
          shadow
          text-white
          duration-300
          bg-main
          hover:bg-opacity-90
          mt-5
        "
        @click="onSelectCard(resOutward[selectedCompany][0].id, 'outward')"
      >
        {{ i18n.$t("more installations") }}
      </button>
    </div> -->
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
        {{ i18n.$t("Continue") }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import useI18n from "../../plugins/useI18n";
import {
  GET_SEARCHED_RESPONSE,
  SET_DEPARTURE_AT,
  SET_RETURN_AT,
  GET_JOURNEY_DIRECTION,
  GET_INSTALLATION_RETURN,
  GET_INSTALLATION,
  SET_RESULT_TOTAL_COST,
  GET_SERVICES,
  SET_INSTALLATION,
  SET_INSTALLATION_RETURN,
  GET_SEARCHED_STATUS,
  GET_SEARCHED_STATUSES,
} from "../../store/data/types";
import ResultCard from "../../components/Results/ResultCard.vue";
import ReturnResultCard from "../../components/Results/ReturnResultCard.vue";
import { DIRECTION_RETURN, DIRECTION_OUTWARD } from "../../store/data/types";
import { companies as companyData } from "../../store/data/companies";
export default {
  components: {
    ResultCard,
    ReturnResultCard,
  },
  setup() {
    const { i18n } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const selectedIdx = ref();
    const selectedCompany = ref();
    const routetype = ref(route.query.type);
    const response = computed(() => store.getters[GET_SEARCHED_RESPONSE]);
    const journeyDrt = computed(() => store.getters[GET_JOURNEY_DIRECTION]);
    const installation = computed(() => {
      const item = store.getters[GET_INSTALLATION];
      if (item) {
        selectedCompany.value = item.company;
      }
      return item;
    });
    const installationReturn = computed(
      () => store.getters[GET_INSTALLATION_RETURN]
    );
    const services = computed(() => store.getters[GET_SERVICES]);

    let companyLogos = {};
    for (const co of companyData) {
      companyLogos[co.name] = co.logo;
    }
    const companies = computed(() => {
      const status = store.getters[GET_SEARCHED_STATUS];
      const statuses = store.getters[GET_SEARCHED_STATUSES];
      response;
      status;
      let items = [];
      if (!statuses) {
        return items;
      }
      for (const co of Object.values(statuses)) {
        items.push({ ...co, logo: companyLogos[co.company] });
      }
      return items;
    });

    function isSelected(idx) {
      return idx === selectedIdx.value;
    }
    const resOutward = computed(() => {
      const result = {};
      for (let i = 0; i <= response.value.length; i++) {
        const direction = response.value[i] && response.value[i].direction;
        if (direction !== undefined) {
          if (direction === "Outward") {
            if (!selectedCompany.value)
              selectedCompany.value = response.value[i].company;
            if (!result[response.value[i].company]) {
              result[response.value[i].company] = [];
            }
            result[response.value[i].company].push(response.value[i]);
            if (installation.value == null) {
              store.commit(SET_INSTALLATION, response.value[i]);
            }
          } else {
            if (installationReturn.value == null) {
              store.commit(SET_INSTALLATION_RETURN, response.value[i]);
            }
          }
        }
      }
      return result;
    });

    const resReturn = computed(() => {
      const result = {};
      for (let i = 0; i <= response.value.length; i++) {
        const direction = response.value[i] && response.value[i].direction;
        if (direction !== undefined) {
          if (direction === "Return") {
            if (!selectedCompany.value)
              selectedCompany.value = response.value[i].company;
            if (!result[response.value[i].company]) {
              result[response.value[i].company] = [];
            }
            result[response.value[i].company].push(response.value[i]);
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
      return journeyDrt.value === DIRECTION_RETURN && installationReturn.value;
    }

    async function onSelectCard(idx, type) {
      selectedIdx.value = idx;
      await store.commit(
        SET_DEPARTURE_AT,
        getFormartedDate(response.value[0].depart_at)
      );
      await store.commit(
        SET_RETURN_AT,
        getFormartedDate(response.value[0].arrive_at)
      );

      if (type == "outward") {
        router.push({
          path: `/result/installation`,
          query: { type: `outward`, company: selectedCompany.value },
        });
      } else {
        router.push({
          path: `/result/installation`,
          query: { type: `return`, company: selectedCompany.value },
        });
      }
    }
    function selectCompany(company) {
      selectedCompany.value = company;
      if (installation.value && installation.value.company != company) {
        store.commit(SET_INSTALLATION, resOutward.value[company][0]);
        if (isReturn()) {
          store.commit(SET_INSTALLATION_RETURN, resReturn.value[company][0]);
        }
      }
    }

    async function onContinue() {
      await store.commit(
        SET_DEPARTURE_AT,
        getFormartedDate(resOutward.value[selectedCompany.value][0].depart_at)
      );
      await store.commit(
        SET_RETURN_AT,
        getFormartedDate(resOutward.value[selectedCompany.value][0].arrive_at)
      );
      router.push({
        path: `/result/installation`,
        query: { type: `outward`, company: selectedCompany.value },
      });

      // if (isReturn()) {
      //   router.push({
      //     path: `/result/cost/return`,
      //   });
      // } else {
      //   router.push({
      //     path: `/result/confirm`,
      //   });
      // }
    }
    function canGoNext() {
      return installation.value != null;
    }
    return {
      response,
      selectedIdx,
      onSelectCard,
      isSelected,
      isOutward,
      isReturn,
      resOutward,
      routetype,
      onContinue,
      i18n,
      canGoNext,
      companies,
      selectedCompany,
      selectCompany,
    };
  },
};
</script>