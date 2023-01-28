<template>
  <div class="w-full h-16 relative flex justify-center items-center">
    <p class="flex items-center text-lg font-semibold">
      <img :src="logo_url" class="h-6 mr-3 invert" alt="" />
      <span>{{ i18n.$t("Resume Result") }}</span>
    </p>
  </div>
  <div class="p-5">
    <div class="mb-5">
      <!--Installations-->
      <div class="shadow-card p-2 rounded-md mb-5">
        <p
          class="font-bold text-xl pb-2 flex justify-left items-center"
          @click="view_installations"
        >
          <icon-right class="ml-2" v-if="!show_installations" />
          <icon-right class="ml-2 down" v-if="show_installations" />
          <span class="ml-2">
            {{ i18n.$t("Installations") }}
          </span>
        </p>
        <div id="installations_detail" class="hidden">
          <dotted-line />
          <p class="p-2 font-semibold text-left">
            <b>{{ installation.direction }} </b>
          </p>
          <div
            v-for="place in installation.places"
            :key="place.id"
            class="mt-1 mb-1 p-2"
          >
            <p class="font-semibold text-left">
              <span class="">
                {{ place.count }}&nbsp;{{ i18n.$t(place.type) }}&nbsp;{{
                  is_dev ? place.code + "&nbsp;" : ""
                }}&nbsp;( {{ place.title }} )
              </span>
              <span class="flex justify-end items-end float-right">
                <icon-bed
                  class="mr-2"
                  v-if="place.type == 'Cabin' || place.type == 'Suite'"
                />
                <icon-shower
                  class="mr-2"
                  v-if="place.in_board.has_shower && place.type != 'Seat'"
                />
                <icon-wc
                  class="mr-2"
                  v-if="place.in_board.has_toilet && place.type != 'Seat'"
                />
                <icon-armchair class="mr-2" v-if="place.type == 'Seat'" />
              </span>
              <dotted-line class="mb-2" />
            </p>
          </div>
          <div v-if="installationReturn">
            <p class="p-2 font-semibold text-left">
              <b>{{ installationReturn.direction }}</b>
            </p>
            <div
              v-for="place in installationReturn.places"
              :key="place.id"
              class="mt-1 mb-1 p-2"
            >
              <p class="font-semibold text-left">
                <span class="">
                  {{ place.count }}&nbsp;{{ i18n.$t(place.type) }}&nbsp;{{
                    is_dev ? place.code + "&nbsp;" : ""
                  }}&nbsp;( {{ place.title }} )
                </span>
                <span class="flex justify-end items-end float-right">
                  <icon-bed
                    class="mr-2"
                    v-if="place.type == 'Cabin' || place.type == 'Suite'"
                  />
                  <icon-shower
                    class="mr-2"
                    v-if="place.in_board.has_shower && place.type != 'Seat'"
                  />
                  <icon-wc
                    class="mr-2"
                    v-if="place.in_board.has_toilet && place.type != 'Seat'"
                  />
                  <icon-armchair class="mr-2" v-if="place.type == 'Seat'" />
                </span>

                <dotted-line class="mb-2" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--PASSENGERS-->
      <div class="shadow-card p-2 rounded-md mb-5">
        <p
          class="font-bold text-xl pb-2 flex justify-left items-center"
          @click="view_pass"
        >
          <icon-right class="ml-2" v-if="!show_passenger" />
          <icon-right class="ml-2 down" v-if="show_passenger" />
          <span class="ml-2"> {{ i18n.$t("Passenger") }}s </span>
        </p>
        <div id="passenger_detail" class="hidden">
          <dotted-line />
          <div v-for="ps in searched.passengers" :key="ps" class="mt-1">
            <div class="mb-2 relative overflow-hidden">
              <img
                src="../../assets/user.png"
                class="absolute -bottom-10 -right-10 w-40 h-40 opacity-10"
              />
              <p class="p-1 font-semibold text-center text-lg">
                <!-- {{ i18n.$t("Passenger") }}_{{ ps.order }} -->
                {{ ps.first_name }}
              </p>
              <!-- <p class="p-1 font-semibold text-left">
                {{ i18n.$t("First Name") }}: {{ ps.first_name }}
              </p> -->
              <p class="p-1 font-semibold text-left">
                {{ i18n.$t("Last Name") }}: {{ ps.last_name }}
              </p>
              <p class="p-1 font-semibold text-left">
                {{ i18n.$t("Adult") }}/{{ i18n.$t("Children") }}:
                {{ i18n.$t(ps.type) }}
              </p>
              <p class="p-1 font-semibold text-left">
                {{ i18n.$t("Age") }}: {{ ps.age }} ({{
                  displayDate(ps.birth_date)
                }})
              </p>
              <p class="p-1 font-semibold text-left">
                {{ i18n.$t("Resident") }}: {{ check_resident(ps.is_resident) }}
              </p>
              <p class="p-1 font-semibold text-left">
                {{ i18n.$t("Nationality") }}: {{ countryName(ps.nationality) }}
              </p>
              <p class="p-1 font-semibold text-left">
                {{ i18n.$t("Passport") }}: {{ ps.doc_number }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!--VEHICLES-->
      <div
        v-if="
          searched.vehicles.length > 0 &&
          searched.vehicles[0].trailer != undefined
        "
        class="shadow-card p-2 rounded-md mb-5"
      >
        <p
          class="font-bold text-xl pb-2 flex justify-left items-center"
          @click="view_vehicle"
        >
          <icon-right class="ml-2" v-if="!show_vehicle" />
          <icon-right class="ml-2 down" v-if="show_vehicle" />
          <span class="ml-2">
            {{ i18n.$t("Vehicle") }}
          </span>
        </p>
        <div id="vehicle_detail" class="hidden">
          <dotted-line />
          <p class="p-2 font-semibold text-left">
            Model & Brand :<br />&nbsp;&nbsp;&nbsp;&nbsp;{{
              searched.vehicles[0].code
            }}
          </p>

          <p
            v-if="searched.vehicles[0].roof != undefined"
            class="p-2 font-semibold text-left"
          >
            Roof:<br />&nbsp;&nbsp;&nbsp;&nbsp;Height:&nbsp;{{
              searched.vehicles[0].roof.height
            }}<br />&nbsp;&nbsp;&nbsp;&nbsp;Length:&nbsp;{{
              searched.vehicles[0].roof.length
            }}
          </p>
          <p class="p-2 font-semibold text-left">
            Identification: {{ searched.vehicles[0].identification }}
          </p>
        </div>
      </div>

      <!--PETS-->
      <div
        v-if="
          searched.pets.cats > 0 ||
          searched.pets.dogs > 0 ||
          searched.pets.dogs30 > 0
        "
        class="shadow-card p-2 rounded-md mb-5"
      >
        <p class="font-bold text-xl pb-2 uppercase" @click="view_pet">
          {{ i18n.$t("Pets") }}
        </p>
        <div id="pets_detail" class="hidden pt-4 py-2 relative overflow-hidden">
          <dotted-line />
          <img
            src="../../assets/pet.png"
            class="absolute -bottom-10 -right-10 w-40 h-40 opacity-10"
          />
          <p class="p-1 font-semibold text-left" v-if="searched.pets.cats > 0">
            {{ i18n.$t("Cats") }}: {{ searched.pets.cats }}
          </p>
          <p class="p-1 font-semibold text-left" v-if="searched.pets.dogs > 0">
            {{ i18n.$t("Dogs") }}({{ i18n.$t("less than") }} 30kg):
            {{ searched.pets.dogs }}
          </p>
          <p
            class="p-1 font-semibold text-left"
            v-if="searched.pets.dogs30 > 0"
          >
            {{ i18n.$t("Dogs") }}(+30kg): {{ searched.pets.dogs30 }}
          </p>
        </div>
      </div>

      <!--SERVICES-->
      <service-resume
        :services="searched.services"
        v-if="atleastOneService()"
      />

      <!--CONTACT-->
      <contact-resume :contact="searched.contact" />
    </div>
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
      @click="onSave"
    >
      <spinner v-if="isSaving" color="#ffffff" class="w-9 h-9" />
      <span v-else>{{ i18n.$t("Save") }}</span>
    </button>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import axios from "../../axiosBooking";
import {
  GET_SEARCHED_RESULT,
  GET_INSTALLATION,
  GET_SEARCHED_RESPONSE,
  GET_INSTALLATION_RETURN,
  GET_JOURNEY_DIRECTION,
  DIRECTION_RETURN,
  SET_BOOKING_RESULT,
  DIRECTION_OUTWARD,
} from "../../store/data/types";
import DottedLine from "../../components/UI/DottedLine.vue";
import ServiceResume from "../../components/Results/Resume/ServiceResume.vue";
import { useRouter } from "vue-router";
import ContactResume from "../../components/Results/Resume/ContactResume.vue";
import Spinner from "../../components/UI/Spinner.vue";
import useI18n from "../../plugins/useI18n";
import IconRight from "../../components/Icons/IconRight.vue";
import { countries } from "../../store/data/countries";
import moment from "moment";
export default {
  components: {
    ContactResume,
    DottedLine,
    ServiceResume,
    Spinner,
    IconRight,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const searched = computed(() => store.getters[GET_SEARCHED_RESULT]);
    const availability = computed(() => store.getters[GET_SEARCHED_RESPONSE]);
    const journeyDrt = computed(() => store.getters[GET_JOURNEY_DIRECTION]);
    const installation = computed(() => store.getters[GET_INSTALLATION]);
    const installationReturn = computed(
      () => store.getters[GET_INSTALLATION_RETURN]
    );
    const instArr = ref();
    const { i18n } = useI18n();
    const isSaving = ref(false);

    const config = JSON.parse(localStorage.getItem("config"));
    var logo_url;
    var show_passenger = ref(false);
    var show_vehicle = ref(false);
    var show_installations = ref(false);
    var show_pet = ref(false);
    var val;

    instArr.value = [];
    for (const key in installation.value) {
      instArr.value.push({
        key,
        value: installation.value[key],
      });
      if (key == "logo") logo_url = installation.value[key];
    }

    function view_pass() {
      show_passenger.value = !show_passenger.value;
      if (show_passenger.value) {
        document.getElementById("passenger_detail").style.display = "block";
      } else {
        document.getElementById("passenger_detail").style.display = "none";
      }
    }

    function view_installations() {
      show_installations.value = !show_installations.value;
      if (show_installations.value) {
        document.getElementById("installations_detail").style.display = "block";
      } else {
        document.getElementById("installations_detail").style.display = "none";
      }
    }

    function view_vehicle() {
      show_vehicle.value = !show_vehicle.value;
      if (show_vehicle.value) {
        document.getElementById("vehicle_detail").style.display = "block";
      } else {
        document.getElementById("vehicle_detail").style.display = "none";
      }
    }

    function view_pet() {
      show_pet.value = !show_pet.value;
      if (show_pet.value) {
        document.getElementById("pets_detail").style.display = "block";
      } else {
        document.getElementById("pets_detail").style.display = "none";
      }
    }

    function check_resident(val) {
      if (val) {
        return i18n.$t("Yes");
      } else {
        return i18n.$t("No");
      }
    }

    function isReturn() {
      return journeyDrt.value === DIRECTION_RETURN;
    }

    async function onSave() {
      isSaving.value = true;
      const {
        created_at,
        passengers,
        pets,
        vehicles,
        request,
        contact,
        services,
        direction,
        language,
      } = searched.value;

      const journeys = {
        outward: installation.value,
      };
      delete journeys[DIRECTION_OUTWARD].passengers;
      delete journeys[DIRECTION_OUTWARD].animals;
      delete journeys[DIRECTION_OUTWARD].meals;
      delete journeys[DIRECTION_OUTWARD].vehicles;
      services.meal.outward = services.meal.outward.filter(
        (item) => item.quantity > 0
      );
      if (isReturn()) {
        journeys[DIRECTION_RETURN] = installationReturn.value;
        delete journeys[DIRECTION_RETURN].passengers;
        delete journeys[DIRECTION_RETURN].animals;
        delete journeys[DIRECTION_RETURN].meals;
        delete journeys[DIRECTION_RETURN].vehicles;
        services.meal.return = services.meal.return.filter(
          (item) => item.quantity > 0
        );
      }

      const sendData = {
        created_at,
        passengers,
        pets,
        vehicles,
        request,
        contact,
        services,
        direction,
        language,
        availability: journeys,
        // agency_id: config.id,
        agency_id: process.env.VUE_APP_AGENCY_ID,
        type: "Ferry",
      };

      try {
        const res = await axios.post(`booking`, sendData);
        if (res.status === 200) {
          await store.commit(SET_BOOKING_RESULT, res.data.data);
          router.push({ path: `/payment` });
        }
      } catch (err) {
        console.log("[booking error]", err);
      }

      isSaving.value = false;
    }
    function atleastOneService() {
      return (
        searched.value.services.insurrance.active ||
        hasMeal() ||
        searched.value.services.ticket_by_mail ||
        searched.value.services.ancv.active ||
        searched.value.services.promo.active
      );
    }
    function hasMeal() {
      if (
        !(
          (searched.value.services.meal.outward &&
            searched.value.services.meal.outward.length > 0) ||
          (searched.value.services.meal.return &&
            searched.value.services.meal.return.length > 0)
        )
      )
        return false;
      for (const ml of searched.value.services.meal.outward) {
        if (ml.quantity > 0) return true;
      }
      if (isReturn())
        for (const ml of searched.value.services.meal.return) {
          if (ml.quantity > 0) return true;
        }
      return false;
    }
    function countryName(code) {
      return countries.filter((item) => {
        return item.code_iso2 === code;
      })[0].name;
    }
    function displayDate(dateVal) {
      return moment(dateVal, "YYYY-MM-DD").format(i18n.$t("date_format_show"));
    }
    return {
      check_resident,
      i18n,
      installation,
      installationReturn,
      instArr,
      isSaving,
      logo_url,
      onSave,
      view_vehicle,
      view_pass,
      view_pet,
      searched,
      show_passenger,
      atleastOneService,
      view_installations,
      show_passenger,
      show_vehicle,
      show_installations,
      show_pet,
      countryName,
      displayDate,
    };
  },
};
</script>
<style scoped>
svg.down {
  transform: rotate(90deg);
}
</style>