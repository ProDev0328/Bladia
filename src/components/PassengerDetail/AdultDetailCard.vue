<template>
  <div
    class="shadow-card relative flex items-center justify-center rounded-md p-2"
    :class="{'border-2 border-green-100': completed }"
  >
    <div class="absolute left-5">
      <icon-user />
    </div>

    <div class="text-dark">
      <p class="text-base font-semibold">
        {{ i18n.$t(passenger.gender) }}
      </p>
      <p class="text-sm font-medium">
        {{ i18n.$t("Passenger") }}&nbsp;{{ passenger.order }}
      </p>
    </div>
    <div class="absolute right-5">
      <button
        type="button"
        class="
          h-10
          w-10
          flex flex-wrap
          justify-center
          content-center
          rounded-xl
          shadow
          text-white text-center
          duration-300
          hover:bg-opacity-90
          bg-main
        "
        
        @click="$emit('onedit')"
      >
        <icon-pencil />
      </button>
    </div>
  </div>
</template>

<script>
import IconUser from "../Icons/IconUser.vue";
import IconCheck from "../Icons/IconCheck.vue";
import useI18n from "../../plugins/useI18n";
import IconPencil from "../Icons/IconPencil.vue";
export default {
  components: {
    IconUser,
    IconCheck,
    IconPencil,
  },
  props: {
    passenger: {
      type: Object,
      default: () => {},
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { i18n } = useI18n();
    return { i18n };
  },
};
</script>