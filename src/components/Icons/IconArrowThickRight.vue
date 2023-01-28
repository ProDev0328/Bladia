<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path
      d="M10 7H2v6h8v5l8-8-8-8v5z"
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
