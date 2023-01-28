<template>
  <div class="container mx-auto md:px-2 my-5">
    <h1
      class="text-3xl mb-5 md:px-20 px-5 py-5"
      v-html="i18n.$t('ports_list_page_head_title')"
    ></h1>
    <div v-if="isLoading">
      <spinner />
    </div>
    <div v-else>
      <div
        v-for="port of ports"
        :key="port[0].country"
        class="text-left md:px-40 px-5 py-5"
      >
        <h4 class="text-lg font-bold text-gray-500">{{ port[0].country }}</h4>
        <div class="grid md:grid-cols-2 grid-cols-1 my-5">
          <div v-for="item of port" :key="item._id">
            <app-link
              class="text-primary-50 underline"
              :to="
                '/' +
                i18n.$t('seo-route-port-ferry')  + '-' + 
                item.port.name
                  .toLowerCase()
                  .split(' - ')
                  .join('-')
                  .split(' ')
                  .join('-') +
                '/' +
                item.port._id
              "
            >
              {{ item.port.name }}
            </app-link>
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
import { baseLinks, commonMetaTags, isBladia } from "../../plugins/utility";
import { useMeta } from "vue-meta";
import Spinner from "../../components/UI/Spinner.vue";
import axios from "../../axiosBooking";
import { LANGS } from "../../store/data/types";
export default {
  components: { Spinner },
  setup() {
    const i18n = useI18n();
    const router = useRouter();
    const ports = ref([]);
    const isLoading = ref(true);
    if (!isBladia()) {
      router.push("/not_found");
    }
    axios
      .get("/ferry/ports")
      .then((data) => {
        ports.value = data.data.data.items;
        isLoading.value = false;
      })
      .catch((e) => {
        console.log(e);
      });
    const links = {};
    for (const lang of LANGS) {
      links[lang.key] = i18n.$t("ports", lang.key);
    }
    useMeta({
      title: i18n.$t("SEO")["ports_list"]["title"],
      link: baseLinks(links, "ports"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["ports_list"]["description"],
        },
      ].concat(
        commonMetaTags(
          i18n.$t("SEO")["ports_list"]["title"],
          i18n.$t("SEO")["ports_list"]["description"]
        )
      ),
    });

    return { ports, i18n, isLoading };
  },
};
</script>

<style>
</style>