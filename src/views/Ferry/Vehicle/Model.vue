<template>
  <div>
    <div class="w-full flex flex-col bg-white">
      <div
        class="
          w-full
          h-16
          relative
          flex
          justify-center
          items-center
          bg-main
          rounded-b-20px
        "
      >
        <icon-left-new class="absolute left-5" @click="onGoback" />
        <p class="text-lg font-semibold text-white">
          {{ i18n.$t("Vehicle Models") }}
        </p>
      </div>
      <div
        class="
          w-full
          h-16
          flex
          justify-center
          items-center
          border-b border-disable
        "
      >
        <span class="text-md text-dark font-semibold">{{ brand }}</span>
      </div>
    </div>
    <div class="p-5">
      <ul>
        <li
          v-for="md in models"
          :key="md"
          class="w-full rounded-md p-3 shadow-card mb-2.5 cursor-pointer"
          @click="onSelectModel(md)"
        >
          <span class="text-md font-semibold text-dark text-left">
            {{ md.model }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import IconArrowThickLeft from "../../../components/Icons/IconArrowThickLeft.vue";
import {
  GET_SELECTED_VEHICLE_BRAND,
  GET_MODELS,
  SET_SELECTED_MODEL,
  SET_SELECTED_BRAND,
  SET_SELECTED_LENGTH,
  SET_SELECTED_HEIGHT,
  SET_SELECTED_TYPE,
  GET_SELECTED_MODEL,
  SET_SELECTED_CODE,
  SET_INSTALLATION,
  SET_INSTALLATION_RETURN,
  GET_SELECTED_VEHICLE_TYPE,
} from "../../../store/data/types";
import useI18n from "../../../plugins/useI18n";

import IconLeftNew from "../../../components/Icons/IconLeftNew.vue";
import { useMeta } from "vue-meta";
import { baseLinks, commonMetaTags } from '../../../plugins/utility';

export default {
  components: {
    IconArrowThickLeft,
    IconLeftNew,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const brand = computed(() => store.getters[GET_SELECTED_VEHICLE_BRAND]);
    const type = computed(() => store.getters[GET_SELECTED_VEHICLE_TYPE]);
    const models = computed(() => {
      const items = store.getters[GET_MODELS];
      return items.filter((item) => item.type == type.value);
    });
    const selected = computed(() => store.getters[GET_SELECTED_MODEL]);
    const { i18n } = useI18n();
    useMeta({
      title: i18n.$t("SEO")["select_vehicle"]["title"],
      link: baseLinks("vehicle/model"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["select_vehicle"]["description"],
        },
      ].concat(
        commonMetaTags(
          i18n.$t("SEO")["select_vehicle"]["title"],
          i18n.$t("SEO")["select_vehicle"]["description"]
        )
      ),
    });

    async function onSelectModel(val) {
      await store.commit(SET_SELECTED_MODEL, val.model);
      await store.commit(SET_SELECTED_CODE, val.code);
      await store.commit(SET_SELECTED_BRAND, val.brand_name);
      await store.commit(SET_SELECTED_LENGTH, val.length);
      await store.commit(SET_SELECTED_HEIGHT, val.heigth);
      await store.commit(SET_SELECTED_TYPE, val.type);

      store.commit(SET_INSTALLATION, null);
      store.commit(SET_INSTALLATION_RETURN, null);
      router.push({ path: `/vehicle/luggage` });
    }

    function onGoback() {
      router.push({ path: `/vehicle/brand` });
    }

    return {
      brand,
      models,
      selected,
      onSelectModel,
      onGoback,
      i18n,
      IconLeftNew,
    };
  },
};
</script>
