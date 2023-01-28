<template>
  <div class="w-full h-20 bg-main">
    <div class="h-full flex justify-between max-w-5xl mx-auto px-6">
      <div class="flex items-center h-20 "> 
       <app-link to="/"><img src="/img/logo.svg" /></app-link>
      </div>
      <div class="flex items-center">
        <ul class="flex text-sm text-white font-medium">
          <li class="mx-5">
            <app-link to="/ferry">Ferry</app-link>
          </li>
        </ul>
        <div class="relative mx-5" v-click-outside="handleHide">
          <div
            @click="handleToggle"
            class="
              text-xs
              font-semibold
              text-white
              border
              rounded
              px-2
              py-1
              cursor-pointer
              hover:bg-white hover:text-main
              transition
              duration-300
              uppercase
            "
          >
            {{
              `${lang} | ${
                currencies.filter(
                  (item) => item.key === currency.toLowerCase()
                )[0].symbol
              }`
            }}
          </div>
          <div
            v-if="isOpen"
            class="
              absolute
              top-8
              left-1/2
              transform
              -translate-x-1/2
              bg-white
              shadow
              rounded
              z-50
            "
          >
            <div class="w-60 flex cursor-pointer transition duration-300">
              <ul class="w-1/2 text-sm font-medium text-disable border-r">
                <li
                  v-for="la in langs"
                  :key="la.key"
                  class="
                    h-10
                    flex
                    items-center
                    justify-center
                    border-b
                    hover:bg-input
                  "
                  :class="lang === la.key ? 'text-main font-semibold' : ''"
                  @click="changeLang(la.key)"
                >
                  {{ la.name }}
                </li>
              </ul>
              <ul class="w-1/2 text-sm font-medium text-disable">
                <li
                  v-for="curr in currencies"
                  :key="curr.key"
                  class="
                    h-20
                    flex
                    items-center
                    justify-center
                    border-b
                    hover:bg-input
                    uppercase
                  "
                  :class="
                    currency === curr.key ? 'text-main font-semibold' : ''
                  "
                  @click="changeCurrency(curr.key)"
                >
                  {{ `${curr.key} (${curr.symbol})` }}
                </li>
              </ul>
            </div>

            <div class="flex justify-center items-center p-2">
              <button
                class="
                  w-24
                  h-8
                  bg-main
                  text-sm
                  font-medium
                  text-white
                  rounded-md
                "
                @click="handleToggle"
              >
                {{ i18n.$t("Validate") }}
              </button>
            </div>
          </div>
        </div>
        <div
          class="
            h-full
            flex
            items-center
            text-sm
            font-medium
            text-white
            border-l border-disable
          "
        >
          <div v-if="!loggedIn">
            <app-link class="ml-6" to="/connect">
              {{ i18n.$t("Connect") }}
            </app-link>
            <app-link class="ml-6" to="/register">
              {{ i18n.$t("Register") }}
            </app-link>
          </div>
          <account-dropdown v-else class="ml-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import vClickOutside from "click-outside-vue3";
import {
  CURRENCIES,
  GET_CURRENCY,
  GET_LANGUAGE,
  GET_LOGGED_IN,
  LANGS,
  SET_CURRENCY,
  SET_LANGUAGE,
} from "../../../../store/data/types";
import AccountDropdown from "../../../AccountDropdown.vue";
import { useI18n } from "../../../../plugins/i18nPlugin";
import { useRoute, useRouter } from "vue-router";

export default {
  components: { AccountDropdown },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  setup() {
    const store = useStore();
    const i18n = useI18n();
    const langs = ref(LANGS);
    const currencies = ref(CURRENCIES);
    const lang = computed(() => store.getters[GET_LANGUAGE]);
    const currency = computed(() => store.getters[GET_CURRENCY]);
    const loggedIn = computed(() =>
      store.getters[GET_LOGGED_IN] ? true : false
    );
    const router = useRouter();
    const route = useRoute();
    function changeLang(key) {
      store.commit(SET_LANGUAGE, key);
      i18n.locale.value = key;
      let params = route.params;
      params.lang = key;
      router.push({
        name: route.name,
        query: route.query,
        params: params,
        force: true,
      });
    }

    function changeCurrency(key) {
      store.commit(SET_CURRENCY, key);
    }
    // default values
    currency.value != null
      ? currency.value.toLowerCase()
      : store.commit(SET_CURRENCY, currencies.value[0].key);
    lang.value != null
      ? lang.value
      : store.commit(SET_LANGUAGE, langs.value[0].key);

    return {
      changeCurrency,
      changeLang,
      currencies,
      currency,
      lang,
      langs,
      loggedIn,
      i18n,
    };
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    handleToggle: function () {
      this.isOpen = !this.isOpen;
    },

    handleHide: function () {
      this.isOpen = false;
    },
  },
};
</script>
