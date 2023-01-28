<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content} | ${appName}` : `${appName}`
    }}</template>
  </metainfo>
  <div id="app" class="w-full flex flex-col h-screen text-dark text-center">
    <div v-if="!isDesktop()">
      <mobile />
    </div>
    <div v-else>
      <desktop />
    </div>
  </div>
  <input type="hidden" name="lang" v-model="lang" />
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { provideI18n, useI18n } from "./plugins/i18nPlugin";
import {
  updateCookieExpiration,
  updateSavedItemsOnUpdate,
  getAppName,
} from "@/plugins/utility";
import messages from "./lang";
import { DEFAULT_LANGUAGE, GET_LANGUAGE, SET_LOGGED_IN } from "./store/data/types";
import Desktop from "./views/Desktop.vue";
import Mobile from "./views/Mobile.vue";
import { useMeta } from "vue-meta";

export default {
  name: "Home",
  components: {
    Desktop,
    Mobile,
  },
  setup() {
    updateSavedItemsOnUpdate();
    const store = useStore();
    const i18n = provideI18n({
      locale: DEFAULT_LANGUAGE,
      messages,
    });

    const lang = computed(() => {
      let lang = store.getters[GET_LANGUAGE];
      meta.htmlAttrs.lang = lang;
      i18n.locale.value = lang;
      return lang;
    });

    const { meta } = useMeta({
      title: "",
      htmlAttrs: {
        lang: DEFAULT_LANGUAGE,
        amp: true,
      },
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "",
        },
      ],
    });

    const appName = getAppName();

    //update and check cookie
    window.addEventListener("click", updateCookie, false);
    window.addEventListener("touchStart", updateCookie, false);
    window.addEventListener("keypress", updateCookie, false);

    function updateCookie() {
      updateCookieExpiration();
      store.commit(SET_LOGGED_IN);
    }
    function isDesktop() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return false;
      } else {
        return true;
      }
    }
    return { appName, lang, isDesktop };
  },
  data() {
    return {
      prompt: false,
    };
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
    }
  },
  methods: {
    async update() {
      this.prompt = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
  },
};
</script>