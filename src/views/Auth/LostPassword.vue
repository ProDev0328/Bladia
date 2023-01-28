<template>
  <p class="font-bold text-3xl py-10">{{ i18n.$t("Recover password") }}</p>
  <form class="w-full rounded p-5">
    <div class="w-full mb-6">
      <p class="text-sm font-medium text-dark text-left mb-1.5">
        {{ i18n.$t("Email") }}
      </p>
      <input
        v-if="!showResult"
        type="text"
        v-model="email"
        class="
          w-full
          h-12
          rounded-md
          px-4
          text-xs
          font-medium
          text-dark
          bg-input
          focus:outline-none
        "
        :placeholder="i18n.$t('Email')"
      />
    </div>
    <div v-if="showResult" class="my-2">
      <p v-if="isError" class="font-semibold text-red-600">
        {{ i18n.$t("Oops, something went wrong.") }}
      </p>
      <p v-else class="font-semibold text-green-600">
        {{ i18n.$t("Password recovery email sent") }}
      </p>
    </div>
    <button
      type="button"
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
        mb-5
      "
      @click="onSubmit"
    >
      <spinner v-if="isLoading" color="white" />
      <span v-else>{{ i18n.$t("Recover password") }}</span>
    </button>
    <app-link
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
        text-main
        duration-300
        bg-white
        hover:bg-opacity-90
      "
      to="/connect"
    >
      {{ i18n.$t("Connect") }}
    </app-link>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Spinner from "../../components/UI/Spinner.vue";
import { useI18n } from "../../plugins/i18nPlugin";

import axios from "../../axiosBooking";
import { useMeta } from 'vue-meta';
export default {
  components: {
    Spinner,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref();
    const i18n = useI18n();
    const showResult = ref(false);
    const isError = ref(false);
    const isLoading = ref(false);

    useMeta({
      title: i18n.$t("SEO")["lost_password"]["title"],
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["lost_password"]["description"],
        },
      ],
    });

    async function onSubmit() {
      isLoading.value = true;
      showResult.value = false;
      try {
        const res = await axios.post(`user/recoverpassword`, {
          email: email.value,
        });
        isError.value = false;
      } catch {
        isError.value = true;
      }
      showResult.value = true;
      isLoading.value = false;
    }

    return {
      isError,
      isLoading,
      onSubmit,
      showResult,
      email,
      i18n,
    };
  },
};
</script>
