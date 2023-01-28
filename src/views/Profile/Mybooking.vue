<template>
  <div class="p-5">
    <p class="font-semibold text-base mb-3">
      {{ i18n.$t("My bookings") }}
    </p>
    <spinner v-if="isLoading" />
    <div
      v-for="book of bookings"
      :key="book.id"
      class="shadow-card rounded-md overflow-hidden px-3 mb-5 text-left"
    >
      <p
        class="font-semibold text-left"
        v-for="journey of book.journeys"
        :key="journey.fullname"
      >
        {{ journey.fullname }}
        <dotted-line />
      </p>
      <p class="text-sm text-left">
        {{ i18n.$t("Price") }}: {{ Math.round(book.price * 100) / 100 }} €
      </p>
      <p class="text-sm text-left">
        {{ i18n.$t("reference") }}: {{ book.reference }}
      </p>
      <p class="text-sm text-left">
        {{ i18n.$t("status") }}: {{ book.status }}
      </p>
      <p class="text-sm text-disable text-left">
        {{ i18n.$t("date") }}: {{ book.created_at }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed, watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import Spinner from "../../components/UI/Spinner.vue";
import {
  FETCH_USER_BOOKINGS,
  GET_LOAD_BOOKINGS_STATUS,
  GET_LOGGED_IN,
  GET_USER_BOOKINGS,
} from "../../store/data/types";
import { useStore } from "vuex";
import { useI18n } from "../../plugins/i18nPlugin";
//import retrievebooking from "../components/Retrieve/Form.vue";
export default {
  name: "Mybooking",
  components: {
    Spinner,
    //retrievebooking
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const i18n = useI18n();
    const loggedIn = computed(() => {
      const login = store.getters[GET_LOGGED_IN] ? true : false;
      if (!login) {
        return router.push({ path: `/ferry` });
      }
      store.dispatch(FETCH_USER_BOOKINGS);
      return login;
    });
    loggedIn.value;
    const bookings = computed(() => store.getters[GET_USER_BOOKINGS]);
    const isLoading = computed(() => store.getters[GET_LOAD_BOOKINGS_STATUS]);

    // async function onRetrieve() {
    //   router.push({ path: `mybooking/retrievebooking` });
    // }
    return {
      // onRetrieve,
      isLoading,
      bookings,
      i18n,
    };
  },
};
</script>
