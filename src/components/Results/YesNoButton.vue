<template>
  <div>
    <button
      class="w-14 h-6 rounded text-xs font-medium ml-2.5"
      :class="isYes() ? 'bg-main text-white' : 'bg-disable text-dark'"
      @click="() => onChange(true)"
    >
      {{ i18n.$t("YES") }}
    </button>
    <button
      class="w-14 h-6 rounded text-xs font-medium ml-2.5"
      :class="isNo() ? 'bg-main text-white' : 'bg-disable text-dark'"
      @click="() => onChange(false)"
    >
      {{ i18n.$t("NO") }}
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import useI18n from "../../plugins/useI18n";

export default {
  props: {
    init: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const { i18n } = useI18n();

    let selection = ref();
    selection.value = props.init;

    function isYes() {
      return selection.value === true;
    }

    function isNo() {
      return selection.value === false;
    }

    function onChange(val) {
      selection.value = val;
      emit("onchange", val);
    }

    return { selection, isYes, i18n, isNo, onChange };
  },
};
</script>