<template>
  <div class="container mx-auto md:px-2 my-5">
    <h1 class="font-bold text-2xl">
      {{ i18n.$t("Find a ferry transporter") }}
    </h1>
    <p class="py-2">
      {{ i18n.$t("transporter_page_head_description") }}
    </p>
    <div class="grid md:grid-cols-2 grid-cols-1 my-5">
      <div
        v-for="transporter of transporters"
        :key="transporter.id"
        class="flex justify-between shadow-card rounded-md px-5 py-4 m-2.5"
      >
        <p class="text-left">
          {{ transporter.name }}
          <br />
          <small class="text-gray-500">{{ transporter.company }}</small>
        </p>
        <div>
          <app-link
            :to="
              '/' +
              i18n.$t('routes-seo-transporter') +
              '/' +
              transporter.slug
                .toLowerCase()
                .split(' - ')
                .join('-')
                .split(' ')
                .join('-')
            "
          >
            {{ i18n.$t("Details") }}
          </app-link>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import {
  GET_TRANSPORTER,
  INIT_TRANSPORTER,
  LANGS,
} from "../../store/data/types";
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

    const transporters = computed(() => store.getters[GET_TRANSPORTER]);

    onBeforeMount(() => {
      store.dispatch(INIT_TRANSPORTER);
    });

    const links = {};
    for (const lang of LANGS) {
      links[lang.key] = i18n.$t("transporters", lang.key);
    }
    useMeta({
      title: i18n.$t("SEO")["transporters_list"]["title"],
      link: baseLinks(links, "transporters"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["transporters_list"]["description"],
        },
      ].concat(
        commonMetaTags(
          i18n.$t("SEO")["transporters_list"]["title"],
          i18n.$t("SEO")["transporters_list"]["description"]
        )
      ),
    });

    return { transporters, i18n };
  },
};
</script>

<style>
</style>