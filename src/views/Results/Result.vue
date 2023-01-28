<template>
  <div v-if="response">
    <div>
      <div class="absolute flex justify-center items-center pt-10">
        <icon-left-new
          v-if="canBack()"
          class="absolute md:left-3 left-0.5"
          @click="onGoback"
        />

        <!-- <icon-left-new
          v-if="canNext()"
          class="absolute right-3 transform rotate-180"
          @click="onNext"
        /> -->
      </div>
      <div
        class="
          w-full
          flex
          justify-around
          py-4
          bg-main
          rounded-b-20px
          text-gray-300
        "
      >
        <!-- <div :class="[route.path.split('/').pop() === 'confirm' ? 'pl-5' : '']"> -->
        <div class="pl-5">
          <p
            class="flex justify-center items-center font-medium uppercase"
            :class="[
              //route.path.split('/').pop() === 'confirm' ? 'text-sm' : 'text-lg',
              'text-sm',
            ]"
          >
            {{ displayDepartName() }}
            <img
              src="../../assets/swap_horizontal.svg"
              class="mx-4"
              v-if="isReturn()"
            />
            <img src="../../assets/arrow-right.svg" class="mx-4" v-else />
            {{ displayArriveName() }}
          </p>
          <div class="text-sm">
            <div
              class="text-xs"
              v-if="true /*route.path.split('/').pop() === 'confirm'*/"
            >
              <p class="mb-2.5 text-left">
                {{ installation && installation.passenger_count }}
                {{ i18n.$t("Passenger") }}
                <span
                  v-if="
                    installation &&
                    installation.animals.cats +
                      installation.animals.dogs +
                      installation.animals.dogs30 >
                      0
                  "
                >
                  <span class="font-lg"> &bull;</span>
                  {{
                    installation &&
                    installation.animals.cats +
                      installation.animals.dogs +
                      installation.animals.dogs30
                  }}
                  {{ i18n.$t("Pets") }}
                </span>
                <span v-if="response.length > 0 && response[0].vehicles">
                  <span class="font-lg"> &bull;</span>
                  {{
                    response.length > 0 &&
                    response[0].vehicles &&
                    response[0].vehicles.length > 0 &&
                    response[0].vehicles[0].brand_name +
                      " - " +
                      (response.length > 0 && response[0].vehicles[0].model)
                  }}
                  {{
                    selectedVehicle[0] &&
                    selectedVehicle[0].roof &&
                    selectedVehicle[0].roof.height
                      ? " + " + i18n.$t("roof box")
                      : ""
                  }}
                  {{
                    selectedVehicle[0] && selectedVehicle[0].trailer
                      ? " + " +
                        i18n.$t(ucFirst(selectedVehicle[0].trailer.type))
                      : ""
                  }}
                </span>
              </p>
              <div v-if="installation" class="mb-2.5 text-left">
                <span class="uppercase">
                  {{ i18n.$t("Outward") }}
                </span>
                <div class="flex justify-between">
                  <div>
                    <span
                      v-for="place in installation.places"
                      :key="place.id"
                      class="mr-1"
                      >{{ place.count }}&nbsp;{{ i18n.$t(place.type) }} ({{
                        place.title
                      }})</span
                    >
                  </div>
                  <div style="min-width: 115px">
                    {{
                      displayDate(installation.depart_at, installation.duration)
                    }}
                  </div>
                </div>
              </div>
              <div v-if="installationReturn" class="mb-1 text-left mt-1">
                <span class="uppercase">
                  {{ i18n.$t("Return") }}
                </span>
                <div class="flex justify-between">
                  <div>
                    <span
                      v-for="place in installationReturn.places"
                      :key="place.id"
                      class="mr-1"
                      >{{ place.count }}&nbsp;{{ i18n.$t(place.type) }} ({{
                        place.title
                      }})</span
                    >
                  </div>
                  <div style="min-width: 115px">
                    {{
                      displayDate(
                        installationReturn.depart_at,
                        installationReturn.duration
                      )
                    }}
                  </div>
                </div>
              </div>
            </div>
            <p class="text-sm" v-else>
              <span class="mr-2">{{ adults }} {{ i18n.$t("Adults") }}</span>
              <span v-if="children > 0"
                >{{ children }} {{ i18n.$t("Children") }}</span
              >
              <span v-if="response.length > 0 && response[0].vehicles">
                <span class="font-lg">&bull;</span>
                {{
                  response.length > 0 &&
                  response[0].vehicles &&
                  response.length > 0 &&
                  response[0].vehicles[0].brand_name + " - " + response.length >
                    0 &&
                  response[0].vehicles[0].model
                }}
              </span>
            </p>
          </div>
        </div>
        <div
          v-if="installation /*&& route.path.split('/').pop() === 'confirm'*/"
          class="
            w-26
            flex flex-col
            items-start
            px-4
            box-content
            flex-shrink-0
            border-l border-indigo-800
          "
        >
          <p class="text-sm font-medium mb-3.5 uppercase">
            {{ i18n.$t("Total Price") }}
          </p>
          <p class="text-lg font-bold text-white mb-5">{{ totalPrice }}€</p>
          <ul class="flex justify-center">
            <li
              class="
                w-8
                h-5
                flex
                justify-center
                items-center
                rounded-sm
                mx-0.5
                bg-white
              "
            >
              <img class="max-h-full" src="../../assets/logo-cb.png" />
            </li>
            <li
              class="
                w-8
                h-5
                flex
                justify-center
                items-center
                rounded-sm
                mx-0.5
                bg-white
              "
            >
              <img class="max-h-full" src="../../assets/cheques.png" />
            </li>
            <li
              class="
                w-8
                h-5
                flex
                justify-center
                items-center
                rounded-sm
                mx-0.5
                bg-white
              "
            >
              <img class="max-h-full" src="../../assets/Accepter.png" />
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full flex justify-around text-gray-300">
        <button
          class="
            h-12
            w-full
            text-lg
            rounded-xl
            font-medium
            shadow
            duration-300
            text-dark
            bg-gray-300
            hover:bg-opacity-90
            my-1
            mx-2
          "
          @click="goResultsPage()"
        >
          {{ i18n.$t("Back to results") }}
        </button>
      </div>
      <dotted-line />
      <div class="w-full flex justify-around text-gray-300">
        <div
          v-for="company of companies"
          :key="company.name"
          class="companyStatus flex items-center"
          :style="{ 'background-image': 'url(' + company.logo + ')' }"
        >
          <spinner class="status" v-if="company.status != 'done'" />
          <!-- <img src="../../assets/tick.png" class="status" v-else /> -->
          <icon-check v-else />
        </div>
      </div>
      <dotted-line />
      <router-view />
    </div>
  </div>
  <div v-else-if="!response">
    <spinner  color="blue" class="w-9 h-9" />
  </div>
  <div v-else>Empty
    
  </div>
</template>

<script>
import moment from "moment";
import { computed, ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import useI18n from "../../plugins/useI18n";
import {
  GET_SEARCHED_RESPONSE,
  GET_DEPARTURE_AT,
  GET_RETURN_AT,
  GET_INSTALLATION,
  GET_RESULT_TOTAL_COST,
  GET_CONTACT_INFO,
  GET_INSTALLATION_RETURN,
  SET_INSTALLATION_RETURN,
  SET_INSTALLATION,
  GET_JOURNEY_DIRECTION,
  SET_SEARCHED_STATUS,
  SET_SEARCHED_STATUSES,
  GET_SEARCHED_STATUSES,
  GET_SEARCHED_STATUS,
  GET_SERVICES,
  SET_RESULT_TOTAL_COST,
  GET_SELECTED_VEHICLE,
} from "../../store/data/types";
import { DIRECTION_RETURN } from "../../store/data/types";
import IconArrowThickLeft from "../../components/Icons/IconArrowThickLeft.vue";
import IconRight from "../../components/Icons/IconRight.vue";
import IconArrowThickRight from "../../components/Icons/IconArrowThickRight.vue";
import IconVisa from "../../components/Icons/IconVisa.vue";
import IconMasterCard from "../../components/Icons/IconMasterCard.vue";
import IconCreditCard from "../../components/Icons/IconCreditCard.vue";
import IconLeftNew from "../../components/Icons/IconLeftNew.vue";
import { companies as companyData } from "../../store/data/companies";
import Spinner from "../../components/UI/Spinner.vue";
import DottedLine from "../../components/UI/DottedLine.vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import IconCheck from "../../components/Icons/IconCheck.vue";
import { ucFirst } from "../../plugins/utility";

export default {
  components: {
    IconArrowThickLeft,
    IconArrowThickRight,
    IconVisa,
    IconMasterCard,
    IconCreditCard,
    IconLeftNew,
    IconRight,
    Spinner,
    DottedLine,
    IconCheck,
  },
  setup() {
    onMounted(() => {
        
    })
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const adults = ref(0);
    const children = ref(0);
    const response = computed(() => store.getters[GET_SEARCHED_RESPONSE]);
    const departure_at = computed(() => store.getters[GET_DEPARTURE_AT]);
    const return_at = computed(() => store.getters[GET_RETURN_AT]);
    const installation = computed(() => store.getters[GET_INSTALLATION]);
    const journeyDrt = computed(() => store.getters[GET_JOURNEY_DIRECTION]);
    const selectedVehicle = computed(() => store.getters[GET_SELECTED_VEHICLE]);
    const installationReturn = computed(
      () => store.getters[GET_INSTALLATION_RETURN]
    );
    const contactInfo = computed(() => store.getters[GET_CONTACT_INFO]);
    const services = computed(() => store.getters[GET_SERVICES]);
    const totalPrice = computed(() => {
      if (!installation.value) return 0;
      let totalPrice = parseFloat(installation.value.tariffs.price);
      for (const meal of installation.value.meals) {
        totalPrice += meal.price * meal.quantity;
      }
      if (isReturn() && installationReturn.value) {
        for (const rmeal of installationReturn.value.meals) {
          totalPrice += rmeal.price * rmeal.quantity;
        }
      }

      if (isReturn() && installationReturn.value) {
        totalPrice += installationReturn.value.tariffs.price;
        /* if (promo.active) {
          totalPrice -= promo.value;
        } */
      }
      let insurrance = { active: false, amount: 0, type: "fixed" },
        promo = { active: false };
      if (services.value != null) {
        insurrance = services.value.insurrance
          ? services.value.insurrance
          : insurrance;
        promo = services.value.promo ? services.value.promo : promo;
      }

      if (insurrance.active) {
        if (insurrance.type == "fixed") {
          totalPrice += insurrance.amount;
        } else {
          // totalPrice += Math.round((totalPrice * insurrance.amount) / 100);
          totalPrice += (totalPrice * insurrance.amount) / 100;
        }
      }

      if (promo.active) {
        totalPrice -= promo.value;
      }

      totalPrice = Math.round(totalPrice * 100) / 100;
      store.commit(SET_RESULT_TOTAL_COST, totalPrice);
      return totalPrice;
    });

    const { i18n } = useI18n();
    let companyLogos = {};
    for (const co of companyData) {
      companyLogos[co.name] = co.logo;
    }
    const companies = computed(() => {

    const status = store.getters[GET_SEARCHED_STATUS];
    const statuses = store.getters[GET_SEARCHED_STATUSES];
    const response = store.getters[GET_SEARCHED_RESPONSE];
    response;
    status;
    let items = [];
    if (!statuses) {
      return items;
    }
    for (const co of Object.values(statuses)) {
      items.push({ ...co, logo: companyLogos[co.company] });
    }
    return items;
  });

    function displayDepartName() {
      if (response.value.length > 0) {
        return response.value[0].direction.toLowerCase() ===
          DIRECTION_RETURN.toLowerCase()
          ? response.value[0].arrive_name
          : response.value[0].depart_name;
      }
      return "";
    }

    function isReturn() {
      return journeyDrt.value === DIRECTION_RETURN && installationReturn.value;
    }

    function displayArriveName() {
      if (response.value.length > 0) {
        return response.value[0].direction.toLowerCase() ===
          DIRECTION_RETURN.toLowerCase()
          ? response.value[0].depart_name
          : response.value[0].arrive_name;
      }
      return "";
    }

    //getting Total passenger counts
    function getTotal() {
      if (response.value.length > 0) {
        return response.value[0].passenger_count;
      }
      return 0;
    }

    function getVehicleType() {
      if (response.value[0].vehicles.brand == undefined) {
        return "no vehicle";
      } else {
        if (response.value.length > 0) {
          return (
            response.value[0].vehicles.brand +
            " " +
            response.value[0].vehicles.model
          );
        }
      }
    }

    function canBack() {
      return true;
      const path = route.path.split("/");
      const page = path[path.length - 1];
      return page !== "cost";
    }
    async function goFerry() {
      await store.commit(SET_SEARCHED_STATUS, null);
      await store.commit(SET_SEARCHED_STATUSES, null);
      router.push({
        path: "/ferry",
      });
      await store.commit(SET_INSTALLATION, null);
      await store.commit(SET_INSTALLATION_RETURN, null);
    }
    async function onGoback() {
      const path = route.path.split("/");
      const page = path[path.length - 1];
      switch (page) {
        case "cost":
          await store.commit(SET_SEARCHED_STATUS, null);
          await store.commit(SET_SEARCHED_STATUSES, null);
          router.push({
            path: "/ferry",
          });
          await store.commit(SET_INSTALLATION, null);
          await store.commit(SET_INSTALLATION_RETURN, null);
          break;
        case "installation":
          if (route.query.type == "return") {
            router.push({
              path: "/result/cost/return",
            });
          } else {
            router.push({
              path: "/result/cost",
            });
          }
          break;
        case "return":
          router.push({
            path: "/result/cost",
          });
          break;
        case "confirm":
          if (isReturn()) {
            router.push({
              path: "/result/cost/return",
            });
          } else {
            router.push({
              path: "/result/cost",
            });
          }
          break;
        case "passengerdetail":
          router.push({
            path: "/result/confirm",
          });
          break;
        case "resume":
          router.push({
            path: "/passengerdetail",
          });
          break;
        default:
          break;
      }
    }

    function canNext() {
      const path = route.path.split("/");
      const page = path[path.length - 1];
      switch (page) {
        case "cost":
          return departure_at.value;
        case "installation":
          return installation.value;
        case "confirm":
          return JSON.stringify(contactInfo.value) !== JSON.stringify({});
        default:
          return false;
      }
    }

    function displayDate(dateVal, durationVal) {
      return moment(dateVal, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY - HH[H]mm");
      // var date = moment(dateVal, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY");
      // var durationArr = durationVal.split(".");
      // var duration = `${durationArr[0]}H${durationArr[1]}`;
      // return `${date} - ${duration}`;
    }

    function goResultsPage() {
      router.push({
        path: "/result/cost",
      });
    }

    function onNext() {
      const path = route.path.split("/");
      const page = path[path.length - 1];
      switch (page) {
        case "cost":
          router.push({
            path: "/result/installation",
          });
          break;
        case "installation":
          router.push({
            path: "/result/confirm",
          });
          break;
        default:
          break;
      }
    }

    if (response.value) {
      console.log("test_response----->",response)
      if (response.value[0]) {
        for (const ps of response.value[0].passengers) {
          if (ps.type === "Adult") {
            adults.value++;
          } else if (ps.type === "Children") {
            children.value++;
          }
        }
      }

    }

    watch(
      () => store.getters[GET_SEARCHED_RESPONSE],
      (value, old) => {
        if (old == 0) return;
        const diff = value - old;
        if (diff > 0) {
          createToast(diff + " " + i18n.$t("new departure(s) added to list"), {
            type: "success",
            position: "top-right",
          });
        }
      }
    );
    

    
   
    return {
      adults,
      canBack,
      canNext,
      children,
      contactInfo,
      departure_at,
      displayDate,
      displayDepartName,
      displayArriveName,
      getTotal,
      getVehicleType,
      i18n,
      installation,
      installationReturn,
      onGoback,
      onNext,
      response,
      return_at,
      route,
      totalPrice,
      goFerry,
      isReturn,
      companies,
      goResultsPage,
      selectedVehicle,
      ucFirst,
    };
  },
};
</script>
<style scoped>
.companyStatus {
  background-size: 60px;
  background-position: center right;
  background-repeat: no-repeat;
  height: 50px;
  width: 110px;
}
.companyStatus .status {
  float: left;
  height: 100%;
}
.companyStatus img.status {
  float: left;
  height: 60%;
  margin-top: 10px;
}
</style>