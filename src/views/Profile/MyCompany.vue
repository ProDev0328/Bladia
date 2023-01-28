<template>
  <div>
    <p class="font-bold text-3xl py-10">My Agency</p>
    <form class="p-5" @submit.prevent="onSave">
      <div class="w-full mb-6">
        <p class="text-sm font-medium text-dark text-left mb-1.5">Name</p>
        <input
          type="text"
          class="w-full h-12 rounded-md px-4 text-xs font-medium text-dark bg-input focus:outline-none"
          placeholder="Name"
        />
      </div>
      <div class="w-full mb-6">
        <p class="text-sm font-medium text-dark text-left mb-1.5">Category</p>
        <input
          type="text"
          class="w-full h-12 rounded-md px-4 text-xs font-medium text-dark bg-input focus:outline-none"
          placeholder="Category"
        />
      </div>
      <div class="w-full mb-6">
        <p class="text-sm font-medium text-dark text-left mb-1.5">Address</p>
        <input
          type="text"
          class="w-full h-12 rounded-md px-4 text-xs font-medium text-dark bg-input focus:outline-none"
          placeholder="Address"
        />
      </div>
      <div class="w-full mb-6">
        <p class="text-sm font-medium text-dark text-left mb-1.5">Email</p>
        <input
          type="text"
          class="w-full h-12 rounded-md px-4 text-xs font-medium text-dark bg-input focus:outline-none"
          placeholder="Email"
        />
      </div>
      <div class="w-full mb-6">
        <p class="text-sm font-medium text-dark text-left mb-1.5">Telephone</p>
        <input-phone
          type="text"
          placeholder="Phone"
          name="phone"
          class="w-full h-12 rounded-md px-4 text-xs font-medium text-dark bg-input focus:outline-none"
        />
      </div>
      <div class="w-full">
        <button
          class="h-12 w-full text-lg rounded-xl font-medium uppercase shadow text-white duration-300 bg-main hover:bg-opacity-90 mb-5"
        >
          <spinner v-if="isLoading" color="white" />
          <span v-if="!isLoading">Update</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import InputPhone from "../../components/UI/InputPhone";
import Spinner from "../../components/UI/Spinner.vue";
export default {
  components: {
    InputPhone,
    Spinner,
  },
  setup() {
    const isLoading = ref(false);
    async function onSave() {}
    return { isLoading, onSave };
  },
};
</script>