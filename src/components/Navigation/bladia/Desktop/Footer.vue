<template>
  <footer class="bg-gray-800">
    <div class="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
      <div
        class="
          py-3
          w-full
          flex-col
          sm:flex-row
          flex
          text-gray-300
          font-medium
          text-medium
          justify-center
        "
      >
      <!--
        <app-link
          to="/mycompany"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
          {{ i18n.$t("My agency") }}
        </app-link>
      -->
        <app-link
          :to="'/' + i18n.$t('routes-seo-journeys')"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
          {{ i18n.$t("Journeys") }}
        </app-link>
        <app-link
          :to="'/' + i18n.$t('ports')"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
          {{
            i18n.$t("ports").charAt(0).toUpperCase() + i18n.$t("ports").slice(1)
          }}
        </app-link>
        <app-link
          :to="'/ferry/' + i18n.$t('companies')"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
          {{
            i18n.$t("companies").charAt(0).toUpperCase() +
            i18n.$t("companies").slice(1)
          }}
        </app-link>
        <app-link
          to="/blog"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
          {{ i18n.$t("Blog") }}
        </app-link>
        <app-link
          to="/about"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
          {{ i18n.$t("About") }}
        </app-link>
        <app-link
          to="/condition"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
          {{ i18n.$t("Condition") }}
        </app-link>
        <app-link
          to="/faq"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
          {{ i18n.$t("Faq") }}
        </app-link>
        <app-link
          to="/offers"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
          {{ i18n.$t("Offers") }}
        </app-link>
        <app-link
          to="/help"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
          {{ i18n.$t("Help") }}
        </app-link>
         <app-link
          :to="'/' + i18n.$t('routes-seo-transporter')"
          class="mx-5 my-1 block hover:text-gray-100 duration-700"
        >
          {{
            i18n.$t("Transporters").charAt(0).toUpperCase() +
            i18n.$t("Transporters").slice(1)
          }}
        </app-link>
      </div>
    </div>
    
    <div
      class="
        flex flex-col
        m-auto
        items-center
        py-5
        px-3
        border-t border-gray-500
        text-gray-400 text-sm
        max-w-6xl
      "
    >

      <div class="md:flex-auto md:flex-row-reverse my-2 flex-row flex">  
        Mail : {{ config.email }}  - Phone :  {{ config.phone }}
      </div>

      <div class="md:flex-auto md:flex-row-reverse my-2 flex-row flex">
        <a
          :href="`https://www.facebook.com/${config.facebook_id}/`"
          target="_blank"
          class="w-6 mx-1 text-lg font-bold"
        >
          <icon-facebook />
        </a>
        <a
          :href="`https://www.instagram.com/${config.instagram_id}`"
          target="_blank"
          class="w-6 mx-1"
        >
          <icon-instagram />
        </a>
        <a
          :href="`https://wa.me/${config.whatsapp}/`"
          target="_blank"
          class="w-6 mx-1"
        >
          <icon-whatsapp />
        </a>
      </div>
      <div class="md:flex-auto md:flex-row-reverse my-2 flex-row flex">
        <router-link
          :to="'/' + lang.key"
          v-for="lang of langs"
          :key="lang.key"
          class="mr-2"
        >
          {{ lang.key.toUpperCase() }}
        </router-link>
      </div>
    </div>
    <div class="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
<div class="col col-lg-2 mx-auto">	
                    <img src="https://res.cloudinary.com/beintravel/image/upload/v1570489772/logo/partner/apst.png" width="100px" alt="apst">   
                    
                </div>
                <div class="col col-lg-2 mx-auto">	
                    <img src="https://res.cloudinary.com/beintravel/image/upload/v1570489773/logo/partner/atoutfrance.svg" width="100px" alt="atout france">           
                </div>
                <div class="col col-lg-2 mx-auto">	
                    <img src="https://res.cloudinary.com/beintravel/image/upload/v1570489773/logo/partner/groupama.png" width="200px" alt="groupama">             
                </div>
                <div class="col col-lg-2 mx-auto">	
                    <img src="https://res.cloudinary.com/beintravel/image/upload/v1570488956/logo/partner/mondial-assistance.png" width="200px" alt="mondial-assistance">             
                </div>



    </div>
    <div class="max-w-6xl m-auto text-white flex flex-wrap justify-center">© Bein Travel - bladia.com
      <br>
      <div class="text-sm">
        <br>

        {{ config.agency.legal_info }}  

        <br>
       </div>
    </div>
  </footer>
</template>
<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useI18n } from "../../../../plugins/i18nPlugin";
import { GET_CONFIG, INIT_CONFIG } from "../../../../store/data/types";
import IconFacebook from "../../../Icons/IconFacebook.vue";
import IconInstagram from "../../../Icons/IconInstagram.vue";
import IconWhatsapp from "../../../Icons/IconWhatsapp.vue";
export default {
  components: { IconFacebook, IconInstagram, IconWhatsapp },
  setup() {
    const i18n = useI18n();
    const store = useStore();
    const langs = ref([
      { key: "en", name: "English" },
      { key: "fr", name: "Français" },
    ]);
    store.dispatch(INIT_CONFIG);
    const config = computed(() => store.getters[GET_CONFIG]);
    return { i18n, config, langs };
  },
};
</script>