<template>
  <router-link
    v-bind="$props"
    custom
    v-slot="{ isActive, navigate, activeClass, inactiveClass }"
  >
    <a
      v-bind="$attrs"
      :href="newLink"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </router-link>
</template>

<script>
import { computed, onBeforeMount, ref } from "@vue/runtime-core";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";
import { GET_LANGUAGE } from "../store/data/types";

export default {
  //name: 'AppLink',
  inheritAttrs: false,

  props: {
    // add @ts-ignore if using TypeScript
    ...RouterLink.props,
  },
  setup(props) {
    const store = useStore();
    const lang = computed(() => store.getters[GET_LANGUAGE]);
    const newLink = computed(() => "/" + lang.value + props.to);

    return {
      ...RouterLink.data,
      newLink,
    };
  },
};
</script>