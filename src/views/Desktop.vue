<template>
  <div>
    <main class="text-gray-600 box-border flex-1 overflow-y-auto px-0">
      <BladiaHeader v-if="isBladia()" />
      <ViaferriesHeader v-else />
      <div class="max-w-lg mx-auto" v-if="mdLimited">
        <router-view />
      </div>
      <router-view v-else />
      <BladiaFooter v-if="isBladia()" />
      <ViaferriesFooter v-else />
    </main>
  </div>
</template>

<script>
import { useStore } from "vuex";
import useI18n from "../plugins/useI18n";
import Ferry from "../views/Ferry/Search.vue";
import ViaferriesFooter from "@/components/Navigation/viaferries/Desktop/Footer.vue";
import ViaferriesHeader from "@/components/Navigation/viaferries/Desktop/Header.vue";
import BladiaFooter from "@/components/Navigation/bladia/Desktop/Footer.vue";
import BladiaHeader from "@/components/Navigation/bladia/Desktop/Header.vue";
import { useRoute } from "vue-router";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { isViaferries, isBladia } from "../plugins/utility";

export default {
  name: "Desktop",
  components: {
    Ferry,
    ViaferriesFooter,
    ViaferriesHeader,
    BladiaFooter,
    BladiaHeader,
  },
  setup() {
    const store = useStore();
    const { i18n } = useI18n();
    const route = useRoute();
    const notMdLimitedRouteNames = [
      "profile-register",
      "ferry",
      "journeys",
      "journeyDetails",
      "journeyHours",
      "ports",
      "portDetails",
      "companies",
      "transporter",
      "transporterDetails",
      "condition"
    ];
    const mdLimited = computed(() => {
      if (notMdLimitedRouteNames.includes(route.name)) {
        return false;
      }
      return true;
    });

    const config = JSON.parse(localStorage.getItem("config"));

    return {
      i18n,
      isViaferries,
      isBladia,
      mdLimited,
    };
  },
};
</script>
