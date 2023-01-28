
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "../plugins/i18nPlugin";
import { GET_LANGUAGE } from "../store/data/types";


export default function () {
  const i18n = useI18n();
  const store = useStore();
  const lang = computed(() => store.getters[GET_LANGUAGE]);

  i18n.locale.value = lang.value;

  return {
    i18n,
  };
}