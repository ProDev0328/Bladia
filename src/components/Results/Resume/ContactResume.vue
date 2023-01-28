<template>
  <div class="shadow-card p-2 rounded-md mb-5">
    <p
      class="font-bold text-xl pb-2 flex justify-left items-center"
      @click="view_contact"
    >
      <icon-right class="ml-2" v-if="!show_contact" />
      <icon-right class="ml-2 down" v-if="show_contact" />
      <span class="ml-2">
        {{ i18n.$t("Contact Information") }}
      </span>
    </p>
    <div id="contact_detail" class="hidden pt-4 py-2 relative overflow-hidden">
      <dotted-line />
      <img
        src="../../../assets/contact.png"
        class="absolute -bottom-10 -right-10 w-40 h-40 opacity-10"
      />
      <p class="p-1 font-semibold text-left">
        {{ i18n.$t("Name") }}: {{ contact.name }}
      </p>
      <p class="p-1 font-semibold text-left">
        {{ i18n.$t("Email") }}: {{ contact.email }}
      </p>
      <p class="p-1 font-semibold text-left">
        {{ i18n.$t("Phone") }}: {{ contact.prefix }} {{ contact.phone }}
      </p>
    </div>
  </div>
</template>

<script>
import DottedLine from "../../UI/DottedLine.vue";
import useI18n from "../../../plugins/useI18n";
import { ref } from "@vue/reactivity";
import IconRight from '../../Icons/IconRight.vue';
export default {
  components: {
    DottedLine,
    IconRight,
  },
  props: {
    contact: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const { i18n } = useI18n();
    var show_contact = ref(false);

    function view_contact() {
      show_contact.value = !show_contact.value;
      if (show_contact.value) {
        document.getElementById("contact_detail").style.display = "block";
      } else {
        document.getElementById("contact_detail").style.display = "none";
      }
    }
    return {
      view_contact,
      i18n,
      show_contact,
    };
  },
};
</script>

<style scoped>
svg.down {
  transform: rotate(90deg);
}
</style>