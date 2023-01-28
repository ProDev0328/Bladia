<template>
  <div class="border rounded p-2 flex items-center">
    <p class="rounded-full h-24 w-24 flex items-center justify-center border">
      {{ rate }}/5
    </p>
    <div class="text-left ml-4">
      <div class="flex flex-row items-center">
        <p>{{ first_name }}</p>
        <div class="ml-2">
          <span v-for="idx in parseInt(rate)" :key="idx" class="mr-1"> * </span>
        </div>
      </div>
      <p class="mt-2">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: Number,
      default: 4.75,
    },
    first_name: {
      type: String,
      default: "First Name",
    },
    description: {
      type: String,
      default: "Text Text",
    },
  },
};
</script>
