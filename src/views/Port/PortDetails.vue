<template>
  <div class="container mx-auto px-5 my-5 md:px-40">
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else>
      <h1 class="font-bold text-2xl text-left md:px-5">
        {{ i18n.$t("ferry") + " " + i18n.$t("port") + " " + port.name }}
      </h1>

      <div class="grid md:grid-cols-4 grid-cols-1 my-5">
        <div class="md:col-span-3 md:px-5">
          <div class="text-left" v-html="seo_description"></div>
          <p class="text-left">
            {{ port.description_way }}
          </p>
        </div>
        <div class="shadow-card rounded-md px-5 text-left">
          <dl>
            <dt class="font-bold">{{ i18n.$t("country") }} :</dt>
            <dd>{{ port.country.name }}</dd>
            <dt class="font-bold">{{ i18n.$t("city") }} :</dt>
            <dd>{{ port.city }}</dd>
            <dt class="font-bold">{{ i18n.$t("address") }} :</dt>
            <dd>{{ port.adress }}</dd>
            <dt class="font-bold">{{ i18n.$t("location") }} :</dt>
            <dd>{{ port.gps }}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "../../plugins/i18nPlugin";
import axios from "../../axiosBooking";
import { useRoute, useRouter } from "vue-router";
import Spinner from "../../components/UI/Spinner.vue";
import { baseLinks, commonMetaTags, isBladia, strtr } from "../../plugins/utility";
import { useMeta } from "vue-meta";
import { LANGS } from '../../store/data/types';

export default {
  components: { Spinner },
  setup() {
    const i18n = useI18n();
    const store = useStore();
    const route = useRoute();
    const port = ref({});
    const isLoading = ref(true);
    const seo_description = ref("");
    const seo_title = ref("");
    const router = useRouter();
    if (!isBladia()) {
      router.push("/not_found");
    }
    const { meta } = useMeta({
      title: "",
      link: [],
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "",
        },
      ].concat(commonMetaTags("", "")),
    });
    axios
      .get("/ferry/portview/" + route.params.id)
      .then((res) => {
        port.value = res.data.data.items[0];
        isLoading.value = false;

        seo_description.value = strtr(i18n.$t("seo-front-port-description"), {
          "{name}": port.value.name,
          "{country}": port.value.country.name,
          "{fullname}": port.value.fullname,
        });
        seo_title.value = strtr(i18n.$t("seo-front-port-title"), {
          "{name}": port.value.name,
          "{country}": port.value.country.name,
          "{fullname}": port.value.fullname,
        });

        const links = {};
        for (const lang of LANGS) {
          links[lang.key] =
            i18n.$t("ports", lang.key) +
            "/" +
            port.value.name
              .toLowerCase()
              .split(" - ")
              .join("-")
              .split(" ")
              .join("-") +
            "/" +
            port.value._id;
        }
        const route =
          i18n.$t("ports") +
          "/" +
          port.value.name
            .toLowerCase()
            .split(" - ")
            .join("-")
            .split(" ")
            .join("-") +
          "/" +
          port.value._id;
        meta.link = baseLinks(links, route);

        meta.meta = [
          {
            vmid: "description",
            name: "description",
            content: seo_description.value,
          },
        ].concat(commonMetaTags(seo_title.value, seo_description.value));
        meta.title = seo_title.value;
      })
      .catch((e) => {
        console.log(e);
      });

    return { port, i18n, isLoading, seo_description, seo_title };
  },
};
</script>

<style>
</style>