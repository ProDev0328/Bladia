<template>
  <div class="relative flex items-center justify-center border rounded p-2">
    <div class="w-8 absolute left-4">
      <icon-user />
    </div>
    <div>
      <p class="uppercase">
        {{ gender }}
      </p>
      <p class="text-sm">Passenger 1</p>
    </div>
  </div>
</template>

<script>
import IconUser from "../Icons/IconUser.vue";
export default {
  components: {
    IconUser,
  },
  props: {
    gender: {
      type: String,
      default: "Male",
    },
  },
};
</script>