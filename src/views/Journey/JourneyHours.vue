<template>
  <div class="container mx-auto px-5 my-5 md:px-40">
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else>


      <h1 class="font-bold text-2xl text-left">

        

        {{
          ucFirst(i18n.$t("hours")) +
          " " +
          i18n.$t("ferry") +
          " " +
          journey[1].name
        }}
      </h1>

      <div class="grid md:grid-cols-4 grid-cols-1 my-5">
        <div class="md:col-span-3">
          <div class="text-left" v-html="seo_description"></div>
        </div>
        <div class="text-right">
          <img
            :src="companyLogos[journey[1].company]"
            :alt="journey[1].company"
          />
          <br>
                      <app-link
          :to="'/' + i18n.$t('routes-seo-journeys')"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
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
        </div>
      </div>
      <div class="my-20 text-left" v-html="seo_description_full"></div>
      <div class="my-20 text-left">
        <h2 class="font-bold text-xl text-left pb-10">{{ seo_title_h2 }}</h2>
        <div v-if="journey[1].departure.length == 0">
          {{ i18n.$t("No departures found") }}
        </div>
        <table
          class="border-collapse border table-auto w-full table-striped"
          v-else
        >
          <tr>
            <th class="border">
              {{ i18n.$t("depart at") + " (" + i18n.$t("date") }})
            </th>
            <th class="border">
              {{ i18n.$t("depart at") + " (" + i18n.$t("time") }})
            </th>
            <th class="border">{{ i18n.$t("duration") }}</th>
            <th class="border">{{ i18n.$t("ship") }}</th>
          </tr>
          <tr
            v-for="departure of journey[1].departure"
            :key="departure.depart_at"
          >
            <td class="border">
              {{ displayDate(departure.depart) }}
            </td>
            <td class="border">
              {{ departure.time }}
            </td>
            <td class="border">{{ departure.duration }} H</td>
            <td class="border">
              {{ departure.ship }}
            </td>
          </tr>
        </table>
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
  ucFirst,
} from "../../plugins/utility";
import { useMeta } from "vue-meta";
import { companies } from "../../store/data/companies";
import moment from "moment";
import { LANGS } from "../../store/data/types";

export default {
  components: { Spinner },
  setup() {
    const i18n = useI18n();
    const route = useRoute();
    const journey = ref([]);
    const isLoading = ref(true);
    let companyLogos = {};
    companies.forEach((c) => {
      companyLogos[c.name] = c.logo;
    });
    const seo_description = ref("");
    const seo_description_full = ref("");
    const seo_title = ref("");
    const seo_title_h2 = ref("");
    const router = useRouter();
    if (!isBladia()) {
      router.push("/");
    }
    const config = JSON.parse(window.localStorage.getItem("config"));
    const { meta } = useMeta({
      title: "",
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
        const attributes = {
          "{domain}": config.name,
          "{ferry}": "ferry",
          "{portfrom}": journey.value[1].depart_port_name,
          "{portto}": journey.value[1].arrive_port_name,
          "{arriveport}": journey.value[1].arrive_port_name,
          "{company}": journey.value[1].company,
          "{quantity}": journey.value[1].departure.length,
          "{duration}": journey.value[1].duration,
          "{zone}": journey.value[1].zone,
          "{phone}": config.phone,
          "{journey}":
            journey.value[1].depart_port_name.toLowerCase() +
            " " +
            journey.value[1].arrive_port_name.toLowerCase(),
          "{destination}": journey.value[1].depart_port_country.toLowerCase(),
          "{countryfrom}": journey.value[1].depart_port_country.toLowerCase(),
          "{countryto}": journey.value[1].arrive_port_country.toLowerCase(),
          "{country}": journey.value[1].arrive_port_country.toLowerCase(),
        };
        seo_description.value = strtr(
          i18n.$t("front-journey-schedule-seo-description"),
          attributes
        );
        seo_description_full.value = strtr(
          i18n.$t("front-journey-schedule-seo-description_full"),
          attributes
        );
        seo_title.value = strtr(
          i18n.$t("seo-title-schedule-book-ferry"),
          attributes
        );
        seo_title_h2.value = strtr(
          i18n.$t("front-journey-schedule-seo-h2"),
          attributes
        );

        const links = {};
        for (const lang of LANGS) {
          links[lang.key] =
            i18n.$t("hours", lang.key) +
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
          i18n.$t("hours") +
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

        meta.title = seo_title.value;
        meta.meta = [
          {
            vmid: "description",
            name: "description",
            content: seo_description.value,
          },
        ].concat(commonMetaTags(seo_title.value, seo_description.value));
      })
      .catch((e) => {
        console.log(e);
      });

    function displayDate(dateVal) {
      return moment(dateVal, "YYYY-MM-DD").format(i18n.$t("date_format_show"));
    }
    return {
      journey,
      i18n,
      isLoading,
      seo_description,
      seo_description_full,
      seo_title,
      seo_title_h2,
      ucFirst,
      companyLogos,
      displayDate,
    };
  },
};
</script>

<style scoped>
tr td,
tr th {
  text-align: center;
  padding: 10px;
}
tr th {
  background-color: #eee;
}
.table-striped tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>