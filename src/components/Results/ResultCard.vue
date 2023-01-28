<template>
  <div class="mb-5">
    <p v-if="isReturn()" class="font-semibold text-sm text-left mb-2">
      {{ i18n.$t("Outward") }}:
    </p>
    <div class="shadow-card rounded-md px-5 py-4 cursor-pointer">
      <div class="flex justify-between items-center mb-2">
        <img :src="installtion.logo" class="w-14" alt="" />
        <p class="text-lg font-bold text-dark leading-0">
          {{ installtion ? installtion.tariffs.price : item.tariffs.price }} €
        </p>
      </div>
      <div class="flex justify-end mb-1.5">
        <div class="w-10 h-7 ml-1.5">
          <img src="../../assets/logo-cb.png" alt="" />
        </div>
        <div class="w-10 h-7 ml-1.5">
          <img src="../../assets/cheques.png" alt="" />
        </div>
        <div class="w-10 h-7 ml-1.5">
          <img src="../../assets/Accepter.png" alt="" />
        </div>
      </div>
      <div
        v-for="place in installtion.places"
        :key="place.id"
        class="mt-1 mb-1"
      >
        <dotted-line class="mb-2" />
        <p class="font-semibold text-left">
          {{ place.count }}&nbsp;{{ i18n.$t(place.type) }}&nbsp;{{
            is_dev ? place.code + "&nbsp;" : ""
          }}( {{ place.title }} )
        </p>
      </div>
      <dotted-line />
      <div class="flex justify-between items-center py-4">
        <div class="text-left">
          <p class="text-base font-semibold text-dark mb-2">
            {{ installtion.depart_name }}
          </p>

          <p class="text-sm font-medium text-dark mb-2">
            {{ displayTime(installtion.depart_at) }}
          </p>
          <p class="text-sm text-disable">
            {{ displayDate(installtion.depart_at) }}
          </p>
        </div>
        <div class="flex flex-col items-center text-center px-2 relative">
          <p class="text-sm text-main">
            {{ installtion.ship_name }}
          </p>
          <div
            class="relative flex items-center justify-center absolute -top-2"
          >
            <img src="../../assets/path.png" />
          </div>
          <p class="text-sm text-main absolute top-12 text-center">
            {{ displayDuration(installtion.duration) }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-base font-semibold text-dark mb-2">
            {{ installtion.arrive_name }}
          </p>
          <p class="text-sm font-medium text-dark mb-2">
            {{ displayTime(installtion.arrive_at) }}
          </p>
          <p class="text-sm text-disable">
            {{ displayDate(installtion.arrive_at) }}
          </p>
        </div>
      </div>
      <div class="text-right">
        <span class="mr-2">{{ company }}</span>
        <input
          type="radio"
          class="form-radio"
          name="company"
          :checked="selected"
          :value="company"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DottedLine from "../UI/DottedLine.vue";
import IconVisa from "../Icons/IconVisa.vue";
import IconMasterCard from "../Icons/IconMasterCard.vue";
import IconCreditCard from "../Icons/IconCreditCard.vue";
import IconRight from "../Icons/IconRight.vue";
import {
  DIRECTION_RETURN,
  GET_INSTALLATION,
  GET_JOURNEY_DIRECTION,
  SET_DURATION,
} from "../../store/data/types";
import useI18n from "../../plugins/useI18n";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: {
    DottedLine,
    IconVisa,
    IconMasterCard,
    IconCreditCard,
    IconRight,
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Boolean,
      default: false,
    },
    company: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const is_dev = process.env.NODE_ENV === "development";
    const store = useStore();
    const { i18n } = useI18n();
    const installtion = computed(() => {
      const item = store.getters[GET_INSTALLATION];
      if (item.company != props.company && !!props.item) {
        return props.item;
      }
      return item;
    });
    function displayDate(val) {
      const date = moment(val, "YYYY-MM-DD HH:mm");
      const month = date.format("MMM");
      const day = +date.format("D");
      const fullDate = day + " " + i18n.$t(month);
      return fullDate;
    }

    function isReturn() {
      return props.item.direction === DIRECTION_RETURN;
    }

    function displayTime(val) {
      return (
        moment(val, "YYYY-MM-DD HH:mm").format("HH") +
        "H" +
        moment(val, "YYYY-MM-DD HH:mm").format("mm")
      );
    }

    function displayDuration(val) {
      var hrs = Math.floor((val * 1) / 1);
      var minutes = Math.round(((val * 1) % 1) * 60);
      return hrs + "H" + ("0" + minutes).slice(-2);
    }

    function displayName(name) {
      if (name) {
        const nameArr = name.split("-");
        return nameArr[0].trim();
      } else {
        return "From";
      }
    }

    function displayDepartName(name) {
      if (name) {
        const nameArr = name.split("-");
        return nameArr[1].trim();
      } else {
        return "To";
      }
    }

    return {
      displayDate,
      displayTime,
      displayDuration,
      displayDepartName,
      displayName,
      i18n,
      installtion,
      isReturn,
      is_dev,
    };
  },
};
</script>