<template>
  <ul>
    <ListItem
      v-for="item in items"
      :key="item.id"
      :journey="item"
      :groups="groups"
    />
  </ul>
</template>

<script>
import ListItem from "./ListItem.vue";
export default {
  components: {
    ListItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    groups: {
      type: Object,
      default: () => [],
    },
    selectedlist: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
};
</script>