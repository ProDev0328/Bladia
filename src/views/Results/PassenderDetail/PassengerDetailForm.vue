<template>
  <form class="p-5">
    <div class="shadow-card rounded-md py-5 px-3 mb-5">
      <p class="text-base font-semibold text-dark text-left mb-3">
        {{ i18n.$t(type) }} ({{ age }})
      </p>
      <div class="flex justify-center items-center relative">
        <icon-user class="absolute left-5" />
        <div>
          <p class="text-base font-semibold">{{ i18n.$t(gender) }}</p>
          <p class="text-sm font-medium">
            {{ i18n.$t("Passenger") }} {{ order }}
          </p>
        </div>
      </div>
      <div class="mt-5">
        <input
          v-model="first_name"
          type="text"
          :placeholder="i18n.$t('First Name')"
          class="
            w-full
            h-12
            rounded-md
            px-4
            text-sm
            font-medium
            text-dark
            bg-input
            focus:outline-none
          "
        />
      </div>
      <div class="mt-4">
        <input
          v-model="last_name"
          type="text"
          :placeholder="i18n.$t('Last Name')"
          class="
            w-full
            h-12
            rounded-md
            px-4
            text-sm
            font-medium
            text-dark
            bg-input
            focus:outline-none
          "
        />
      </div>
      <div class="mt-4">
        <v-date-picker
          v-model="birth_date"
          :model-config="{
            type: 'string',
            mask: 'YYYY-MM-DD', // Uses 'iso' if missing
          }"
          :masks="{
            input: i18n.$t('date_format_show'),
          }"
          :update-on-input="false"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <input
              :placeholder="birthdatePlaceholder"
              @focus="birthdatePlaceholder = i18n.$t('date_format_show_label')"
              @blur="birthdatePlaceholder = i18n.$t('birthdate')"
              class="
                w-full
                h-12
                rounded-md
                px-4
                text-sm
                font-medium
                text-dark
                bg-input
                focus:outline-none
              "
              :value="inputValue"
              v-on="inputEvents"
            />
          </template>
        </v-date-picker>
      </div>
      <div class="mt-4">
        <select
          v-model="nationality"
          class="
            w-full
            h-12
            rounded-md
            px-4
            text-sm
            font-medium
            text-dark
            bg-input
            focus:outline-none
          "
        >
          <option v-for="n in nationalities" :key="n._id" :value="n.code_iso2">
            {{ n.name.length > 30 ? `${n.name.slice(0, 30)}...` : n.name }}
          </option>
        </select>
      </div>
      <div class="mt-4">
        <input
          v-model="doc_number"
          type="text"
          :placeholder="i18n.$t('Passport')"
          class="
            w-full
            h-12
            rounded-md
            px-4
            text-sm
            font-medium
            text-dark
            bg-input
            focus:outline-none
          "
        />
      </div>
    </div>
    <button
      :disabled="!isActiveValidate()"
      type="button"
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
      @click="onValidate"
    >
      {{ i18n.$t("Validate") }}
    </button>
  </form>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import IconUser from "../../../components/Icons/IconUser.vue";
import {
  GET_SELECTED_PASSENGERS,
  SET_PASSENGER_DETAIL,
} from "../../../store/data/types";
import useI18n from "../../../plugins/useI18n";
import { countries } from "../../../store/data/countries";
export default {
  components: {
    IconUser,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const { i18n } = useI18n();
    const nationalities = ref(countries);
    const order = ref(parseInt(route.query.order));
    const gender = ref("");
    const age = ref("");
    const type = ref("");
    const first_name = ref("");
    const last_name = ref("");
    const birth_date = ref("");
    const nationality = ref("");
    const doc_number = ref("");
    const birthdatePlaceholder = ref(i18n.$t("birthdate"));
    const passengers = computed(() => {
      const pax = store.getters[GET_SELECTED_PASSENGERS];
      const passenger = pax[order.value - 1];
      type.value = passenger.type;
      first_name.value = passenger.first_name;
      age.value = passenger.age;
      last_name.value = passenger.last_name;
      birth_date.value = passenger.birth_date;
      nationality.value = passenger.nationality;
      doc_number.value = passenger.doc_number;
      return pax;
    });
    passengers.value; // to force call computed
    nationality.value = nationalities.value.filter((item) => {
      return item.code_iso2 === "FR";
    })[0].code_iso2;

    function onValidate() {
      store.commit(SET_PASSENGER_DETAIL, {
        order: order.value,
        first_name: first_name.value,
        last_name: last_name.value,
        birth_date: birth_date.value,
        nationality: nationality.value,
        doc_number: doc_number.value,
      });
      router.push({ path: `/passengerdetail` });
    }
    function isActiveValidate() {
      if (
        first_name.value &&
        last_name.value &&
        nationality.value &&
        birth_date.value &&
        doc_number.value
      )
        return true;
      return false;
    }

    return {
      doc_number,
      first_name,
      gender,
      i18n,
      last_name,
      birth_date,
      nationalities,
      nationality,
      onValidate,
      order,
      age,
      type,
      isActiveValidate,
      birthdatePlaceholder,
    };
  },
};
</script>
