<template>
  <div class="container mx-auto px-5 my-5 md:px-40">
    <div v-if="isLoading">
      <spinner />
    </div>

    <div v-else>
          <button 
      type="button"    
      @click="hasHistory() 
        ? $router.go(-1) 
        : $router.push('/')" class="my-5 btn btn-outline-success">&laquo; 
       {{ i18n.$t("Back") }}
    </button>
      <h1 class="font-bold text-2xl">{{ transporter.name }}</h1>

      <div class="my-5">
        <dl>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">{{ i18n.$t("Name") }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ transporter.name }}</dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">{{ i18n.$t("Email") }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ transporter.email }}</dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">{{ i18n.$t("Phone") }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ transporter.phone }}</dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">{{ i18n.$t("City") }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ transporter.city }}</dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">{{ i18n.$t("Address") }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ transporter.address }}</dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">{{ i18n.$t("Code_Postal") }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ transporter.code_postal }}</dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">{{ i18n.$t("Comment") }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ transporter.comment }}</dd>
          </div>
          <!--
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">{{ i18n.$t("Currency") }}</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ transporter.currency }}</dd>
            </div>
          -->
        </dl>
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
  methods: {
    hasHistory () { return window.history.length > 2 }
  },
  setup() {
    const i18n = useI18n();
    const store = useStore();
    const route = useRoute();
    const transporter = ref([]);
    const isLoading = ref(true);
    const seo_description = ref("");
    const seo_h2 = ref("");
    const router = useRouter();
    if (!isBladia()) {
      router.push("/");
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
      .get("/transporter/detail/" + route.params.name)
      .then((data) => {
        transporter.value = data.data.data.items.pop();
        isLoading.value = false;
        meta.link = baseLinks("transporteur/" + route.params.name);
        meta.title = transporter.value.name;
        meta.meta = commonMetaTags(transporter.value.name, "");
      })
      .catch((e) => {
        console.log(e);
      });

    return { transporter, i18n, isLoading };
  },
};
</script>

<style>
</style>