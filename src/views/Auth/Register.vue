<template>
  <div class="container mx-auto">
    <h1 class="font-bold text-3xl pt-10">
      {{ i18n.$t("Create your account") }}
    </h1>
    <p class="py-5">{{ i18n.$t("Travel with confidence.") }}</p>
    <div class="grid md:grid-cols-2 grid-cols-1">
      <div
        class="p-5 md:ml-16 lg:ml-32 mb-10 text-left order-last md:order-first"
      >
        <h2 class="mb-5">{{ i18n.$t("Enjoy the best experience with") }}:</h2>
        <ul>
          <li class="mb-5 flex">
            <div></div>
            <div class="flex-col">
              <p class="text-18 font-medium mb-2">
                {{ i18n.$t("Personalized assistance") }}
              </p>
              <p>
                {{ i18n.$t("personalized_assistance_description") }}
              </p>
            </div>
          </li>
          <li class="mb-5 flex">
            <div></div>
            <div class="flex-col">
              <p class="text-18 font-medium mb-2">
                {{ i18n.$t("A la Carte service") }}
              </p>
              <p>
                {{ i18n.$t("a_la_carte_service_description") }}
              </p>
            </div>
          </li>
          <li class="mb-5 flex">
            <div></div>
            <div class="flex-col">
              <p class="text-18 font-medium mb-2">
                {{ i18n.$t("A one-of-a-kind referral program") }}
              </p>
              <p>
                {{ i18n.$t("a_one_of_a_kind_referral_program_description") }}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="p-5 rounded rounded-lg md:mr-16 lg:mr-32 mb-10 border">
        <form class="p-10" @submit.prevent="onRegister">
          <div class="w-full mb-6">
            <google-login>
              <button
                class="
                  h-12
                  w-full
                  text-lg
                  rounded-xl
                  font-medium
                  shadow
                  text-white
                  duration-300
                  bg-main
                  hover:bg-opacity-90
                  mb-5
                "
              >
                <span class="mr-2" style="display: inline-block">
                  <icon-google />
                </span>
                Google
              </button>
            </google-login>
            <face-book-login>
              <button
                class="
                  h-12
                  w-full
                  text-lg
                  rounded-xl
                  font-medium
                  shadow
                  text-white
                  duration-300
                  bg-main
                  hover:bg-opacity-90
                  mb-5
                "
              >
                <span class="mr-2" style="display: inline-block">
                  <icon-facebook />
                </span>
                Facebook
              </button>
            </face-book-login>
            <hr />
            <p class="text-sm font-medium text-dark text-left mb-1.5">
              {{ i18n.$t("Email") }}
            </p>
            <input
              v-model="email"
              type="text"
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
              placeholder="Email"
            />
          </div>
          <div class="w-full mb-6">
            <p class="text-sm font-medium text-dark text-left mb-1.5">
              {{ i18n.$t("Telephone") }}
            </p>
            <input-phone
              v-model="phone"
              type="text"
              placeholder="Phone"
              name="phone"
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
            />
          </div>
          <div>
            <input v-model="email" type="hidden" name="userName" />
            <input v-model="languageId" type="hidden" name="language_id" />
            <input v-model="currencyId" type="hidden" name="currency_id" />
            <input v-model="status" type="hidden" name="status" />
            <input v-model="role" type="hidden" name="role" />
          </div>
          <div v-if="showResult" class="my-2">
            <p v-if="!isError" class="text-green-700 font-semibold rounded">
              {{ i18n.$t("Registered successfully.") }}
              <br />
              {{ i18n.$t("You will receive password by email.") }}
            </p>
            <p v-if="isError" class="text-red-700 font-semibold rounded">
              {{ i18n.$t("Oops, something went wrong.") }}
            </p>
          </div>
          <button
            v-if="!showResult"
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
          >
            <spinner
              v-if="isLoading"
              color="#ffffff"
              :width="36"
              :height="36"
            />
            <span v-if="!isLoading">{{ i18n.$t("Create account") }}</span>
          </button>
          <p v-if="!showResult" class="text-sm">
            {{ i18n.$t("I already have an account") }}
            <app-link to="/connect" type="button" class="underline">
              {{ i18n.$t("Connect") }}
            </app-link>
          </p>
          <app-link
            v-if="showResult && !isError"
            to="/connect"
            type="button"
            class="
              w-full
              h-12
              flex
              items-center
              justify-center
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
            <span v-else>{{ i18n.$t("Connect Now") }}</span>
          </app-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import axios from "../../axiosBooking";
import InputPhone from "../../components/UI/InputPhone.vue";
import Spinner from "../../components/UI/Spinner.vue";
import { useI18n } from "../../plugins/i18nPlugin";
import GoogleLogin from "../../components/SocialLogin/GoogleLogin.vue";
import FaceBookLogin from "../../components/SocialLogin/FaceBookLogin.vue";
import { GET_LANGUAGE } from "../../store/data/types";
import { useStore } from "vuex";
import iconGoogle from "../../components/Icons/IconGoogle.vue";
import iconFacebook from "../../components/Icons/IconFacebook.vue";
import { getAppDomain } from "../../plugins/utility";
import { useMeta } from "vue-meta";

export default {
  components: {
    InputPhone,
    Spinner,
    GoogleLogin,
    FaceBookLogin,
    iconGoogle,
    iconFacebook,
  },
  setup() {
    const i18n = useI18n();
    const store = useStore();
    const lang = computed(() => store.getters[GET_LANGUAGE]);

    useMeta({
      title: i18n.$t("SEO")["register"]["title"],
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["register"]["description"],
        },
      ],
    });

    const email = ref();
    const phone = ref();
    const languageId = ref(lang);
    const currencyId = ref("Eur");
    const status = ref("10");
    const role = ref("authenticated");
    const domain = getAppDomain();
    const showResult = ref(false);
    const isLoading = ref(false);
    const isError = ref(false);

    async function onRegister() {
      isLoading.value = true;
      showResult.value = false;
      const sendData = {
        email: email.value,
        phone: phone.value,
        domain: domain,
        username: email.value,
        language_id: languageId.value,
        currency_id: currencyId.value,
        status: status.value,
        role: role.value,
      };

      try {
        await axios.post(`user`, sendData);

        isError.value = false;
      } catch {
        isError.value = true;
      }
      showResult.value = true;
      isLoading.value = false;
    }

    return {
      email,
      phone,
      domain,
      languageId,
      currencyId,
      status,
      role,
      showResult,
      isError,
      isLoading,
      onRegister,
      i18n,
    };
  },
};
</script>
<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: revert;
  font-weight: revert;
}
</style>