<template>
  <div class="relative py-5">
    <div class="flex justify-between">
      <div class="flex items-center">
        <div class="mr-2">
          <icon-boy v-if="gender == 'Boy'" />
          <icon-girl v-else />
        </div>
        <p class="font-medium text-base text-main text-left">
          {{ i18n.$t("Children") }} {{ i18n.$t(gender) }}
          <br />
          <small> {{ age }} {{ i18n.$t("years") }} </small>
        </p>
      </div>
      <div class="flex items-center">
        <button
          class="
            flex
            justify-center
            items-center
            text-white text-base
            w-5
            h-5
            rounded-full
          "
          :class="childrenOrder === 0 ? 'bg-disable' : 'bg-theme-red'"
          @click="onDecrementChildren"
        >
          &ndash;
        </button>
        <div class="w-12 text-center text-gray text-base rounded-full">
          {{ childrenOrder }}
        </div>
        <button
          class="
            flex
            justify-center
            items-center
            bg-theme-red
            text-white text-base
            w-5
            h-5
            rounded-full
          "
          @click="onIncrementChildren"
        >
          +
        </button>
      </div>
    </div>
    <div class="flex flex-row flex-wrap px-5">
      <p class="text-xs" v-if="childrenAges.length > 0">
        {{ i18n.$t("fill ages") }}
      </p>
      <input
        v-for="ii in childrenOrder"
        :key="ii"
        v-model="childrenAges[ii - 1]"
        type="number"
        class="
          w-8
          h-4
          m-0.5
          rounded-full
          border
          text-xs text-dark
          font-medium
          text-center
          focus:outline-none
        "
        @change="onChangeAges"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import IconUser from "../Icons/IconUser.vue";
import useI18n from "../../plugins/useI18n";
import IconBoy from "../Icons/IconBoy.vue";
import IconGirl from "../Icons/IconGirl.vue";
export default {
  components: {
    IconUser,
    IconBoy,
    IconGirl,
  },
  props: {
    gender: {
      type: String,
      default: "Boy",
    },
    age: {
      type: String,
      default: "-18",
    },
    init: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const childrenOrder = ref(props.init.length);
    const { i18n } = useI18n();
    let childrenAges = ref([]);
    for (const ch of props.init) {
      childrenAges.value.push(parseInt(ch));
    }

    function onIncrementChildren() {
      childrenAges.value.push("");
      childrenOrder.value++;
      emitValue();
    }

    function onDecrementChildren() {
      if (childrenOrder.value > 0) {
        childrenOrder.value--;
        childrenAges.value.shift();
        emitValue();
      }
    }

    function onChangeAges() {
      emitValue();
    }

    function emitValue() {
      emit("onchange", Object.values(childrenAges.value));
    }

    return {
      childrenOrder,
      childrenAges,
      onIncrementChildren,
      onDecrementChildren,
      onChangeAges,
      i18n,
    };
  },
};
</script>
<style scoped>
input.border {
  border: 1px solid #777;
}
</style>