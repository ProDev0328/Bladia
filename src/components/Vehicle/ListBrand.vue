<template>
  <ul>
    <ListItemBrand v-for="item in items" :key="item.id" :brand="item.name" :logo="item.logo" />
  </ul>
</template>

<script>
import ListItemBrand from "./ListItemBrand";
export default {
  components: {
    ListItemBrand,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>