<template>
  <div>
    <BladiaHeader v-if="isBladia()" />
    <ViaferriesHeader v-else />
    <main class="box-border flex-1 overflow-y-auto px-0 mb-10">
      <router-view />
    </main>
    <BladiaFooter v-if="isBladia()" />
    <ViaferriesFooter v-else />
  </div>
</template>

<script>
import { useStore } from "vuex";
import useI18n from "../plugins/useI18n";
import Ferry from "../views/Ferry/Search.vue";
import ViaferriesFooter from "@/components/Navigation/viaferries/Mobile/Footer.vue";
import ViaferriesHeader from "@/components/Navigation/viaferries/Mobile/Header.vue";
import BladiaFooter from "@/components/Navigation/bladia/Mobile/Footer.vue";
import BladiaHeader from "@/components/Navigation/bladia/Mobile/Header.vue";
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

    const config = JSON.parse(localStorage.getItem("config"));

    return {
      i18n,
      isViaferries,
      isBladia,
    };
  },
};
</script>
