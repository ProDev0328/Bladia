<template>
  <div class="container mx-auto md:px-2 my-5">
    <h1 class="font-bold text-2xl">{{ i18n.$t("Find a ferry Journey") }}</h1>
    <p class="py-2">
      {{ i18n.$t("journey_page_head_description") }}
    </p>
    <div class="grid md:grid-cols-2 grid-cols-1 my-5">
      <div
        v-for="journey of journeys"
        :key="journey.id"
        class="flex justify-between shadow-card rounded-md px-5 py-4 m-2.5"
      >
        <p class="text-left">
          {{ journey.name }}
          <br />
          <small class="text-gray-500">{{ journey.company }}</small>
        </p>
        <div>
          <app-link
            :to="
              '/' +
              i18n.$t('ferry') +
              '/' +
              journey.company +
              '/' +
              journey.name
                .toLowerCase()
                .split(' - ')
                .join('-')
                .split(' ')
                .join('-') +
              '/' +
              journey.id
            "
          >
            {{ i18n.$t("Details") }}
          </app-link>
          <br />
          <app-link
            :to="
              '/' +
              i18n.$t('hours') +
              '/' +
              journey.name
                .toLowerCase()
                .split(' - ')
                .join('-')
                .split(' ')
                .join('-') +
              '/' +
              journey.id
            "
          >
            {{ i18n.$t("hours") }}
          </app-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { GET_JOURNEY, INIT_JOURNEY, LANGS } from "../../store/data/types";
import { useI18n } from "../../plugins/i18nPlugin";
import { useRouter } from "vue-router";
import { baseLinks, commonMetaTags, isBladia } from "../../plugins/utility";
import { useMeta } from "vue-meta";
export default {
  setup() {
    const i18n = useI18n();
    const store = useStore();
    const router = useRouter();
    if (!isBladia()) {
      router.push("/not_found");
    }
    const journeys = computed(() => store.getters[GET_JOURNEY]);
    onBeforeMount(() => {
      store.dispatch(INIT_JOURNEY);
    });
    const links = {};
    for (const lang of LANGS) {
      links[lang.key] = i18n.$t("journeys", lang.key);
    }
    useMeta({
      title: i18n.$t("SEO")["journeys_list"]["title"],
      link: baseLinks(links, "journeys"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["journeys_list"]["description"],
        },
      ].concat(
        commonMetaTags(
          i18n.$t("SEO")["journeys_list"]["title"],
          i18n.$t("SEO")["journeys_list"]["description"]
        )
      ),
    });

    return { journeys, i18n };
  },
};
</script>

<style>
</style>