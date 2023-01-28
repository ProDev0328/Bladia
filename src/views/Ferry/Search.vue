<template>
  <div class="container mx-auto">
    <div class="grid md:grid-cols-2 grid-cols-1 md:my-5">
      <div
        class="
          md:p-5 md:ml-8
          lg:ml-32
          mb-10
          text-left
          sm:border
          rounded rounded-lg
        "
      >
        <div class="text-center">
          <div class="bg-white h-15">
            <img
              src="../../assets/banner.png"
              alt="logo"
              class="w-full md:hidden"
            />
            <h1>
              {{ getTitle() }}
            </h1>
          </div>

          <div class="col-span-1 lg:col-span-6 flex flex-col h-full py-5 px-5">
            <div class="flex flex-row justify-between mb-6 px-6">
              <button
                class="
                  flex flex-col
                  items-center
                  font-semibold
                  text-sm
                  px-4
                  cursor-pointer
                "
                :class="[isReturn() ? 'text-main' : 'text-disable']"
                @click="() => onDirection(`${directionReturn}`)"
              >
                <img
                  src="../../assets/route.png"
                  :class="{ 'filter grayscale opacity-30': isOutward() }"
                  alt=""
                />
                {{ i18n.$t("Aller - retour") }}
              </button>
              <button
                class="
                  flex flex-col
                  items-center
                  font-semibold
                  text-sm
                  px-4
                  cursor-pointer
                "
                :class="[isOutward() ? 'text-main' : 'text-disable']"
                @click="() => onDirection(`${directionOutward}`)"
              >
                <img
                  src="../../assets/simple.png"
                  :class="{ 'filter grayscale opacity-30': isReturn() }"
                  alt=""
                />
                {{ i18n.$t("Aller - simple") }}
              </button>
            </div>

            <div class="flex items-center relative mb-4">
              <div class="flex-shrink-0 mr-2">
                <img
                  v-if="isReturn() && selectedJourney.length > 0"
                  src="../../assets/path_return.png"
                />
                <img v-else src="../../assets/path_outward.png" />
              </div>
              <div class="w-full">
                <div class="flex items-center relative py-2">
                  <button
                    class="
                      w-full
                      h-12
                      text-sm
                      font-medium
                      leading-4
                      bg-input
                      rounded-md
                      px-4
                      text-left
                    "
                    @click="onGoJourney"
                  >
                    {{
                      selectedJourney.length > 0
                        ? displayName(selectedJourney[0].name)
                        : i18n.$t("Departure port")
                    }}
                  </button>
                  <button
                    class="
                      w-14
                      h-14
                      p-0.5
                      box-content
                      items-center
                      absolute
                      top-8
                      -right-4
                      bg-white
                      rounded-full
                      z-50
                    "
                    :disabled="selectedJourney.length == 0"
                    @click="() => onDepartureDate(`outward`)"
                  >
                    <span
                      v-if="out_at"
                      class="flex flex-col items-center text-sm"
                    >
                      <span class="font-semibold leading-4">{{ out_day }}</span>
                      <span class="leading-4">{{ out_month }}</span>
                    </span>
                    <icon-calendar v-else class="m-auto" />
                  </button>
                </div>
                <div class="flex items-center relative py-2">
                  <button
                    class="
                      w-full
                      h-12
                      text-sm
                      font-medium
                      leading-4
                      bg-input
                      rounded-md
                      px-4
                      text-left
                    "
                    @click="onGoJourney"
                  >
                    {{
                      selectedJourney.length > 0
                        ? displayDepartName(selectedJourney[0].name)
                        : i18n.$t("Destination port")
                    }}
                  </button>
                  <button
                    v-if="isReturn() && selectedJourney.length > 0"
                    class="
                      w-14
                      h-14
                      p-0.5
                      box-content
                      items-center
                      absolute
                      top-8
                      -right-4
                      bg-white
                      rounded-full
                      z-50
                    "
                    :disabled="selectedJourney.length == 0"
                    @click="() => onDepartureDate(`return`)"
                  >
                    <span
                      v-if="ret_at"
                      class="flex flex-col items-center text-sm"
                    >
                      <span class="font-semibold leading-4">{{ ret_day }}</span>
                      <span class="leading-4">{{ ret_month }}</span>
                    </span>
                    <icon-calendar v-else class="m-auto" />
                  </button>
                </div>
                <div
                  v-if="isReturn() && selectedJourney.length > 0"
                  class="flex items-center py-2"
                >
                  <button
                    class="
                      w-full
                      h-12
                      text-sm
                      font-medium
                      leading-4
                      bg-input
                      rounded-md
                      px-4
                      text-left
                    "
                    @click="onGoJourney"
                  >
                    {{
                      selectedJourney.length > 0
                        ? displayName(selectedJourney[0].name)
                        : i18n.$t("Select a journey")
                    }}
                  </button>
                </div>
              </div>
            </div>
            <div class="flex flex-row justify-between mb-6">
              <div
                class="relative cursor-pointer"
                :class="{ 'text-gray-400 ': selectedJourney.length == 0 }"
                @click="onPassenger"
              >
                <img src="../../assets/passenger.png" />
                <div
                  class="
                    flex flex-col
                    items-center
                    absolute
                    top-0
                    left-0
                    w-full
                    h-full
                    mt-3
                  "
                >
                  <div class="w-6 h-6 flex justify-center items-center">
                    <icon-adult />
                  </div>
                  <span class="text-xs font-medium leading-3">
                    {{ i18n.$t("Adults") }}
                  </span>
                  <span
                    class="text-sm font-bold leading-4"
                    :class="{ 'text-main': selectedJourney.length > 0 }"
                  >
                    {{ adultTotal || 0 }}
                  </span>
                </div>
              </div>
              <div
                class="relative cursor-pointer"
                :class="{ 'text-gray-400 ': selectedJourney.length == 0 }"
                @click="onPassenger"
              >
                <img src="../../assets/passenger.png" alt="" />
                <div
                  class="
                    flex flex-col
                    items-center
                    absolute
                    top-0
                    left-0
                    w-full
                    h-full
                    mt-3
                  "
                >
                  <div
                    class="w-6 h-6 flex justify-center items-center"
                    :class="{ 'text-gray-400 ': selectedJourney.length == 0 }"
                  >
                    <icon-children />
                  </div>
                  <span class="text-xs font-medium leading-3">
                    {{ i18n.$t("Children") }}
                  </span>
                  <span
                    class="text-sm font-bold leading-4"
                    :class="{ 'text-main': selectedJourney.length > 0 }"
                  >
                    {{ childrenTotal || 0 }}
                  </span>
                </div>
              </div>
              <div class="relative cursor-pointer" @click="onAnimals">
                <img src="../../assets/passenger.png" alt="" />
                <div
                  class="
                    flex flex-col
                    items-center
                    absolute
                    top-0
                    left-0
                    w-full
                    h-full
                    mt-3
                  "
                >
                  <div class="w-6 h-6 flex justify-center items-center">
                    <icon-animal />
                  </div>
                  <span class="text-xs font-medium leading-3">
                    {{ i18n.$t("Animals") }}
                  </span>
                  <span class="text-sm font-bold text-main leading-4">
                    {{ animalToal() }}
                  </span>
                </div>
              </div>
            </div>
            <div
              class="
                w-full
                flex
                justify-between
                items-center
                mt-0.5
                mb-6
                rounded-md
                bg-input
              "
            >
              <button class="h-12 flex items-center px-2.5" @click="onVehicle">
                <icon-car-new class="mr-5" />
                <div class="text-sm font-medium text-main leading-4">
                  {{
                    brand === "" || model === ""
                      ? i18n.$t("Choose Vehicle")
                      : `${brand} - ${model}`
                  }}
                  {{
                    vehicle[0] && vehicle[0].roof && vehicle[0].roof.height
                      ? " + " + i18n.$t("roof box")
                      : ""
                  }}
                  {{
                    vehicle[0] && vehicle[0].trailer
                      ? " + " + i18n.$t(ucFirst(vehicle[0].trailer.type))
                      : ""
                  }}
                </div>
              </button>

              <icon-cancel
                class="cursor-pointer mr-2"
                v-if="brand !== '' && model !== ''"
                @click="removeVehicle()"
              />
            </div>
            <p>{{ response }}</p>

            <button
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
              :disabled="!isSearchable()"
              @click="onSearch"
            >
              <spinner v-if="isSearching" color="#ffffff" class="w-9 h-9" />
              <span v-else>{{ i18n.$t("Search") }}</span>
            </button>
            <div v-if="error" class="bg-white shadow rounded relative p-6 mt-5">
              <div @click="onCloseModel">
                <icon-cancel class="absolute top-2 right-2" />
              </div>
              <h3 class="text-lg text-red-500 font-medium">
                <span v-if="customeErrorString !== ''">{{
                  customeErrorString
                }}</span>
                <span v-else>{{ i18n.$t("Error, Something Went Wrong") }}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div
        class="
          p-5
          mb-10
          text-center
          h-100
          justify-items-center
          content-center
          hidden
          md:flex
        "
      >
        <img
          src="../../assets/ferry.png"
          style="max-with: 100%"
          class="m-auto"
          alt="ferry image"
        />
        <input type="hidden" v-model="status" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useI18n from "../../plugins/useI18n";
import IconUser from "../../components/Icons/IconUser.vue";
import IconGit from "../../components/Icons/IconGit.vue";
import IconCar from "../../components/Icons/IconCar.vue";
import IconCarNew from "../../components/Icons/IconCarNew.vue";
import IconAdult from "../../components/Icons/IconAdult.vue";
import IconChildren from "../../components/Icons/IconChildren.vue";
import IconAnimal from "../../components/Icons/IconAnimal.vue";
import IconCalendar from "../../components/Icons/IconCalendar.vue";
import IconLocation from "../../components/Icons/IconLocation.vue";
import IconCancel from "../../components/Icons/IconCancel.vue";
import Spinner from "../../components/UI/Spinner.vue";
import { baseLinks, commonMetaTags, isViaferries, ucFirst } from "../../plugins/utility";

import {
  INIT_CONFIG,
  INIT_BANNER,
  INIT_JOURNEY,
  INIT_VEHICLE,
  CHANGE_SCREEN,
  SET_JOURNEY_DIRECTION,
  GET_JOURNEY_DIRECTION,
  GET_SELECTED_JOURNEY,
  GET_OUT_AT,
  GET_RET_AT,
  GET_ADULT_TOTAL,
  GET_CHILDREN_TOTAL,
  GET_SELECTED_VEHICLE_BRAND,
  GET_SELECTED_MODEL,
  FETCH_SEARCHED_RESPOSNE,
  GET_SEARCHED_STATUS,
  DIRECTION_RETURN,
  DIRECTION_OUTWARD,
  GET_PETS,
  SET_INSTALLATION_RETURN,
  SET_INSTALLATION,
  SET_CONTACT_INFO,
  SET_SERVICES,
  GET_SEARCHED_RESPONSE,
  SET_SELECTED_MODEL,
  SET_SELECTED_CODE,
  SET_SELECTED_BRAND,
  SET_SELECTED_LENGTH,
  SET_SELECTED_HEIGHT,
  SET_SELECTED_TYPE,
  SET_SELECTED_VEHICLE_TYPE,
  SET_SELECTED_VEHICLE,
  SET_SEARCHED_STATUS,
  SET_SEARCHED_STATUSES,
  GET_SELECTED_VEHICLE,
  SET_SEARCHED_ERRORS,
  GET_SEARCHED_ERRORS,
} from "../../store/data/types";
import { useMeta } from "vue-meta";

export default {
  name: "Form",
  components: {
    IconUser,
    IconGit,
    IconCar,
    Spinner,
    IconAdult,
    IconChildren,
    IconAnimal,
    IconCarNew,
    IconCalendar,
    IconLocation,
    IconCancel,
  },
  props: {},
  setup() {
    const { i18n } = useI18n();
    const store = useStore();
    const router = useRouter();
    const journeyDrt = computed(() => store.getters[GET_JOURNEY_DIRECTION]);
    const selectedJourney = computed(() => store.getters[GET_SELECTED_JOURNEY]);
    const out_at = computed(() => store.getters[GET_OUT_AT]);
    const ret_at = computed(() => store.getters[GET_RET_AT]);
    const adultTotal = computed(() => store.getters[GET_ADULT_TOTAL]);
    const animals = computed(() => store.getters[GET_PETS]);
    const animalToal = () =>
      animals.value.cats + animals.value.dogs + animals.value.dogs30;
    const childrenTotal = computed(() => store.getters[GET_CHILDREN_TOTAL]);
    const vehicle = computed(() => store.getters[GET_SELECTED_VEHICLE]);
    const brand = computed(() => store.getters[GET_SELECTED_VEHICLE_BRAND]);
    const model = computed(() => store.getters[GET_SELECTED_MODEL]);
    const isSearching = ref(false);
    const monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const correct_date = new Date(out_at.value);
    const out_day = correct_date && correct_date.getDate();

    const out_month = i18n.$t(
      correct_date && monthArray[correct_date.getMonth()]
    );

    const ret_at_date = new Date(ret_at.value);
    const ret_day = ret_at_date && ret_at_date.getDate();

    const ret_month = i18n.$t(
      ret_at_date && monthArray[ret_at_date.getMonth()]
    );

    const error = ref(false);
    const response = ref();
    const customeErrorString = computed(() => {
      const errors = store.getters[GET_SEARCHED_ERRORS];
      if (errors) {
        return errors.join(", ");
      }
      return "";
    });

    store.dispatch(INIT_CONFIG);
    store.dispatch(INIT_BANNER);
    store.dispatch(INIT_JOURNEY);
    store.dispatch(INIT_VEHICLE);

    function isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    }

    useMeta({
      title: i18n.$t("SEO")["search_ferry"]["title"],
      link: baseLinks("ferry"),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["search_ferry"]["description"],
        },
      ].concat(
        commonMetaTags(
          i18n.$t("SEO")["search_ferry"]["title"],
          i18n.$t("SEO")["search_ferry"]["description"]
        )
      ),
    });

    function isOutward() {
      return journeyDrt.value === DIRECTION_OUTWARD;
    }

    function isReturn() {
      return journeyDrt.value === DIRECTION_RETURN;
    }

    function displayName(name) {
      const nameArr = name.split("-");
      return nameArr[0].trim();
    }

    function displayDepartName(name) {
      const nameArr = name.split("-");
      return nameArr[1].trim();
    }

    function onDirection(drt) {
      store.commit(SET_JOURNEY_DIRECTION, drt);
    }

    async function onGoJourney() {
      await store.commit(CHANGE_SCREEN, {
        screen: true,
        item: {},
      });
      router.push({ path: `/journey` });
    }

    function onDepartureDate(dateType) {
      router.push({ path: `/calendar`, query: { type: dateType } });
    }

    function onVehicle() {
      router.push({ path: `/vehicle/brand` });
    }

    function onPassenger() {
      if (selectedJourney.value.length === 0) {
        return false;
      }
      router.push({ path: `/passenger` });
    }

    function onAnimals() {
      router.push({ path: `/animals` });
    }

    function isSearchable() {
      if (selectedJourney.value.length === 0) {
        return false;
      }
      if (!out_at.value) {
        return false;
      }
      if (isReturn() && !ret_at.value) {
        return false;
      }

      if (journeyDrt.value === DIRECTION_RETURN && ret_at.value === "") {
        return false;
      }

      if (adultTotal.value === 0 && childrenTotal.value === 0) {
        return false;
      }
      return true;
    }

    async function onSearch() {
      
      isSearching.value = true;
      try {
        await store.commit(SET_SEARCHED_ERRORS);
        await store.commit(SET_SEARCHED_STATUS, "");
        await store.commit(SET_SEARCHED_STATUSES, {});
        await store.commit(SET_INSTALLATION, null);
        await store.commit(SET_INSTALLATION, null);
        await store.commit(SET_INSTALLATION_RETURN, null);
        await store.commit(SET_SERVICES, null);
        await store.commit(SET_CONTACT_INFO, null);
        
        response.value = await store.dispatch(FETCH_SEARCHED_RESPOSNE);
       
      } catch (err) {
        isSearching.value = false;
        error.value = true;
      }
    }

    function onCloseModel() {
      error.value = false;
    }
    const config = JSON.parse(localStorage.getItem("config"));

    function getTitle() {
      if (isViaferries()) {
        return i18n.$t("viaferries_title_ferry_booking");
      }
      return i18n.$t("bladia_title_ferry_booking");
    }

    async function removeVehicle() {
      await store.commit(SET_SELECTED_MODEL, "");
      await store.commit(SET_SELECTED_CODE, null);
      await store.commit(SET_SELECTED_BRAND, null);
      await store.commit(SET_SELECTED_LENGTH, null);
      await store.commit(SET_SELECTED_HEIGHT, null);
      await store.commit(SET_SELECTED_TYPE, null);
      await store.commit(SET_SELECTED_VEHICLE_TYPE, "Car");
      await store.commit(SET_SELECTED_VEHICLE, null);
    }

    const status = computed(() => {
      if (isSearching.value == false) return;
      const state = store.getters[GET_SEARCHED_STATUS];
      const response = store.getters[GET_SEARCHED_RESPONSE];
      if (state == "partial") {
        if (response.length > 0) {
          router.push({ path: `/result/cost` });
        }
      }
      if (state == "done") {
        if (response.length > 0) {
          router.push({ path: `/result/cost` });
          error.value = false;
          isSearching.value = false;
        } else {
          error.value = true;
          isSearching.value = false;
        }
      }
      return state;
    });

    return {
      customeErrorString,
      i18n,
      response,
      journeyDrt,
      selectedJourney,
      isOutward,
      isReturn,
      out_at,
      ret_at,
      adultTotal,
      childrenTotal,
      animalToal,
      brand,
      model,
      isSearching,
      onDirection,
      displayName,
      displayDepartName,
      onGoJourney,
      onVehicle,
      onPassenger,
      onAnimals,
      isSearchable,
      onSearch,
      onDepartureDate,
      status,
      error,
      onCloseModel,
      isMobile,
      out_day,
      out_month,
      ret_day,
      ret_month,
      getTitle,
      status,
      removeVehicle,
      vehicle,
      ucFirst,
    };
  },

  data() {
    return {
      directionReturn: DIRECTION_RETURN,
      directionOutward: DIRECTION_OUTWARD,
    };
  },
};
</script>
