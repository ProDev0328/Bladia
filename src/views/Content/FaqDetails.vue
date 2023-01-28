<template>
<div class="container">
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
      <h1 class="font-bold text-2xl">{{ faq.title }}</h1>
      <h2 class="">{{ faq.category }}</h2>
      <br>
      <div class="" v-html="faq.description "></div>
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
    const faq = ref([]);
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
      .get("/faq/" + route.params.id)
      .then((data) => {
        faq.value = data.data.data.items.pop();
        isLoading.value = false;
      //  meta.link = baseLinks("blog/" + route.params.name);
       // meta.title = blog.value.name;
      //  meta.meta = commonMetaTags(blog.value.name, "");
      })
      .catch((e) => {
        console.log(e);
      });

    return { faq, i18n, isLoading };
  },
};
</script>