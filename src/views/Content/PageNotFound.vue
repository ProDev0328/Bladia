<template>
  <div class="py-40">Page Not Found</div>
</template>

<script>
import { useMeta } from 'vue-meta';
import { useI18n } from '../../plugins/i18nPlugin';
export default {
  setup() {
    const i18n = useI18n();

    useMeta({
      title: i18n.$t("SEO")["not_found_page"]["title"],
      meta: [
        {
          vmid: "description",
          name: "description",
          content: i18n.$t("SEO")["not_found_page"]["description"],
        },
      ],
    });
  },
};
</script>
