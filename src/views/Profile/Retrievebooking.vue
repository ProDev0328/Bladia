<template>
  <div class="formmybooking">
    <h1>Retrieve your booking</h1>

    <button
      class="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-2 border border-teal-500 hover:border-transparent rounded mt-4"
      @click="onSearchMyBooking"
    >
      Submit
    </button>
  </div>
</template>
<script>
//import { ref, computed } from "vue";
//import { useStore } from "vuex";
import { useRouter } from "vue-router";

//import List from "../components/List.vue";
export default {
  components: {
    // List
  },
  setup() {
    const router = useRouter();

    async function onSearchMyBooking() {
      router.push({ path: `ferry` });
    }

    return {
      onSearchMyBooking,
    };
  },
};
</script>
