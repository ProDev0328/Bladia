<template>
  <div class="p-5">
    <div
      class="flex flex-col mb-2"
      v-if="
        (installation && installation.meals && installation.meals.length > 0) ||
        (installationReturn &&
          installationReturn.meals &&
          installationReturn.meals.length > 0)
      "
    >
      <div class="flex justify-between align-center">
        <p class="font-semibold text-base text-left mb-3">
          {{ i18n.$t("Repas") }}
        </p>

        <!-- <dotted-line /> -->
        <span class="text-sm text-disable font-medium mr-3">
          {{ i18n.$t("Total meals price") }}
          <span class="font-bold text-dark">{{ mealsPrice }}€</span>
        </span>
      </div>
      <div>
        <p
          v-if="
            isReturn() && installation.meals && installation.meals.length > 0
          "
          class="font-semibold text-sm text-left mb-2"
        >
          {{ i18n.$t("Outward") }}:
        </p>
        <meal-card
          v-for="meal in installation.meals"
          :key="meal.code"
          :name="meal.name"
          :init="meal.quantity"
          :cardValue="meal.card_value"
          :unit-price="meal.price"
          class="mb-3"
          @onchange="
            (val) => {
              meal.quantity = val;
            }
          "
        />
        <p
          v-if="
            isReturn() &&
            installationReturn.meals &&
            installationReturn.meals.length > 0
          "
          class="font-semibold text-sm text-left mb-2"
        >
          Return:
        </p>
        <div v-if="isReturn()">
          <meal-card
            v-for="rmeal in installationReturn.meals"
            :key="rmeal.code"
            :name="rmeal.name"
            :init="rmeal.quantity"
            :cardValue="rmeal.card_value"
            :unit-price="rmeal.price"
            class="mb-3"
            @onchange="
              (val) => {
                rmeal.quantity = val;
              }
            "
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col mb-5">
      <div>
        <div class="w-full shadow-card rounded-md p-5 pb-2 mb-2.5">
          <div class="text-sm font-semibold flex justify-between align-center">
            <span>{{ i18n.$t("Insurance for all") }}</span>
            <span
              v-if="insurrance.active"
              class="text-sm text-disable font-medium mr-3"
            >
              {{ i18n.$t("Total insurance") + ": " }}
              <span class="font-bold text-dark"
                >{{ insuranceAmount() + "€" }}
              </span>
            </span>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-left">
              <img src="../../assets/assistance.png" />
              <span class="pl-2 text-sm font-semibold">
                <!-- {{ insurrance.amount
                }}{{ insurrance.type == "percent" ? "%" : "€" }} -->
                {{ insuranceAmount() + " €" }}
              </span>
            </div>
            <yes-no-button
              :init="insurrance.active"
              @onchange="
                (val) => {
                  insurrance.active = val;
                  updateServices();
                }
              "
            />
          </div>
        </div>

        <div class="w-full shadow-card rounded-md p-5 pb-4 mb-2.5">
          <div
            class="flex justify-between items-center text-sm font-semibold mb-4"
          >
            <span>{{ i18n.$t("Receive your tickets at home") }}</span>
            <span>{{ i18n.$t("Free") }}</span>
          </div>
          <div class="flex justify-between items-center">
            <img src="../../assets/email.png" />
            <yes-no-button
              :init="true"
              @onchange="(val) => (emailActive = val)"
            />
          </div>
        </div>

        <div class="w-full shadow-card rounded-md p-5 pb-4 mb-2.5">
          <div class="flex text-sm font-semibold mb-2">
            {{ i18n.$t("Do you have holiday vouchers") }}?
          </div>
          <div class="flex justify-between items-center">
            <img src="../../assets/ancv.png" />
            <yes-no-button
              :init="ancv.active"
              @onchange="(val) => (ancv.active = val)"
            />
          </div>
          <div v-if="ancv.active">
            <dotted-line />
            <div class="flex justify-center items-center mt-2">
              <p class="text-sm uppercase font-medium mr-3 text-disable">
                {{ i18n.$t("Enter The Amount") }}
              </p>
              <input
                v-model="ancv.amount"
                type="text"
                class="
                  w-16
                  h-7
                  px-0.5
                  box-content
                  rounded
                  border border-disable
                  text-base
                  font-bold
                  text-center
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative shadow-card flex flex-col rounded-md p-5 mb-5">
      <p class="text-sm font-semibold text-dark text-left mb-2">
        {{ i18n.$t("Enter your promo code") }}:&nbsp;
      </p>
      <icon-cancel
        v-if="promoSuccessRes"
        class="absolute top-3 right-3"
        @click="handleRemovePromoCode()"
      />
      <div v-if="!promoSuccessRes" class="h-7 flex items-center">
        <input
          v-model="promo.code"
          type="text"
          class="
            w-32
            h-full
            rounded
            border border-disable
            text-sm
            font-medium
            text-center
            mr-3
          "
        />
        <button
          type="submit"
          class="h-full text-sm bg-main text-white font-medium px-5 rounded"
          @click="submitPromo()"
          :disabled="isSubmittedPromoCode"
        >
          {{ i18n.$t("Submit") }}
        </button>
      </div>
      <span v-else class="text-left text-sm font-medium text-green-500">
        A reduction of {{ promoPrice }} Euros is applied to total price.
      </span>
      <span
        v-if="promoErrorRes"
        class="text-left text-sm font-medium text-red-500"
      >
        {{ i18n.$t("Invalid Promo Code") }}
      </span>
    </div>

    <div class="flex flex-col mb-3">
      <div class="w-full mb-6">
        <p class="text-sm font-medium text-dark text-left mb-1.5">
          {{ i18n.$t("Name") }}:&nbsp;
        </p>
        <input
          v-model="name"
          type="text"
          class="
            w-full
            h-12
            rounded-md
            px-4
            text-xs
            font-medium
            text-dark
            bg-input
            focus:outline-none
          "
          :placeholder="i18n.$t('Name')"
        />
      </div>
      <div class="w-full mb-6">
        <p class="text-sm font-medium text-dark text-left mb-1.5">
          {{ i18n.$t("Email") }}:&nbsp;
        </p>
        <input
          v-model="email"
          type="text"
          class="
            w-full
            h-12
            rounded-md
            px-4
            text-xs
            font-medium
            text-dark
            bg-input
            focus:outline-none
          "
          :placeholder="i18n.$t('Email')"
        />
      </div>
      <div class="w-full mb-6">
        <p class="text-sm font-medium text-dark text-left mb-1.5">
          {{ i18n.$t("Phone") }}:&nbsp;
        </p>
        <input-phone
          v-model="phone"
          type="text"
          :placeholder="i18n.$t('Phone')"
          class="
            w-full
            h-12
            rounded-md
            px-4
            text-xs
            font-medium
            text-dark
            bg-input
            focus:outline-none
          "
        />
      </div>
    </div>
    <div class="mt-3">
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
        :disabled="!canConfirm"
      >
        {{ i18n.$t("Confirm") }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import MealCard from "../../components/Results/MealCard.vue";
import YesNoButton from "../../components/Results/YesNoButton.vue";
import DottedLine from "../../components/UI/DottedLine.vue";
import InputPhone from "../../components/UI/InputPhone.vue";
import {
  SET_SERVICES,
  GET_SERVICES,
  SET_CONTACT_INFO,
  GET_CONTACT_INFO,
  GET_INSTALLATION,
  SET_INSTALLATION,
  SET_RESULT_TOTAL_COST,
  GET_RESULT_TOTAL_COST,
  GET_INSTALLATION_RETURN,
  GET_JOURNEY_DIRECTION,
  SET_INSTALLATION_RETURN,
} from "../../store/data/types";
import { DIRECTION_RETURN } from "../../store/data/types";
import axios from "../../axiosBooking";
import useI18n from "../../plugins/useI18n";
import IconCancel from "../../components/Icons/IconCancel.vue";
export default {
  components: {
    DottedLine,
    InputPhone,
    YesNoButton,
    MealCard,
    IconCancel,
  },
  setup() {
    const name = ref("");
    const email = ref("");
    const phone = ref("");
    const installationReturn = computed(
      () => store.getters[GET_INSTALLATION_RETURN]
    );
    const { i18n } = useI18n();
    const router = useRouter();
    const store = useStore();
    const promoSuccessRes = ref(false);
    const promoErrorRes = ref(false);
    const installation = computed(() => store.getters[GET_INSTALLATION]);
    const totalAmount = computed(() => store.getters[GET_RESULT_TOTAL_COST]);

    const config = JSON.parse(localStorage.getItem("config"));
    let insurrance = reactive({ active: false, amount: 0, type: "fixed" });
    if (config.insurance) {
      insurrance.amount = config.insurance.amount;
      insurrance.type = config.insurance.type;
    }

    const emailActive = ref(true);
    let ancv = reactive({ active: false, amount: 0 });
    let promo = reactive({ active: false, name: "", code: "", value: 0 });
    const journeyDrt = computed(() => store.getters[GET_JOURNEY_DIRECTION]);
    const contact = computed(() => store.getters[GET_CONTACT_INFO]);
    const services = computed(() => store.getters[GET_SERVICES]);
    const isSubmittedPromoCode = ref(false);
    const promoPrice = ref(0);

    name.value = contact.value.name;
    email.value = contact.value.email;
    if (contact.value.prefix && contact.value.phone) {
      phone.value = contact.value.prefix + " " + contact.value.phone;
    }

    insurrance = services.value.insurrance
      ? services.value.insurrance
      : insurrance;
    emailActive.value = services.value.ticket_by_mail
      ? services.value.ticket_by_mail
      : emailActive.value;
    ancv = services.value.ancv ? services.value.ancv : ancv;
    promo = services.value.promo ? services.value.promo : promo;

    function isReturn() {
      return journeyDrt.value === DIRECTION_RETURN && installationReturn.value;
    }

    async function submitPromo() {
      isSubmittedPromoCode.value = true;
      const data = {
        code: promo.code,
        price: 41,
        domain: "5af1ac3afd89785d1f3fcb62",
      };
      const res = await axios.post(`/utils/promo`, data);
      const response = res.data.data.items[0];

      if (response.valid === true) {
        promo.value = response.value;
        promo.name = response.id;
        promo.active = true;

        promoSuccessRes.value = true;
        promoErrorRes.value = false;
      } else {
        promo.value = 0;
        promo.name = "";
        promo.active = false;

        promoErrorRes.value = true;
        promoSuccessRes.value = false;
      }
      isSubmittedPromoCode.value = false;
    }

    function insuranceAmount() {
      let totalPrice = parseFloat(installation.value.tariffs.price);
      for (const meal of installation.value.meals) {
        totalPrice += meal.price * meal.quantity;
      }
      if (isReturn()) {
        for (const rmeal of installationReturn.value.meals) {
          totalPrice += rmeal.price * rmeal.quantity;
        }
      }

      if (isReturn()) {
        totalPrice += installationReturn.value.tariffs.price;
        /* if (promo.active) {
          totalPrice -= promo.value;
        } */
      }
      if (insurrance.type == "fixed") {
        return insurrance.amount;
      } else {
        const ins = (totalPrice * insurrance.amount) / 100;
        return Math.round(ins * 100) / 100;
      }
    }
    const mealsPrice = computed(() => {
      let mealsPrice = 0;
      for (const meal of installation.value.meals) {
        mealsPrice += meal.price * meal.quantity;
      }
      if (isReturn()) {
        for (const rmeal of installationReturn.value.meals) {
          mealsPrice += rmeal.price * rmeal.quantity;
        }
      }
      return Math.round(mealsPrice * 100) / 100;
    });

    function mealCard() {
      router.push({ path: `/result/meal` });
    }

    async function handleRemovePromoCode() {
      promoSuccessRes.value = false;
      promo.code = "";
      promo.name = "";
      promo.value = 0;
      promo.active = false;
      let updatedPrice = totalAmount.value + promoPrice.value;
      await store.commit(SET_RESULT_TOTAL_COST, updatedPrice);
    }

    const canConfirm = computed(() => {
      if (name.value == null || name.value == "") {
        return false;
      }
      if (email.value == null || email.value == "") {
        return false;
      }
      if (
        phone.value == null ||
        phone.value.trim == "" ||
        !phone.value.split(" ")[1]
      ) {
        return false;
      }
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email.value).toLowerCase())) {
        return false;
      }
      return true;
    });

    async function updateServices() {
      if (!ancv.active) {
        ancv.amount = 0;
      }
      const meals = { outward: installation.value.meals };
      if (isReturn()) {
        meals["return"] = installationReturn.value.meals;
      }
      const services = {
        insurrance,
        ticket_by_mail: emailActive.value,
        ancv,
        promo,
        meal: meals,
      };
      await store.commit(SET_SERVICES, services);
    }

    async function onConfirm() {
      await updateServices();
      await store.commit(SET_INSTALLATION, installation.value);
      await store.commit(SET_INSTALLATION_RETURN, installationReturn.value);
      await store.commit(SET_CONTACT_INFO, {
        name: name.value,
        email: email.value,
        prefix: phone?.value?.split(" ")[0],
        phone: phone?.value?.split(" ")[1],
      });
      router.push({ path: `/passengerdetail` });
    }

    return {
      canConfirm,
      ancv,
      email,
      emailActive,
      i18n,
      installation,
      installationReturn,
      handleRemovePromoCode,
      insurrance,
      isReturn,
      isSubmittedPromoCode,
      mealCard,
      name,
      onConfirm,
      phone,
      promoErrorRes,
      promoPrice,
      promoSuccessRes,
      promo,
      submitPromo,
      totalAmount,
      insuranceAmount,
      mealsPrice,
      updateServices,
    };
  },
};
</script>