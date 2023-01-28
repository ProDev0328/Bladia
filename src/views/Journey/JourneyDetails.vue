<template>
  <div class="container mx-auto px-5 my-5 md:px-40">
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else>
      <h1 class="font-bold text-2xl">{{ journey[1].name }}</h1>
      <p class="">{{ journey[1].company }}</p>
      <div class="grid md:grid-cols-4 grid-cols-1 my-5">
        <div class="md:col-span-3 md:px-5">
          <div class="text-left" v-html="seo_description"></div>
          <p class="text-left">
            {{ journey[0].full_description }}
          </p>
          <p class="text-left">
            {{ journey[0].boarding_description }}
          </p>
          <p class="text-left">
            {{ journey[0].landing_description }}
          </p>
        </div>
        <div class="shadow-card rounded-md px-5 text-left">
          <dl>
            <dt class="font-bold">{{ i18n.$t("duration") }} :</dt>
            <dd>{{ journey[1].duration }}</dd>

            <dt class="font-bold">{{ i18n.$t("frequence") }} :</dt>
            <dd>{{ journey[1].frequence }}</dd>

            <dt class="font-bold">{{ i18n.$t("Age of passengers") }} :</dt>
            <dd>
              <span v-for="age of journey[1].age" :key="age.name">
                {{
                  age.name +
                  " " +
                  age.min +
                  " > " +
                  age.max +
                  " " +
                  i18n.$t("Years")
                }}
                <br />
              </span>
            <br>
        <app-link :to="'/' + i18n.$t('routes-seo-journeys')"
          class="mx-5 my-1 block hover:text-gray-100 duration-700">
          {{ i18n.$t("Journeys") }}
        </app-link>
        <br>
          <app-link
            :to="
              '/' +
              i18n.$t('ferry') +
              '/' +
              journey[1].company +
              '/' +
              journey[1].name
                .toLowerCase()
                .split(' - ')
                .join('-')
                .split(' ')
                .join('-') +
              '/' +
              journey[1].id
            "
          >
            {{ i18n.$t("Details") }}
          </app-link>
            </dd>
          </dl>
        </div>
      </div>
      <div>
        <h2 class="text-lg font-bold">{{ seo_h2 }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "../../plugins/i18nPlugin";
import axios from "../../axiosBooking";
import { useRoute, useRouter } from "vue-router";
import Spinner from "../../components/UI/Spinner.vue";
import {
  baseLinks,
  commonMetaTags,
  isBladia,
  strtr,
} from "../../plugins/utility";
import { useMeta } from "vue-meta";
import { LANGS } from "../../store/data/types";

export default {
  components: { Spinner },
  setup() {
    const i18n = useI18n();
    const store = useStore();
    const route = useRoute();
    const journey = ref([]);
    const isLoading = ref(true);
    const seo_description = ref("");
    const seo_h2 = ref("");
    const router = useRouter();
    if (!isBladia()) {
      router.push("/");
    }
    const config = JSON.parse(window.localStorage.getItem("config"));
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
      .get("/ferry/" + route.params.id)
      .then((data) => {
        journey.value = data.data.data.items;
        isLoading.value = false;
        let attrs = {
          "{domain}": config.name,
          "{ferry}": "ferry",
          "{portfrom}": journey.value[1].depart_port_name,
          "{portto}": journey.value[1].arrive_port_name,
          "{company}": journey.value[1].company,
          "{quantity}": journey.value[1].departure.length,
          "{duration}": journey.value[1].duration,
          "{zone}": journey.value[1].zone,
          "{phone}": config.phone,
        };
        seo_description.value = strtr(
          i18n.$t("front-journey-seo-description_full"),
          attrs
        );
        seo_h2.value = strtr(i18n.$t("front-journey-seo-h2"), attrs);
        const links = {};
        for (const lang of LANGS) {
          links[lang.key] =
            i18n.$t("ferry", lang.key) +
            "/" +
            journey.value[1].company +
            "/" +
            journey.value[1].name
              .toLowerCase()
              .split(" - ")
              .join("-")
              .split(" ")
              .join("-") +
            "/" +
            journey.value[1].id;
        }
        const route =
          i18n.$t("ferry") +
          "/" +
          journey.value[1].company +
          "/" +
          journey.value[1].name
            .toLowerCase()
            .split(" - ")
            .join("-")
            .split(" ")
            .join("-") +
          "/" +
          journey.value[1].id;
        meta.link = baseLinks(links, route);
        meta.title = journey.value[1].name;
        meta.meta[0].content = seo_description.value;
        meta.meta = [
          {
            vmid: "description",
            name: "description",
            content: seo_description.value,
          },
        ].concat(commonMetaTags(journey.value[1].name, seo_description.value));
      })
      .catch((e) => {
        console.log(e);
      });

    return { journey, i18n, isLoading, seo_description, seo_h2 };
  },
};
</script>

<style>
</style>