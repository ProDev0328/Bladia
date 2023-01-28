<template>
  <div class="flex flex-col relative">
    <div class="w-full flex flex-col bg-white">
      <div
        class="
          w-full
          h-16
          relative
          flex
          justify-center
          items-center
          bg-main
          rounded-b-20px
        "
      >
        <icon-left-new class="absolute left-5" @click="onGoback" />
        <p class="text-lg font-semibold text-white">
          {{ i18n.$t("Animal Details") }}
        </p>
      </div>
    </div>
    <div class="p-5">
      <animal-counter
        v-model="cats"
        animal-type="cats"
        label="Cats"
        :value="cats"
        @onchange="
          (val) => {
            cats = val;
          }
        "
      />
      <animal-counter
        v-model="dogs30"
        animal-type="dogs30"
        label="Dogs > 30kg"
        :value="dogs30"
        @onchange="
          (val) => {
            dogs30 = val;
          }
        "
      />
      <animal-counter
        v-model="dogs"
        animal-type="dogs"
        label="Dogs < 30kg"
        :value="dogs"
        @onchange="
          (val) => {
            dogs = val;
          }
        "
      />
      <div class="spacer" />
      <div class="mt-2">
        <button
          class="
            h-12
            w-full
            text-lg
            rounded-xl
            font-medium
            uppercase
            shadow
            text-white
            duration-300
            bg-main
            hover:bg-opacity-90
          "
          type="button"
          @click="onConfirm"
        >
          {{ i18n.$t("Confirm") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useI18n from "../plugins/useI18n";
import AnimalCounter from "../components/Animals/AnimalCounter.vue";
import { SET_PETS, GET_PETS, SET_INSTALLATION_RETURN, SET_INSTALLATION } from "../store/data/types";
import IconLeftNew from "../components/Icons/IconLeftNew.vue";
export default {
  components: {
    AnimalCounter,
    IconLeftNew,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { i18n } = useI18n();
    let cats = ref(0);
    let dogs = ref(0);
    let dogs30 = ref(0);
    const curPets = computed(() => store.getters[GET_PETS]);

    cats.value = curPets.value.cats;
    dogs.value = curPets.value.dogs;
    dogs30.value = curPets.value.dogs30;

    function onConfirm() {
      store.commit(SET_PETS, {
        cats: cats.value,
        dogs: dogs.value,
        dogs30: dogs30.value,
      });

      store.commit(SET_INSTALLATION, null);
      store.commit(SET_INSTALLATION_RETURN, null);
      
      router.push({ path: `/ferry` });
    }

    function onGoback() {
      router.push({ path: "/" });
    }

    return {
      cats,
      dogs,
      dogs30,
      i18n,
      onConfirm,
      onGoback,
    };
  },
};
</script>