<template>
  <div @click.prevent="facebook">
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
import { getAppDomain } from '../../plugins/utility';

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
    facebook() {
      var provider = new firebase.auth.FacebookAuthProvider();
      this.auth(provider);
    },
    async auth(provider) {
      const lang = computed(() => this.store.getters[GET_LANGUAGE]);
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        var token = result.credential.accessToken;
        const social_user = {
          photo: user.photoURL,
          username: username,
          email: user.email,
          token: token,
          name: user.displayName,
          social_id: user.uid,
          phone: user.phoneNumber,
          language_id: lang,
          currency_id: "Eur",
          domain: getAppDomain(),
          status: "10",
          role: "authenticated",
        };
        this.store.dispatch(SOCIAL_LOG_IN, social_user);
        this.router.push({ path: "/" });
      } catch (error) {
        console.log(error, "err");
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
<style scoped>
.login-facebook {
  width: 100%;
  margin: 10px 0;
  border-radius: 0;
  background-color: white;
  border-color: #fff;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0px 0px 4px 1px #ccc;
  padding: 10px;
  justify-content: center;
}
.login-facebook span {
  color: #2196f3;
  margin-left: 5px;
}
.login-facebook:hover span {
  color: #fff;
}
</style>