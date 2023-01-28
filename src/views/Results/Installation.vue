<template>
  <div class="p-5">
    <p class="font-semibold text-base text-left mb-3">
      {{ i18n.$t("Choose installations for") }} {{ i18n.$t(routetype) }}
    </p>
    <div v-if="routetype === 'outward'">
      <installation-card
        v-for="item in resOutward"
        :key="item.id"
        :item="item"
        :selected="isSelected(item.id)"
        class="mt-2"
        @select="onSelect(item)"
      />
    </div>
    <div v-if="isReturn() && routetype === 'return'" class="return">
      <installation-card
        v-for="item in resReturn"
        :key="item.id"
        :item="item"
        :selected="isSelected(item.id)"
        class="mt-2"
        @select="onSelect(item)"
      />
    </div>
    <div class="">
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
import Router from "vue-router";
import {
  SET_INSTALLATION,
  SET_INSTALLATION_RETURN,
  GET_INSTALLATION_RETURN,
  GET_INSTALLATION,
  GET_SEARCHED_RESPONSE,
  GET_JOURNEY_DIRECTION,
} from "../../store/data/types";
import { DIRECTION_RETURN, DIRECTION_OUTWARD } from "../../store/data/types";
import InstallationCard from "../../components/Results/InstallationCard.vue";
import useI18n from "../../plugins/useI18n";
export default {
  components: {
    InstallationCard,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { i18n } = useI18n();
    const journeyDrt = computed(() => store.getters[GET_JOURNEY_DIRECTION]);
    const response = computed(() => store.getters[GET_SEARCHED_RESPONSE]);
    const installtion = computed(() => store.getters[GET_INSTALLATION]);
    const installtionReturn = computed(
      () => store.getters[GET_INSTALLATION_RETURN]
    );
    const routetype = ref(route.query.type);
    const selectedCompany = route.query.company ? route.query.company : null;
    function isSelected(idx) {
      if (routetype.value === `outward` && installtion.value) {
        return idx === installtion.value.id;
      }
      if (routetype.value === `return` && installtionReturn.value) {
        return idx === installtionReturn.value.id;
      }
      return false;
    }

    function isOutward() {
      return journeyDrt.value === DIRECTION_OUTWARD;
    }

    function isReturn() {
      return journeyDrt.value === DIRECTION_RETURN && installtionReturn.value;
    }

    function onSelect(val) {
      if (routetype.value === `return` && isReturn()) {
        store.commit(SET_INSTALLATION_RETURN, val);
      } else if (routetype.value === `outward` && isOutward()) {
        store.commit(SET_INSTALLATION, val);
      } else {
        store.commit(SET_INSTALLATION, val);
      }
    }

    function onContinue() {
      if (routetype.value === `return` && isReturn()) {
        router.push({ path: `/result/confirm` });
        //router.push({ path: `/result/cost/return` });
      } else if (routetype.value === `outward` && isOutward()) {
        router.push({ path: `/result/confirm` });
      } else {
        router.push({ path: `/result/cost/return` });
      }
    }

    const resOutward = computed(() => {
      var res = [];
      for (let i = 0; i <= response.value.length; i++) {
        if (
          selectedCompany &&
          response.value[i] &&
          selectedCompany != response.value[i].company
        )
          continue;
        const direction = response.value[i] && response.value[i].direction;
        if (direction !== undefined) {
          if (direction === "Outward") {
            res.push(response.value[i]);
          }
        }
      }
      return res;
    });
    const resReturn = computed(() => {
      var res = [];
      for (let i = 0; i <= response.value.length; i++) {
        if (
          selectedCompany &&
          response.value[i] &&
          selectedCompany != response.value[i].company
        )
          continue;
        const direction = response.value[i] && response.value[i].direction;
        if (direction !== undefined) {
          if (direction !== "Outward") {
            res.push(response.value[i]);
          }
        }
      }
      return res;
    });

    return {
      response,
      isSelected,
      onSelect,
      isOutward,
      isReturn,
      routetype,
      resOutward,
      resReturn,
      journeyDrt,
      i18n,
      onContinue,
    };
  },
};
</script>
