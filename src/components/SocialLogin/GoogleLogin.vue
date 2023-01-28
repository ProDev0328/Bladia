<template>
  <div class="" @click.prevent="google">
    <slot />
  </div>
</template>
<script>
import { firebase } from "@/plugins/firebase";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useI18n from "@/plugins/useI18n";
import { GET_LANGUAGE, SOCIAL_LOG_IN } from "../../store/data/types";
import { computed } from "@vue/runtime-core";
import { getAppDomain } from "../../plugins/utility";

export default {
  data() {
    return {
      loginstate: false,
      sheet: false,
      router: useRouter(),
      store: useStore(),
    };
  },
  methods: {
    google() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.auth(provider);
    },
    async auth(provider) {
      const lang = computed(() => this.store.getters[GET_LANGUAGE]);
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        var token = result.credential.accessToken;
        const username = new Date().getTime().toString();
        const social_user = {
          photo: user.photoURL,
          username: username,
          email: user.email,
          token: token,
          first_name: user.displayName,
          social_id: user.uid,
          phone: user.phoneNumber ? user.phoneNumber : "",
          language_id: lang.value,
          currency_id: "Eur",
          domain: getAppDomain(),
          status: "10",
          role: "authenticated",
        };
        await this.store.dispatch(SOCIAL_LOG_IN, social_user);
        this.router.push({ path: "/" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  setup() {
    const { i18n } = useI18n();
    return {
      i18n,
    };
  },
};
</script>