<template>
  <div class="p-1">
    <div v-if="!isError" class="mb-2">
      <p class="text-left" v-html="texte.cgv"></p>
    </div>

  
    <div v-if="isError">
      <p class="mb-5 font-semibold text-red-600 text-lg">
        error
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
      title: i18n.$t("SEO")["condition"]["title"],
      link: baseLinks("condition"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["condition"]["description"],
        },
      ],
    });

    const texte = reactive({
      cgv: null,
    });
    const isError = ref(false);

    const config = JSON.parse(localStorage.getItem("config"));

    //
    //axios.get(`agency/${process.env.VUE_APP_AGENCY_ID}`).then(
    axios.get(`utils/text/dev.bladia.com`).then(
      (res) => {
        texte.cgv = res.data.data.items[0].cgv_text;
      },
      (err) => {
        isError.value = true;
      }
    );
    return { texte, isError, config, i18n };
  },
};
</script>
