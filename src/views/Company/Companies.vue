<template>
  <div class="container mx-auto md:px-2 my-5">
    <h1 class="text-3xl mb-5 md:px-20 px-5 py-5">
      {{ i18n.$t("SEO")["ferry_companies"]["title"] }}
    </h1>
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else>
      <div
        v-for="company of companies"
        :key="company.name"
        class="text-left md:px-40 px-5 py-5"
      >
        <div class="grid md:grid-cols-2 grid-cols-1 my-5 text-left">
          <div>
            <img
              :src="company.logo"
              :alt="company.name"
              class="company_image"
            />
          </div>
          <div>
            <h3 class="font-bold text-lg py-2">{{ company.name }}</h3>
            <p v-if="!company.showMore">
              {{ company.description.substring(0, 400) }}

              <br />
              <a
                href="javascript:void(0)"
                class="underline"
                @click="company.showMore = true"
              >
                {{ "more" }} ...
              </a>
            </p>
            <p v-if="!!company.showMore">
              {{ company.description }}
              <br />
              <a
                href="javascript:void(0)"
                @click="company.showMore = false"
                class="underline"
                >{{ "less" }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useI18n } from "../../plugins/i18nPlugin";
import { useRouter } from "vue-router";
import { baseLinks, isBladia } from "../../plugins/utility";
import { useMeta } from "vue-meta";
import Spinner from "../../components/UI/Spinner.vue";
import axios from "../../axiosBooking";
import { LANGS } from "../../store/data/types";
export default {
  components: { Spinner },
  setup() {
    const i18n = useI18n();
    const router = useRouter();
    const companies = ref([]);
    const isLoading = ref(true);
    if (!isBladia()) {
      router.push("/not_found");
    }
    axios
      .get("/ferry/companies")
      .then((data) => {
        companies.value = data.data.data.items;
        isLoading.value = false;
      })
      .catch((e) => {
        console.log(e);
      });

    const links = {};
    for (const lang of LANGS) {
      links[lang.key] =
        i18n.$t("ferry", lang.key) + "/" + i18n.$t("companies", lang.key);
    }
    useMeta({
      title: i18n.$t("SEO")["ferry_companies"]["title"],
      links: baseLinks(links, "ferry/companies"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["ferry_companies"]["description"],
        },
      ],
    });

    return { companies, i18n, isLoading };
  },
};
</script>

<style scoped>
img.company_image {
  max-width: 100%;
  width: 200px;
}
</style>