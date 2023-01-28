<template>
  <p class="font-bold text-3xl py-10">{{ i18n.$t("Connect") }}</p>
  <form class="w-full rounded p-5">
    <div v-if="isRecoveredPassword" class="w-full mb-6">
      <p class="font-semibold text-green-600">
        {{ i18n.$t("Password changed successfully") }}
      </p>
    </div>
    <div class="w-full mb-6">
      <p class="text-sm font-medium text-dark text-left mb-1.5">
        {{ i18n.$t("Username") }}
      </p>
      <input
        type="text"
        v-model="username"
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
        placeholder="Username"
      />
    </div>
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
      <p v-else class="font-semibold text-green-600">
        {{ i18n.$t("Successfully log in") }}
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
      @click="onConnect"
    >
      <spinner v-if="isLoading" color="white" />
      <span v-else>{{ i18n.$t("Connect") }}</span>
    </button>
    <p class="text-sm">
      <app-link to="/lost-password" type="button" class="underline">
        {{ i18n.$t("Lost password?") }}
      </app-link>
    </p>
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
      to="/register"
    >
      {{ i18n.$t("Register") }}
    </app-link>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { LOG_IN } from "../../store/data/types";
import Spinner from "../../components/UI/Spinner.vue";
import { useI18n } from "../../plugins/i18nPlugin";
import { useMeta } from 'vue-meta';

export default {
  components: {
    Spinner,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const username = ref();
    const password = ref();
    const i18n = useI18n();
    const showResult = ref(false);
    const isError = ref(false);
    const isLoading = ref(false);
    const isShowPassword = ref(false);
    const isRecoveredPassword = ref(false);

    useMeta({
      title: i18n.$t("SEO")["login"]["title"],
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["login"]["description"],
        },
      ],
    });

    if (route.query.recovery) {
      isRecoveredPassword.value = true;
    }

    async function onConnect() {
      isLoading.value = true;
      showResult.value = false;
      try {
        const res = await store.dispatch(LOG_IN, {
          username: username.value,
          password: password.value,
        });
        isError.value = false;
        router.push({ path: "/profile/" });
      } catch {
        isError.value = true;
      }
      showResult.value = true;
      isLoading.value = false;
    }

    function toggleShowPassword() {
      isShowPassword.value = !isShowPassword.value;
    }

    function onRegister() {
      router.push({ path: `/register` });
    }
    return {
      isError,
      isLoading,
      isRecoveredPassword,
      isShowPassword,
      onConnect,
      onRegister,
      password,
      showResult,
      toggleShowPassword,
      username,
      i18n,
    };
  },
};
</script>
