<template>
  <div class="calendar-page">
    <div class="m-4 mb-0">
      <icon-cancel @click="onCancelDate" />
    </div>
    <span
      class="
        text-red-400
        m-0
        absolute
        left-1/2
        transform
        -translate-x-1/2
        z-20
        bg-transparent
        p-1
        w-full
      "
      :class="validDate ? 'block' : 'hidden'"
      >{{ i18n.$t("Please select Valid Date") }}</span
    >
    <p class="mt-2 text-center text-lg font-medium">
      {{
        routetype === `outward`
          ? selectedJourney[0].name
          : selectedJourney[1].name
      }}
    </p>
    <p class="mb-5 text-gray-500 text-center font-small">
      <span
        v-for="company in companyNames"
        :key="company"
        class="mr-2"
        :style="{ color: companyColors[company] }"
      >
        {{ company }}
      </span>
    </p>
    <v-date-picker
      ref="calendar"
      v-model="date"
      :attributes="attributes"
      :locale="manageLanguage"
      :from-date="new Date(min_date[0])"
      :rows="3"
      :available-dates="dates"
      :disabled-dates="dates.length === 0 && { start: null, end: null }"
      class="w-full border-none m-auto pt-1"
      @click="onValidDate(date)"
    />
    <div class="flex justify-between px-5 custom-arrows">
      <icon-left @click="prevPage()" />
      <icon-right @click="nextPage()" />
    </div>
  </div>
</template>

<script>
import { ref, computed, refs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import useI18n from "../plugins/useI18n";
import IconCancel from "../components/Icons/IconCancel.vue";
import { companies as companyData } from "../store/data/companies";
import {
  DIRECTION_OUTWARD,
  DIRECTION_RETURN,
  GET_SELECTED_JOURNEY,
  GET_OUT_VALID_DATES,
  GET_RET_VALID_DATES,
  SET_OUT_AT,
  SET_RET_AT,
  GET_LANGUAGE,
  SET_OUT_TIME,
  SET_RET_TIME,
  GET_OUT_AT,
  GET_OUTJOURNEYS,
  GET_RETJOURNEYS,
  SET_INSTALLATION,
  SET_INSTALLATION_RETURN,
} from "../store/data/types";
import { useMeta } from "vue-meta";
import IconLeft from "../components/Icons/IconLeft.vue";
import IconRight from "../components/Icons/IconRight.vue";
import { commonMetaTags } from '../plugins/utility';
export default {
  name: "Calendar",
  components: {
    IconCancel,
    IconLeft,
    IconRight,
  },
  methods: {
    nextPage: function () {
      const calendar = this.$refs.calendar;
      calendar.move(3);
    },
    prevPage: function () {
      const calendar = this.$refs.calendar;
      calendar.move(-3);
    },
  },
  setup() {
    const { i18n } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const validDate = ref(false);
    const routetype = ref(route.query.type);
    const selectedJourney = computed(() => store.getters[GET_SELECTED_JOURNEY]);
    const out_at = computed(() => store.getters[GET_OUT_AT]);
    const lang = computed(() => store.getters[GET_LANGUAGE]);
    const manageLanguage = ref(lang);
    const attributes = ref([]);
    const outJourneys = computed(() => store.getters[GET_OUTJOURNEYS]);
    const retJourneys = computed(() => store.getters[GET_RETJOURNEYS]);
    const validDates = computed(() => {
      return routetype.value === DIRECTION_OUTWARD
        ? store.getters[GET_OUT_VALID_DATES]
        : store.getters[GET_RET_VALID_DATES];
    });

    useMeta({
      title: i18n.$t("SEO")["calendar"]["title"],
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["calendar"]["description"],
        },
      ].concat(
        commonMetaTags(
          i18n.$t("SEO")["calendar"]["title"],
          i18n.$t("SEO")["calendar"]["description"]
        )
      ),
    });

    const date = null;
    var avb_date = null;
    var dates = [];
    var min_date = [];
    let companies = [];
    let companyColors = {};
    for (const co of companyData) {
      companyColors[co.name] = co.color;
    }
    for (let i = 0; i < validDates.value.length; i++) {
      avb_date = validDates.value[i];
      var start_date = new Date(avb_date.date);
      var out_date = new Date(out_at.value);
      start_date.setHours(0);
      start_date.setMinutes(0);
      if (!companies[avb_date.company]) {
        companies[avb_date.company] = {
          company: avb_date.company,
          dot: {
            style: {
              "background-color": companyColors[avb_date.company],
            },
          },
          dates: [],
          days: [],
        };
      }
      if (routetype.value !== DIRECTION_OUTWARD) {
        if (start_date > out_date) {
          min_date.push(start_date);
          companies[avb_date.company]["dates"].push({
            start: start_date,
            end: start_date,
          });
          companies[avb_date.company]["days"].push(start_date.toDateString());
          dates.push({
            start: start_date,
            end: start_date,
          });
        }
      } else {
        companies[avb_date.company]["dates"].push({
          start: start_date,
          end: start_date,
        });

        companies[avb_date.company]["days"].push(start_date.toDateString());
        dates.push({
          start: start_date,
          end: start_date,
        });
      }
    }
    min_date = min_date.sort((a, b) => {
      return new Date(a) - new Date(b);
    });
    attributes.value = Object.values(companies);
    //console.log(outJourneys, retJourneys);
    function onValidDate(vd) {
      const outMonth = vd && `0${vd.getMonth() + 1}`.slice(-2);
      const outDay = vd && `0${vd.getDate()}`.slice(-2);
      const outYear = vd && vd.getFullYear();
      const currDate = `${outYear}-${outMonth}-${outDay}`;

      let outTime = {},
        retTime = {},
        tempTime;
      let outDate = {},
        retDate = {};

      // const validCompanies = Object.values(companies).filter((company) => {
      //   return company.days.includes(vd.toDateString());
      // });
      if (routetype.value === DIRECTION_OUTWARD) {
        for (const outJourney of outJourneys.value) {
          const tempTime = outJourney.departure.filter((item) => {
            return item.depart === currDate;
          })[0];
          outTime[outJourney.company] = tempTime?.time;
          outDate[outJourney.company] = tempTime?.depart;
          let diff, m, d, y, dateDiff, vdDiff, inc;
          diff = 1;
          while (!tempTime && diff <= 3) {
            inc = 1;
            while (!tempTime && inc >= -1) {
              vdDiff = new Date(vd.getTime());
              vdDiff.setDate(vdDiff.getDate() + diff * inc);
              m = `0${vdDiff.getMonth() + 1}`.slice(-2);
              d = `0${vdDiff.getDate()}`.slice(-2);
              y = vdDiff.getFullYear();
              dateDiff = `${y}-${m}-${d}`;
              tempTime = outJourney.departure.filter((item) => {
                return item.depart === dateDiff;
              })[0];
              outTime[outJourney.company] = tempTime?.time;
              outDate[outJourney.company] = tempTime?.depart;
              inc -= 2;
            }
            diff++;
          }
          if (!tempTime) {
            delete outTime[outJourney.company];
            delete outDate[outJourney.company];
          }
        }
      }

      if (routetype.value === DIRECTION_RETURN) {
        for (const retJourney of retJourneys.value) {
          tempTime = retJourney.departure.filter((item) => {
            return item.depart === currDate;
          })[0];
          retTime[retJourney.company] = tempTime?.time;
          retDate[retJourney.company] = tempTime?.depart;
          let diff, m, d, y, dateDiff, vdDiff, inc;
          diff = 1;
          while (!tempTime && diff <= 3) {
            inc = 1;
            while (!tempTime && inc >= -1) {
              vdDiff = new Date(vd.getTime());
              vdDiff.setDate(vdDiff.getDate() + diff * inc);
              m = `0${vdDiff.getMonth() + 1}`.slice(-2);
              d = `0${vdDiff.getDate()}`.slice(-2);
              y = vdDiff.getFullYear();
              dateDiff = `${y}-${m}-${d}`;
              tempTime = retJourney.departure.filter((item) => {
                return item.depart === dateDiff;
              })[0];
              retTime[retJourney.company] = tempTime?.time;
              retDate[retJourney.company] = tempTime?.depart;
              inc -= 2;
            }
            diff++;
          }
          if (!tempTime) {
            delete retTime[retJourney.company];
            delete retDate[retJourney.company];
          }
        }
      }
      switch (routetype.value) {
        case DIRECTION_OUTWARD:
          store.commit(SET_OUT_AT, { dates: outDate, selectedDate: currDate });
          store.commit(SET_OUT_TIME, outTime);
          break;
        case DIRECTION_RETURN:
          store.commit(SET_RET_AT, { dates: retDate, selectedDate: currDate });
          store.commit(SET_RET_TIME, retTime);
          break;
        default:
          break;
      }

      if (vd !== null && vd !== undefined) {
        router.push({ path: `/ferry` });
        validDate.value = false;
      } else {
        validDate.value = true;
      }

      store.commit(SET_INSTALLATION, null);
      store.commit(SET_INSTALLATION_RETURN, null);
    }

    function onCancelDate() {
      router.push({ path: `/ferry` });
    }
    const companyNames = Object.keys(companies);
    return {
      routetype,
      selectedJourney,
      validDates,
      onValidDate,
      date,
      avb_date,
      dates,
      onCancelDate,
      validDate,
      manageLanguage,
      min_date,
      i18n,
      attributes,
      companyNames,
      companyColors,
    };
  },
};
</script>
<style scoped>
.vc-container.w-full {
  width: 100% !important;
}
.custom-arrows {
  position: relative;
  bottom: 255px;
}
</style>