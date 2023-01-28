<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="
        relative
        z-10
        overflow-hidden
        focus:outline-none
        focus:border-white
      "
    >
      {{ i18n.$t("Account") }}
    </button>
    <button
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-0 h-full w-full cursor-default"
    ></button>
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl"
    >
      <app-link
        to="/settings"
        class="
          block
          px-4
          py-2
          text-gray-800
          hover:bg-indigo-500
          hover:text-white
        "
        @click="isOpen = false"
      >
        {{ i18n.$t("My Account") }}
      </app-link>
      <app-link
        to="/mybooking"
        class="
          block
          px-4
          py-2
          text-gray-800
          hover:bg-indigo-500
          hover:text-white
        "
        @click="isOpen = false"
      >
        {{ i18n.$t("My bookings") }}
      </app-link>
      <app-link
        to="#"
        class="
          block
          px-4
          py-2
          text-gray-800
          hover:bg-indigo-500
          hover:text-white
        "
        @click="disconnect()"
      >
        {{ i18n.$t("Disconnect") }}
      </app-link>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { LOG_OUT } from "../store/data/types";
import { useRouter } from "vue-router";
import { useI18n } from "../plugins/i18nPlugin";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const i18n = useI18n();
    const isOpen = ref(false);
    const handleEscape = (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        isOpen.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("keydown", handleEscape);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", handleEscape);
    });
    function disconnect() {
      isOpen.value = false;
      store.dispatch(LOG_OUT);
      router.push("/");
    }
    return { isOpen, disconnect, i18n };
  },
};
</script>
