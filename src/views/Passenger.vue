<template>
  <div class="flex flex-col relative">
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
        <p class="text-lg font-semibold text-white">Passengers</p>
      </div>
    </div>
    <div class="p-5">
      <div class="shadow-card rounded-md px-4 py-2">
        <adult-count
          :age="ages.Adult.text"
          gender="Man"
          :init="menCounter"
          @onchange="
            (val) => {
              menCounter = val;
            }
          "
        />
        <adult-count
          :age="ages.Adult.text"
          gender="Woman"
          :init="womenCounter"
          @onchange="
            (val) => {
              womenCounter = val;
            }
          "
        />
        <children-count
          :age="ages.Child.text"
          gender="Boy"
          :init="boyCounter"
          @onchange="
            (val) => {
              boyCounter = val;
            }
          "
        />
        <children-count
          :age="ages.Child.text"
          gender="Girl"
          :init="girlCounter"
          @onchange="
            (val) => {
              girlCounter = val;
            }
          "
        />
        <baby-count
          :age="ages.Baby.text"
          :init="babyCounter"
          @onchange="
            (val) => {
              babyCounter = val;
            }
          "
        />
      </div>
      <label class="block text-left text-base font-semibold my-5">
        {{ i18n.$t("Resident") }}?
        <input v-model="isResident" type="checkbox" />
      </label>

      <div class="w-full">
        <div
          v-if="error"
          class="
            mb-3
            text-red-600
            p-3
            font-semibold
            border border-red-300
            rounded
          "
        >
          Passenger Count should not be more than 9
        </div>
        <div
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
          {{ i18n.$t("Please fill children ages") }}
        </div>
        <div
          v-if="isErrorWrongAge"
          class="
            mb-3
            text-red-600
            p-3
            font-semibold
            border border-red-300
            rounded
          "
        >
          Wrong ages
        </div>
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
          type="button"
          @click="onConfirm"
        >
          {{ i18n.$t("Confirm") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useI18n from "../plugins/useI18n";
import AdultCount from "../components/Passenger/AdultCount.vue";
import BabyCount from "../components/Passenger/BabyCount.vue";
import ChildrenCount from "../components/Passenger/ChildrenCount.vue";
import PaxModel from "../models/passenger";
import {
  SET_PASSENGER,
  GET_SELECTED_PASSENGERS,
  SET_INSTALLATION_RETURN,
  SET_INSTALLATION,
  GET_SELECTED_JOURNEY,
} from "../store/data/types";
import IconLeftNew from "../components/Icons/IconLeftNew.vue";
import { useMeta } from "vue-meta";
import { commonMetaTags } from '../plugins/utility';
export default {
  components: {
    AdultCount,
    BabyCount,
    ChildrenCount,
    IconLeftNew,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { i18n } = useI18n();
    let menCounter = ref(0);
    let womenCounter = ref(0);
    let babyCounter = ref([]);
    let boyCounter = ref([]);
    let girlCounter = ref([]);
    let isResident = ref(false);

    useMeta({
      title: i18n.$t("SEO")["select_passenger"]["title"],
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["select_passenger"]["description"],
        },
      ].concat(
        commonMetaTags(
          i18n.$t("SEO")["select_passenger"]["title"],
          i18n.$t("SEO")["select_passenger"]["description"]
        )
      ),
    });

    const ages = reactive({
      Adult: {
        text: "",
      },
      Child: {
        text: "",
      },
      Baby: {
        text: "",
      },
    });

    onBeforeMount(() => {
      const journey = store.getters[GET_SELECTED_JOURNEY];
      const jAges = journey[0].age.sort(function (a, b) {
        return a.min - b.min;
      });
      for (const age of jAges) {
        switch (age._type) {
          case "Adult":
            if (ages.Adult.text !== "") break;
            ages.Adult.text = i18n.$t("greater than") + " " + age.min;
            if (ages.Child.text == "") {
              ages.Child.text = i18n.$t("less than") + " " + age.min;
              ages.Child.max = age.min;
            }
            ages.Adult.min = age.min;
            break;
          case "Child":
            if (ages.Child.text !== "") break;
            ages.Child.text =
              i18n.$t("from") +
              " " +
              age.min +
              " " +
              i18n.$t("to") +
              " " +
              age.max;
            ages.Child.min = age.min;
            ages.Child.max = age.max;
            if (ages.Baby.text == "") {
              ages.Baby.text = i18n.$t("less than") + " " + age.min;
              ages.Baby.max = age.min;
            }
            break;
          case "Baby":
            if (ages.Baby.text !== "") break;
            ages.Baby.text = i18n.$t("less than") + " " + age.max;
            ages.Baby.max = age.max;
            ages.Baby.min = age.min;
            break;
        }
      }
    });

    const isError = ref(false);
    const isErrorWrongAge = ref(false);
    const validPassenger = ref(false);
    const passengers = store.getters[GET_SELECTED_PASSENGERS];
    isResident.value =
      passengers.length > 0 ? passengers[0].is_resident : false;
    for (const ps of passengers) {
      switch (ps.gender) {
        case "Male":
          menCounter.value++;
          break;
        case "Female":
          womenCounter.value++;
          break;
        case "Baby":
          babyCounter.value.push(ps.age);
          break;
        case "boy":
          boyCounter.value.push(ps.age);
          break;
        case "girl":
          girlCounter.value.push(ps.age);
          break;
        default:
          break;
      }
    }

    async function onConfirm() {
      await store.commit(SET_INSTALLATION, null);
      await store.commit(SET_INSTALLATION_RETURN, null);
      const adultTotal = menCounter.value + womenCounter.value;
      const childrenTotal = boyCounter.value.length + girlCounter.value.length;
      const babyTotal = babyCounter.value.length;
      const total = adultTotal + childrenTotal + babyTotal;

      const paxs = [];

      if (
        boyCounter.value.includes("") ||
        girlCounter.value.includes("") ||
        babyCounter.value.includes("")
      ) {
        isError.value = true;
      } else {
        let orderCount = 1;
        if (total <= 9) {
          for (let idx = 0; idx < menCounter.value; idx++) {
            const pax = {
              order: orderCount,
              is_resident: isResident.value,
            };
            paxs.push(new PaxModel(pax).toJson());
            orderCount++;
          }

          for (let idx = 0; idx < womenCounter.value; idx++) {
            const pax = {
              order: orderCount,
              gender: "Female",
              is_resident: isResident.value,
            };
            paxs.push(new PaxModel(pax).toJson());
            orderCount++;
          }

          for (const ca of boyCounter.value) {
            if (ages.Child.max && +ca > ages.Child.max) {
              isErrorWrongAge.value = true;
              return;
            }
            if (ages.Child.min && +ca < ages.Child.min) {
              isErrorWrongAge.value = true;
              return;
            }
            const pax = {
              order: orderCount,
              type: "Child",
              age: ca,
              gender: "boy",
              is_resident: isResident.value,
            };
            paxs.push(new PaxModel(pax).toJson());
            orderCount++;
          }

          for (const ca of girlCounter.value) {
            if (ages.Child.max && +ca > ages.Child.max) {
              isErrorWrongAge.value = true;
              return;
            }
            if (ages.Child.min && +ca < ages.Child.min) {
              isErrorWrongAge.value = true;
              return;
            }
            const pax = {
              order: orderCount,
              type: "Child",
              age: ca,
              gender: "girl",
              is_resident: isResident.value,
            };
            paxs.push(new PaxModel(pax).toJson());
            orderCount++;
          }
          for (const ca of babyCounter.value) {
            if (ages.Baby.max && +ca > ages.Baby.max) {
              isErrorWrongAge.value = true;
              return;
            }
            if (ages.Baby.min && +ca < ages.Baby.min) {
              isErrorWrongAge.value = true;
              return;
            }
            const pax = {
              order: orderCount,
              type: "Baby",
              gender: "Baby",
              age: ca,
              is_resident: isResident.value,
            };
            paxs.push(new PaxModel(pax).toJson());
            orderCount++;
          }

          await store.commit(SET_PASSENGER, {
            paxs,
            is_resident: isResident,
            adultTotal,
            childrenTotal,
            babyTotal,
          });

          router.push({ path: `/` });
          validPassenger.value = false;
        } else {
          validPassenger.value = true;
        }
      }
    }

    function onGoback() {
      router.push({ path: "/" });
    }

    return {
      i18n,
      isError,
      isErrorWrongAge,
      menCounter,
      womenCounter,
      babyCounter,
      boyCounter,
      girlCounter,
      isResident,
      onConfirm,
      validPassenger,
      onGoback,
      ages,
    };
  },
};
</script>