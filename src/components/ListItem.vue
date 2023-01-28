<template>
  <li
    class="w-full rounded-md p-3 shadow-card mb-2.5 cursor-pointer"
    :class="{ 'text-main border border-main': selected }"
    @click="onClickItem"
  >
    <p class="text-md font-semibold">
      {{ journey.name }}
    </p>
    <p class="'text-gray-500 text-sm">
      <span v-if="groups[journey.name.toLowerCase()]">
        <span v-for="jo of groups[journey.name.toLowerCase()]" :key="jo._id" class="mx-2">
          {{ jo.company }}
        </span>
      </span>
      <span v-else>
        {{ journey.company }}
      </span>
    </p>
  </li>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { CHANGE_SCREEN, GET_SELECTEDITEM } from "../store/data/types";
export default {
  props: {
    journey: {
      type: Object,
      default: () => {},
    },
    groups: {
      type: Object,
      default: () => [],
    },
  },

  setup(props) {
    const store = useStore();
    const selected = computed(
      () => props.journey.id === store.getters[GET_SELECTEDITEM].id
    );
    function onClickItem() {
      store.commit(CHANGE_SCREEN, {
        screen: false,
        item: props.journey,
      });
    }
    function showGroup(journey) {
      if (journey.group == true) {
        return false;
      }
      return props.groups.includes(journey.name.toLowerCase());
    }
    return { selected, onClickItem, showGroup };
  },
};
</script>