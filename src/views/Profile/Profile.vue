<template>
  <div class="p-5">
    <p class="font-bold text-3xl py-10">{{ i18n.$t("Welcome") }}</p>
    <div class="w-full mb-6">
      <p class="text-sm font-medium text-dark text-left mb-1.5">
        {{ i18n.$t("Email") }}
      </p>
      <div
        class="
          w-full
          h-12
          flex
          items-center
          rounded-md
          px-4
          text-xs
          font-medium
          text-dark
          bg-input
        "
      >
        {{ (userData && userData.email) || "" }}
      </div>
    </div>
    <div class="w-full mb-6">
      <p class="text-sm font-medium text-dark text-left mb-1.5">
        {{ i18n.$t("Currency") }}
      </p>
      <div
        class="
          w-full
          h-12
          flex
          items-center
          rounded-md
          px-4
          text-xs
          font-medium
          text-dark
          bg-input
        "
      >
        {{ (userData && userData.currency_id) || "" }}
      </div>
    </div>
    <div class="w-full mb-6">
      <p class="text-sm font-medium text-dark text-left mb-1.5">
        {{ i18n.$t("Language") }}
      </p>
      <div
        class="
          w-full
          h-12
          flex
          items-center
          rounded-md
          px-4
          text-xs
          font-medium
          text-dark
          bg-input
          uppercase
        "
      >
        {{ (userData && userData.language_id) || "" }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { GET_LOGGED_IN, GET_USERINFO } from "../../store/data/types";
import { useI18n } from '../../plugins/i18nPlugin';

export default {
  setup() {
    const i18n = useI18n();
    const store = useStore();
    const router = useRouter();
    const loggedIn = computed(() =>
      store.getters[GET_LOGGED_IN] ? true : false
    );
    loggedIn.value || router.push({ path: "/connect" });
    const userData = JSON.parse(localStorage.getItem("userData"));

    return { i18n, userData };
  },
};
</script>
