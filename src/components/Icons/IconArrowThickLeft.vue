<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path
      d="M10 13h8V7h-8V2l-8 8 8 8v-5z"
      :fill="color"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "#000000",
    },
  },
};
</script>
