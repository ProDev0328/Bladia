<template>
  <div class="p-5">
    <p class="text-base font-semibold text-left text-dark mb-3">
      {{ i18n.$t("Passenger List") }}
    </p>
    <div v-for="passenger in passengers" :key="passenger.order" class="mt-5">
      <p class="text-sm font-medium text-dark text-left mb-1.5">
        {{ i18n.$t(passenger.type) }}
      </p>
      <adult-detail-card
        :passenger="passenger"
        :completed="isCompleted(passenger)"
        @onedit="onEdit(passenger)"
      />
    </div>
    <div v-if="searched.vehicles && searched.vehicles.length > 0" class="mt-5">
      <p class="text-sm font-medium text-dark text-left mb-1.5">
        {{ i18n.$t("Vehicle") }}
      </p>
      <vehicle-detail-card
        :vehicleId="vehicleId"
        :vehicle="installation.vehicles"
        @on-change="onChangeVehicleId"
      />
    </div>
    <div class="mt-5">
      <button
        type="button"
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
        @click="onValidate"
        :disabled="!isValidateForm"
      >
        {{ i18n.$t("Validate") }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AdultDetailCard from "../../../components/PassengerDetail/AdultDetailCard.vue";
import VehicleDetailCard from "../../../components/PassengerDetail/VehicleDetailCard.vue";
import {
  GET_SEARCHED_RESULT,
  GET_SELECTED_PASSENGERS,
  SET_VEHICLE_IDENTIFICATION,
  GET_INSTALLATION,
  GET_SELECTED_VEHICLE,
} from "../../../store/data/types";
import useI18n from "../../../plugins/useI18n";
export default {
  components: {
    AdultDetailCard,
    VehicleDetailCard,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const searched = computed(() => store.getters[GET_SEARCHED_RESULT]);
    const { i18n } = useI18n();
    const passengers = computed(() => store.getters[GET_SELECTED_PASSENGERS]);
    const installation = computed(() => store.getters[GET_INSTALLATION]);
    const vehicleId = ref("");

    const vehicle = store.getters[GET_SELECTED_VEHICLE];
    if (vehicle.length != 0 && vehicle[0].identification) {
      vehicleId.value = vehicle[0].identification;
    }

    function onEdit(passenger) {
      router.push({
        name: `passengerdetail-edit`,
        query: {
          order: passenger.order,
        },
      });
      if (vehicleId.value !== "") {
        store.commit(SET_VEHICLE_IDENTIFICATION, vehicleId.value);
      }
    }

    function onChangeVehicleId(val) {
      vehicleId.value = val;
    }

    function onValidate() {
      if (vehicleId.value !== "") {
        store.commit(SET_VEHICLE_IDENTIFICATION, vehicleId.value);
      }

      router.push({ path: `/result/resume` });
    }

    function isCompleted(passenger) {
      const first_name = passenger.first_name;
      const last_name = passenger.last_name;
      const birth_date = passenger.birth_date;
      const nationality = passenger.nationality;
      const doc_number = passenger.doc_number;

      return (
        first_name !== "" &&
        last_name !== "" &&
        nationality !== "" &&
        birth_date !== "" &&
        doc_number !== ""
      );
    }

    const isValidateForm = computed(() => {
      if (vehicle.length != 0 && vehicleId.value == "") {
        return false;
      }
      for (const passenger of passengers.value) {
        if (!isCompleted(passenger)) {
          return false;
        }
      }

      return true;
    });
    return {
      installation,
      passengers,
      vehicleId,
      isCompleted,
      onEdit,
      onChangeVehicleId,
      isValidateForm,
      onValidate,
      searched,
      i18n,
    };
  },
};
</script>