<template>
  <p class="font-bold text-3xl py-10">{{ i18n.$t("Change password") }}</p>
  <form class="w-full rounded p-5">
    <div class="w-full mb-6">
      <p class="text-sm font-medium text-dark text-left mb-1.5">
        {{ i18n.$t("Password") }}
      </p>
      <div class="relative w-full h-12 rounded-md bg-input">
        <input
          :type="isShowPassword ? 'text' : 'password'"
          v-model="password"
          class="
            w-full
            h-full
            pl-4
            pr-12
            text-xs
            font-medium
            text-dark
            bg-transparent
            focus:outline-none
          "
          placeholder="Password"
        />
        <button
          v-if="password !== ''"
          class="
            w-12
            h-12
            absolute
            top-0
            right-0
            flex
            items-center
            justify-center
          "
          @click.prevent="toggleShowPassword"
        >
          <img v-if="isShowPassword" src="../../assets/hide.png" class="w-6" />
          <img v-else src="../../assets/show.png" class="w-6" />
        </button>
      </div>
    </div>
    <div v-if="showResult" class="my-2">
      <p v-if="isError" class="font-semibold text-red-600">
        {{ i18n.$t("Oops, something went wrong.") }}
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
      <span v-else>{{ i18n.$t("Change password") }}</span>
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Spinner from "../../components/UI/Spinner.vue";
import { useI18n } from "../../plugins/i18nPlugin";
import { useMeta } from "vue-meta";
import axios from "../../axiosBooking";
export default {
  components: {
    Spinner,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const email = ref(route.query.email);
    const code = ref(route.query.code);
    const password = ref("");
    const i18n = useI18n();
    const showResult = ref(false);
    const isError = ref(false);
    const isLoading = ref(false);
    const isShowPassword = ref(false);

    useMeta({
      title: i18n.$t("SEO")["change_password"]["title"],
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["change_password"]["description"],
        },
      ],
    });

    async function onSubmit() {
      isLoading.value = true;
      showResult.value = false;
      try {
        const res = await axios.post(`user/changepassword`, {
          email: email.value,
          code: code.value,
          password: password.value,
        });
        isError.value = false;

        router.push({ path: "/connect", query: { recovery: 1 } });
      } catch {
        isError.value = true;
      }
      showResult.value = true;
      isLoading.value = false;
    }

    function toggleShowPassword() {
      isShowPassword.value = !isShowPassword.value;
    }

    return {
      isError,
      isLoading,
      onSubmit,
      showResult,
      isShowPassword,
      toggleShowPassword,
      email,
      password,
      i18n,
    };
  },
};
</script>
