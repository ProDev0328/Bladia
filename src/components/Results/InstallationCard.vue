<template>
  <div
    class="shadow-card rounded-md overflow-hidden px-3 mb-5"
    :class="{ 'border-green-400 border-2 border-opacity-50': selected }"
  >
    <div class="flex justify-between items-center py-4">
      <div>
        <img :src="item.logo" class="w-14" alt="" />
        <br />
        <span class="text-sm text-disable text-left mt-2">
          {{ displayDate(item.depart_at) }}
        </span>
      </div>
      <div
        v-if="item.tariffs.presale && item.tariffs.presale.length > 0"
        class="w-1/2 border-r"
      >
        <p class="text-lg font-bold mb-2.5 leading-none">
          {{ item.tariffs.presale.price_option }}€
        </p>
        <p class="text-sm font-medium text-gray-400 mb-4 leading-none">
          {{ i18n.$t("OPTIONS") }}
        </p>
        <p class="text-sm font-medium leading-none">
          {{ i18n.$t("Left to Pay") }}
        </p>
      </div>
      <div class="w-1/3">
        <p class="text-sm font-medium text-gray-500 leading-none">
          {{
            item.direction == "Return"
              ? i18n.$t("return price")
              : i18n.$t("outward price")
          }}
        </p>

        <p class="text-lg font-bold mb-2.5 leading-none">
          {{ item.tariffs.price }} €
        </p>

        <ul class="flex justify-center">
          <li
            class="
              w-10
              h-7
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
              w-10
              h-7
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
              w-10
              h-7
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
    <div v-for="place in places" :key="place.id" class="mt-1 mb-1">
      <dotted-line class="mb-2" />
      <div class="flex justify-between">
        <p class="font-semibold text-left mr-2">
          {{ place.count }}&nbsp;{{ i18n.$t(place.type) }}&nbsp;{{
            is_dev ? place.code + "&nbsp;" : ""
          }}&nbsp;( {{ place.title }} )
        </p>
        <span class="flex justify-end items-center">
          <icon-bed
            class="mr-2"
            v-if="place.type == 'Cabin' || place.type == 'Suite'"
          />
          <icon-window
            class="mr-2"
            v-if="place.in_board.has_window && place.type != 'Seat'"
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
      </div>
    </div>
    <p class="flex justify-between w-full my-1">
      <!-- <span
        class="text-sm text-main text-right underline cursor-pointer"
        @click="$emit('select')"
      >
        {{
          item.direction == "Outward"
            ? i18n.$t("Choose this outward")
            : i18n.$t("Choose this return")
        }}
      </span> -->
    </p>
    <dotted-line class="mb-2" />
    <div class="py-4">
      <div class="flex items-center mb-5 justify-between">
        <div class="flex items-center">
          <icon-adult class="mr-3.5" />
          <p class="font-medium text-sm leading-none">
            {{ adults }} {{ i18n.$t("Adults") }}
            <span v-if="children > 0">
              + {{ children }}
              {{ i18n.$t("Children") }}
            </span>
            <span v-if="babies > 0">+ {{ babies }} {{ i18n.$t("Baby") }}</span>
          </p>
        </div>
        <button
          type="button"
          class="py-1 rounded shadow hover:bg-gray-100"
          :class="{
            'px-2 border-2 border-green-400': selected,
            'px-3 border border-gray-400': !selected,
          }"
          @click="$emit('select')"
        >
          <icon-done v-if="selected" />
          <input
            v-else
            type="radio"
            class="form-radio"
            name="selectInstallation"
          />
        </button>
      </div>
      <div class="flex items-center mb-5" v-if="item.vehicles">
        <icon-car-new class="mr-3.5" />
        <p class="font-medium text-sm leading-none">
          {{ item.vehicles[0].brand_name }} {{ item.vehicles[0].model }}
          <span v-if="item.vehicles[0].trailer">
            - {{ i18n.$t("Caravan") }}
          </span>
        </p>
      </div>
      <div class="flex items-center">
        <img src="../../assets/done.svg" class="mr-3.5" />
        <p class="font-medium text-sm leading-none text-left">
          {{ i18n.$t("Cacellation") }} / {{ i18n.$t("Modification") }} /
          {{ i18n.$t("Refund") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import DottedLine from "../UI/DottedLine.vue";
import IconVisa from "../Icons/IconVisa.vue";
import IconMasterCard from "../Icons/IconMasterCard.vue";
import IconCreditCard from "../Icons/IconCreditCard.vue";
import IconUser from "../Icons/IconUser.vue";
import IconAdult from "../Icons/IconAdult.vue";
import IconChildren from "../Icons/IconChildren.vue";
import useI18n from "../../plugins/useI18n";
import { computed, ref } from "vue";
import IconCarNew from "../Icons/IconCarNew.vue";
import IconBed from "../Icons/IconBed.vue";
import IconShower from "../Icons/IconShower.vue";
import IconWc from "../Icons/IconWc.vue";
import IconWindow from "../Icons/IconWindow.vue";
import IconArmchair from "../Icons/IconArmchair.vue";
import moment from "moment";
import IconDone from "../Icons/IconDone.vue";
export default {
  components: {
    DottedLine,
    IconAdult,
    IconCarNew,
    IconChildren,
    IconCreditCard,
    IconMasterCard,
    IconUser,
    IconVisa,
    IconBed,
    IconShower,
    IconArmchair,
    IconWc,
    IconWindow,
    IconDone,
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
  },
  setup(props) {
    const is_dev = process.env.NODE_ENV === "development";
    const adults = ref(0);
    const children = ref(0);
    const babies = ref(0);
    const { i18n } = useI18n();
    for (const ps of props.item.passengers) {
      if (ps.type === "Adult") {
        adults.value++;
      } else if (ps.type === "Child") {
        children.value++;
      } else if (ps.type === "Baby") {
        babies.value++;
      }
    }
    const places = computed(() => {
      return props.item.places.sort((a, b) => {
        if (a.type == b.type) {
          return 0;
        }
        if (a.type == "Suite") {
          return -1;
        }
        if (a.type == "Cabin") {
          if (b.type == "Suite") {
            return 1;
          } else {
            return -1;
          }
        }
        return 1;
      });
    });

    function displayDate(dateVal) {
      return moment(dateVal, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY - HH[H]mm");
    }
    return {
      adults,
      children,
      babies,
      i18n,
      displayDate,
      is_dev,
      places,
    };
  },
};
</script>