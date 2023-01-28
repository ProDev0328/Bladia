<template>
  <div class="help p-5">
    <div class="mt-4">
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
        "
        type="button"
        @click="onSearch"
      >
        {{ i18n.$t("Search Ferry") }}
      </button>
    </div>

    <div class="mt-4">
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
        "
        type="button"
        @click="onProfile"
      >
        {{ i18n.$t("Register") }}
      </button>
    </div>
    <div class="mt-4">
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
        "
        type="button"
        @click="onConnect"
      >
        {{ i18n.$t("Connect") }}
      </button>
    </div>
    <div class="mt-4">
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
        "
        type="button"
        @click="onAbout"
      >
        {{ i18n.$t("Who we are") }}
      </button>
    </div>
    <div class="mt-4">
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
        "
        type="button"
        @click="
          () => {
            $router.push({ path: `/mybooking` });
          }
        "
      >
        {{ i18n.$t("Retrieve my booking") }}
      </button>
    </div>
    <div class="mt-4">
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
        "
        type="button"
        @click="
          () => {
            $router.push({ path: `/mycompany` });
          }
        "
      >
        {{ i18n.$t("My Company") }}
      </button>
    </div>
    <div class="mt-4">
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
        "
        type="button"
        @click="
          () => {
            $router.push({ path: `/settings` });
          }
        "
      >
        {{ i18n.$t("Settings") }}
      </button>
    </div>

    
  </div>
</template>
<script>
import { useMeta } from "vue-meta";
import { useRouter } from "vue-router";
import useI18n from "../../plugins/useI18n";
import { baseLinks } from "../../plugins/utility";
export default {
  components: {},
  setup() {
    const router = useRouter();
    const { i18n } = useI18n();

    useMeta({
      title: i18n.$t("SEO")["help"]["title"],
      link: baseLinks("help"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["help"]["description"],
        },
      ],
    });

    function onSearch() {
      router.push({ path: "/" });
    }

    function onMyBooking() {
      router.push({ path: "/mybooking" });
    }

    function onJournies() {
      router.push({ path: "/journies" });
    }

    function onProfile() {
      router.push({ path: "/register" });
    }

    function onConnect() {
      router.push({ path: "/connect" });
    }

    function onAbout() {
      router.push({ path: "/about" });
    }

    return { onSearch, onJournies, onProfile, onConnect, onAbout, i18n };
  },
};
</script>