<template>
  <div class="p-5">
    <div v-if="!isError" class="mb-10">
      <p class="font-bold text-2xl mb-5">{{ i18n.$t("Who we are") }}</p>
      
    </div>

    <div>
      <p class="font-semibold text-xl mb-3">{{ config.name }}</p>

      <br>

      <p class="text-left" v-html="texte.about_text"></p>

      <br>

    <p class="font-semibold text-xl mb-3">
        {{ agency.name }}
      </p>
      <p class="font-semibold text-xl mb-3">
        {{ agency.phone }}
      </p>
      <p class="font-semibold text-xl mb-3">
        {{ agency.email }}
      </p>

      <p><app-link to="/"><img src="/img/logo.svg" /></app-link></p>
      <!--
      <img
              class="w-full border rounded"
              :src="`${agency.logo}`"
              :alt="`${agency.name}`"
            />
      -->

 

      <br>

    
    
    </div>
    <div v-if="isError">
      <p class="mb-5 font-semibold text-red-600 text-lg">
        {{ i18n.$t("You will receive password by email.") }}
      </p>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import axios from "../../axiosBooking";
import { useMeta } from "vue-meta";
import { baseLinks } from "../../plugins/utility";
import { useI18n } from "../../plugins/i18nPlugin";
export default {
  setup() {
    const i18n = useI18n();

    useMeta({
      title: i18n.$t("SEO")["about"]["title"],
      link: baseLinks("about"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["about"]["description"],
        },
      ],
    });

    const agency = reactive({
      name: null,
      phone: null,
      email: null,
    });

    const texte = reactive({
      about_text: null,
    });


    const isError = ref(false);

    const config = JSON.parse(localStorage.getItem("config"));

    axios.get(`agency/${process.env.VUE_APP_AGENCY_ID}`).then(
      (res) => {
        agency.name = res.data.data.items[0].name;
        agency.phone = res.data.data.items[0].phone;
        agency.email = res.data.data.items[0].email;
        agency.logo = res.data.data.items[0].logo;
      },
      (err) => {
        isError.value = true;
      }
    );


    axios.get(`utils/text/dev.bladia.com`).then(
      (res) => {
        texte.about_text = res.data.data.items[0].about_text;
      },
      (err) => {
        isError.value = true;
      }
    );


    return { texte, agency, isError, config, i18n };
  },
};
</script>
