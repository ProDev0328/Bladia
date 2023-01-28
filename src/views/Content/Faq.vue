<template>
  <div class="questions">
    <div class="heading">
       
      <div class="text">
        <h1>FAQ</h1>
        <small>Choose a quesiton</small>
      </div>
    </div>

     <ul class="question-list">
      <li
        v-for="faq of faqs"
        :key="faq._id"
        class="question-item"
      >
      
        <app-link
            :to="
              '/' +
              i18n.$t('routes-seo-faq') +
              '/' +
              faq.slug +

              '/' +
              faq._id 
            "
          >
          <h2>{{ faq.title }}</h2>
          </app-link>
      </li>
    </ul>
</div>
</template>

<script>
import { reactive, ref } from "vue";
import axios from "../../axiosBooking";
import { useMeta } from "vue-meta";
import { useI18n } from "../../plugins/i18nPlugin";
import { useRouter } from "vue-router";
import { baseLinks, commonMetaTags, isBladia } from "../../plugins/utility";

export default {
  setup() {
    const router = useRouter();
    const i18n = useI18n();
    const faqs = ref([]);

    if (!isBladia()) {
      router.push("/not_found");
    }

    useMeta({
      title: i18n.$t("SEO")["faq"]["title"],
      link: baseLinks("faq"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["faq"]["description"],
        },
      ],
    });

    const isError = ref(false);

    const config = JSON.parse(localStorage.getItem("config"));

    //
    //axios.get(`agency/${process.env.VUE_APP_AGENCY_ID}`).then(
    axios.get(`/faq/list/fr`).then(
      (res) => {
        faqs.value = res.data.data.items;
      },
      (err) => {
        isError.value = true;
      }
    );
    return { faqs, isError, config, i18n };
  },
};
</script>

<style scoped lang="scss">
.heading {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr;
  padding: 0 1.25rem 1.875rem 1.25rem;
  border-bottom: 1px solid rgb(65, 64, 64);
  grid-gap: 1rem;
  align-items: center;
  img {
    width: 1.5rem;
  }
  .icon {
    padding: 0.65rem 0.75rem;
    transition: backgroud-color 0.2s ease-in-out;
    &:hover {
      background: #26282c;
      cursor: pointer;
      border-radius: 8px;
    }
  }
  .text {
    h2 {
      font-size: 1.25rem;
    }
  }
}
.question-list {
  list-style: none;
  padding-top: 0.875rem;
  .question-item {
    font-size: 1rem;
    padding: 1rem 1.25rem;
    transition: background 0.2s ease-in-out;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      cursor: pointer;
    }
  }
}
</style>
