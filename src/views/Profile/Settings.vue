<template>
  <div class="p-5">
    <div class="w-full mb-6">
      <p class="text-sm font-medium text-dark text-left mb-1.5">
        {{
            i18n.$t("Select Language")
        }}
      </p>
      <select
        v-model="selectedLang"
        class="w-full h-12 rounded-md px-4 text-xs font-medium text-dark bg-input focus:outline-none uppercase"
        @change="changeLang"
      >
        <option v-for="la in langs" :key="la" :value="la.key">
          {{ la.key }}
        </option>
      </select>
    </div>
    <div class="w-full mb-6">
      <p class="text-sm font-medium text-dark text-left mb-1.5">
        {{
            i18n.$t("Select Currency")
        }}
      </p>
      <select
        v-model="selectedCurrency"
        class="w-full h-12 rounded-md px-4 text-xs font-medium text-dark bg-input focus:outline-none uppercase"
        @change="changeCurrency"
      >
        <option v-for="curr in currencies" :key="curr" :value="curr.key">
          {{ curr.key }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "../../plugins/i18nPlugin";
import {
  CURRENCIES,
  GET_CURRENCY,
  GET_LANGUAGE,
  LANGS,
  SET_CURRENCY,
  SET_LANGUAGE,
} from "../../store/data/types";
export default {
  setup() {
    const store = useStore();
    const lang = computed(() => store.getters[GET_LANGUAGE]);
    const currency = computed(() => store.getters[GET_CURRENCY]);
    const i18n = useI18n();
    const langs = ref(LANGS);
    const currencies = ref(CURRENCIES);
    const selectedLang = ref();
    const selectedCurrency = ref();

    selectedLang.value = lang.value;
    selectedCurrency.value = currency.value;
    i18n.locale.value = lang.value;

    function changeLang() {
      store.commit(SET_LANGUAGE, selectedLang.value);
      i18n.locale.value = selectedLang.value;
    }

    function changeCurrency() {
      store.commit(SET_CURRENCY, selectedCurrency.value.toLowerCase());
    }

    return {
      currencies,
      i18n,
      langs,
      selectedCurrency,
      selectedLang,
      changeCurrency,
      changeLang,
    };
  },
  };
</script>
