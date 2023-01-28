<template>
  <div class="journey relative">
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
          {{ i18n.$t("Select a journey") }}
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
          px-5
        "
      >
        <div class="relative w-full">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              class="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            v-model="searchName"
            type="search"
            class="
              w-full
              py-2
              text-sm
              bg-gray-200
              rounded-md
              pl-10
              focus:outline-none focus:bg-gray-100 focus:text-gray-900
            "
            autofocus
            :placeholder="i18n.$t('Search journey')"
            autocomplete="off"
            @input="onChangeName"
          />
        </div>
      </div>
    </div>
    <div class="p-5">
      <div class="mb-5">
        <div v-if="screen1">
          <List :items="journies" :groups="groups" />
        </div>
        <div v-else>
          <List :items="[selectedItem]" :groups="groups" />
        </div>
      </div>
      <div v-if="!screen1" class="w-full">
        <p
          v-if="isError"
          class="
            mb-3
            text-red-600
            p-3
            font-semibold
            border border-red-300
            rounded
          "
        >
          Oops! Something went wrong. Please try again or find another journey.
        </p>
        <button
          class="
            h-12
            w-full
            text-lg
            rounded-xl
            font-medium
            uppercase
            shadow
            text-white
            duration-300
            bg-main
            hover:bg-opacity-90
          "
          @click="onValidSelect"
        >
          <spinner v-if="isLoading" color="#ffffff" class="w-9 h-9" />
          <span v-if="!isLoading">{{ i18n.$t("Validate") }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useI18n from "../../plugins/useI18n";
import IconLeftNew from "../../components/Icons/IconLeftNew.vue";
import {
  GET_JOURNEY,
  SEARCH_JOURNEY,
  GET_SCREEN,
  CHANGE_SCREEN,
  GET_SELECTEDITEM,
  GET_JOURNEY_DIRECTION,
  GET_RELATEDITEMS,
  INIT_JOURNEY,
  FETCH_SELECTED_JOURNEY,
  SET_OUT_AT,
  SET_RET_AT,
  SET_INSTALLATION,
  SET_INSTALLATION_RETURN,
  GET_BASE_JOURNEYS,
  GET_JOURNEY_GROUPS,
} from "../../store/data/types";

import List from "../../components/List.vue";
import Spinner from "../../components/UI/Spinner.vue";
import { useMeta } from "vue-meta";
import { baseLinks, commonMetaTags } from "../../plugins/utility";
export default {
  components: {
    List,
    Spinner,
    IconLeftNew,
  },
  setup() {
    const { i18n } = useI18n();
    const store = useStore();
    const router = useRouter();
    const searchName = ref("");
    const isError = ref(false);
    const isLoading = ref(false);
    const groups = computed(() => store.getters[GET_JOURNEY_GROUPS]);
    const journies = computed(() => store.getters[GET_BASE_JOURNEYS]);
    const screen1 = computed(() => store.getters[GET_SCREEN]);
    const selectedItem = computed(() => {
      const selected = store.getters[GET_SELECTEDITEM];
      selected.group = false;
      return selected;
    });
    const relatedItems = computed(() => store.getters[GET_RELATEDITEMS]);
    const direction = computed(() => store.getters[GET_JOURNEY_DIRECTION]);
    store.dispatch(INIT_JOURNEY);

    useMeta({
      title: i18n.$t("SEO")["select_journey"]["title"],
      link: baseLinks('journey'),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["select_journey"]["description"],
        },
      ].concat(
        commonMetaTags(
          i18n.$t("SEO")["select_journey"]["title"],
          i18n.$t("SEO")["select_journey"]["description"]
        )
      ),
    });

    function onChangeName() {
      isError.value = false;
      store.commit(CHANGE_SCREEN, { screen: true, item: {} });
      store.dispatch(SEARCH_JOURNEY, searchName.value);
      store.commit(SET_OUT_AT, "");
      store.commit(SET_RET_AT, "");

      store.commit(SET_INSTALLATION, null);
      store.commit(SET_INSTALLATION_RETURN, null);
    }

    async function onValidSelect() {
      isError.value = false;
      isLoading.value = true;
      try {
        await store.commit(SET_OUT_AT, "");
        await store.commit(SET_RET_AT, "");
        await store.dispatch(FETCH_SELECTED_JOURNEY, {
          selectedID: selectedItem.value.id,
          direction: direction.value,
        });

        router.push({ path: `ferry` });
      } catch {
        isError.value = true;
      }
      isLoading.value = false;
    }

    function onGoback() {
      router.push({ path: `/` });
    }

    return {
      i18n,
      journies,
      groups,
      screen1,
      searchName,
      isError,
      isLoading,
      selectedItem,
      relatedItems,
      onValidSelect,
      onChangeName,
      onGoback,
    };
  },
};
</script>
