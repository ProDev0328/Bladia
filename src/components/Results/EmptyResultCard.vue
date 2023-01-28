<template>
  <div class="mb-5">
    <div class="shadow-card rounded-md px-5 py-4 cursor-pointer">
      <div class="flex justify-between items-center mb-2">
        <div>
          <img :src="company_logo" class="w-14" alt="" />
          <span class="text-sm text-disable text-left mt-2">
            {{ i18n.$t("No availability") }}
          </span>
        </div>
      </div>

      <dotted-line />
      <div class="flex justify-between items-center py-4">
        <div class="text-left">
          <p class="text-base font-semibold text-dark mb-2">
            {{ out_name }}
          </p>

          <p class="text-sm text-disable">
            {{ out_at ? displayDate(out_at) : "_" }}
          </p>
        </div>
        <div class="flex flex-col items-center text-center px-2 relative">
          <p class="text-sm text-main"></p>
          <div
            class="relative flex items-center justify-center absolute -top-2"
          >
            <img src="../../assets/path.png" />
          </div>
        </div>
        <div class="text-right">
          <p class="text-base font-semibold text-dark mb-2">
            {{ ret_name }}
          </p>
          <p class="text-sm text-disable">
            {{ ret_at ? displayDate(ret_at) : "_" }}
          </p>
        </div>
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
  GET_INSTALLATION_RETURN,
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
    out_name: {
      type: String,
      default: "_",
    },
    ret_name: {
      type: String,
      default: "_",
    },
    company_logo: {
      type: String,
      default: "",
    },
    out_at: {
      type: String,
      default: "",
    },
    ret_at: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const is_dev = process.env.NODE_ENV === "development";
    const store = useStore();
    const { i18n } = useI18n();
    const installtion = computed(() => {
      const item = store.getters[GET_INSTALLATION_RETURN];
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