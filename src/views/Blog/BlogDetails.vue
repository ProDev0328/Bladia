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
      <h1 class="font-bold text-2xl">{{ blog.title }}</h1>
      <br>
      <img :src="blog.main_img_id" class="w-400" alt="" />
      <br>
      <div class="" v-html="blog.description "></div>
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
    const blog = ref([]);
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
      .get("/blog/" + route.params.name)
      .then((data) => {
        blog.value = data.data.data.items.pop();
        isLoading.value = false;
      //  meta.link = baseLinks("blog/" + route.params.name);
       // meta.title = blog.value.name;
      //  meta.meta = commonMetaTags(blog.value.name, "");
      })
      .catch((e) => {
        console.log(e);
      });

    return { blog, i18n, isLoading };
  },
};
</script>