<template>
  <div class="py-5 flex flex-col">
    <div class="mb-10">
      <HorizontalList :items="reviews" :options="options">
        <template #default="{ item }">
          <review-card
            :first_name="item.first_name"
            :rate="item.rate"
            :description="item.description"
          />
        </template>
      </HorizontalList>
    </div>
    <div class="mb-10">
      <HorizontalList :items="banners" :options="options">
        <template #default="{ item }">
          <div>
            {{ item.__position }}
            <img
              class="w-full border rounded"
              :src="`${item.image}`"
              :alt="`${item.description}`"
            />
          </div>
        </template>
      </HorizontalList>
    </div>
    <div>
      <HorizontalList :items="banners" :options="options">
        <template #default="{ item }">
          <div>
            {{ item.__position }}
            <img
              class="w-full border rounded"
              :src="`${item.image}`"
              :alt="`${item.description}`"
            />
          </div>
        </template>
      </HorizontalList>
    </div>
  </div>
</template>
<script>
import HorizontalList from "../../components/UI/HorizontalList.vue";
import ReviewCard from "../../components/Offers/ReviewCard.vue";
import axios from "../../axiosBooking";
import { useMeta } from 'vue-meta';
import { useI18n } from '../../plugins/i18nPlugin';
export default {
  components: {
    HorizontalList,
    ReviewCard,
  },
  setup() {
    const i18n = useI18n();

    useMeta({
      title: i18n.$t("SEO")["offers"]["title"],
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["offers"]["description"],
        },
      ],
    });
    const banners = JSON.parse(localStorage.getItem("banner"));
    axios.get(`utils/review/${process.env.VUE_APP_AGENCY_ID}`).then(
      (res) => {
        //  agency.name = res.data.data.items[0].name;
      },
      (err) => {
        isError.value = true;
      }
    );

    return { banners };
  },
  data() {
    return {
      options: {
        responsive: [{ size: 1 }],
      },
      reviews: [
        { first_name: "Jhon", rate: 4.6, description: "Text1 text1 " },
        { first_name: "Jhon1", rate: 2.7, description: "Text2 text2 " },
        { first_name: "Jhon2", rate: 3.8, description: "Text3 text3 " },
        { first_name: "Jhon3", rate: 4.9, description: "Text4 text4 " },
      ],
      data1: [
        { description: "Section1 Text1 text1 " },
        { description: "Section1 Text2 text2 " },
        { description: "Section1 Text3 text3 " },
        { description: "Section1 Text4 text4 " },
      ],
      data2: [
        { description: "Section2 Text1 text1 " },
        { description: "Section2 Text2 text2 " },
        { description: "Section2 Text3 text3 " },
        { description: "Section2 Text4 text4 " },
      ],
    };
  },
  methods: {
    positionHome(banner) {
      for (const position of banner.__position) {
        if (position === "Home_content") {
          return true;
        }
      }
    },
  },
};
</script>
