<template>
 <div> 
    <div class="">
      <div v-for="blog of blogs" :key="blog._id"
        class="flex justify-between shadow-card rounded-md px-5 py-4 m-2.5"
      >
      <div class="post-item">
            {{ blog.title }}
            <img
              class="w-300 border rounded"
              :src="`${blog.main_img_id}`"
              :alt="`${blog.title}`"
            />
            <br>
          <app-link class="
                  w-36
                  h-8
                  bg-main
                  text-sm
                  font-medium
                  text-white
                  rounded-md
                "
            :to="
              '/' +
              i18n.$t('routes-seo-blog') +
              '/' +
              blog.slug
            "
          >
            {{ i18n.$t("Read") }}
          </app-link>
          </div>
        <div>
        </div>
      </div>  
    </div>
  </div>
</template>
<script>

import { ref } from "vue";
import axios from "../../axiosBooking";
import { useMeta } from 'vue-meta';
import { useI18n } from '../../plugins/i18nPlugin';
import { useRouter } from "vue-router";
import { baseLinks, commonMetaTags, isBladia } from "../../plugins/utility";
import {
  LANGS,
} from "../../store/data/types";

export default {
  components: {

  },
  setup() {
    const i18n = useI18n();
    const blogs = ref([]);
    const router = useRouter();
    if (!isBladia()) {
      router.push("/not_found");
    }

const links = {};
    for (const lang of LANGS) {
      links[lang.key] = i18n.$t("blog", lang.key);
    }
    useMeta({
      title: i18n.$t("SEO")["blog"]["title"],
      link: baseLinks(links, "blog"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["blog_list"]["description"],
        },
      ].concat(
        commonMetaTags(
          i18n.$t("SEO")["blog_list"]["title"],
          i18n.$t("SEO")["blog_list"]["description"]
        )
      ),
    });


    
    axios.get(`blog/list/fr/bladia.com`).then(
      (res) => {
        blogs.value = res.data.data.items;
      },
      (err) => {
        isError.value = true;
      }
    );

    return { blogs , i18n};
  },
  data() {
    return {
    };
  },
};
</script>