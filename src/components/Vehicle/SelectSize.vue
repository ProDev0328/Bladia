<template>
  <div class="flex flex-row flex-wrap">
    <button
      v-for="item in items"
      :key="item"
      class="text-sm rounded w-16 border p-1 box-content m-1"
      :class="{
        'font-bold border-main text-main': item === selected,
        'text-dark': item !== selected,
      }"
      @click="() => onSelect(item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    items: {
      type: Array,
      default: () => [""],
    },
  },
  setup(props, { emit }) {
    const selected = ref(props.items[0]);

    function onSelect(val) {
      selected.value = val;
      emit("on-select-value", val);
    }
    return { selected, onSelect };
  },
};
</script>
