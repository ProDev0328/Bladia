<template>
  <div class="bg-gray-50 container mx-auto pt-8 pb-4 text-black">
    <div
      class="
        flex flex-wrap
        overflow-hidden
        sm:-mx-1
        md:-mx-px
        lg:-mx-2
        xl:-mx-2
      "
    >
      <div
        class="
          w-full
          overflow-hidden
          sm:my-1 sm:px-1 sm:w-1/2
          md:my-px md:px-px md:w-1/2
          lg:my-2 lg:px-2 lg:w-1/4
          xl:my-2 xl:px-2 xl:w-1/4
          pb-6
        "
      >
        <b>Bienvenue sur viaferries</b>
        <br /><br />
        Nous vous proposons les meilleures options de ferries <br />
        et vous accompagnons à chaque étape de vos voyages.<br />
        Notre mission : vous aidez à Réserver vos billets de ferry au meilleur
        <br />
        prix sans frais supplémentaires<br />
      </div>
      <div
        class="
          w-full
          overflow-hidden
          sm:my-1 sm:px-1 sm:w-1/2
          md:my-px md:px-px md:w-1/2
          lg:my-2 lg:px-2 lg:w-1/4
          xl:my-2 xl:px-2 xl:w-1/4
          pb-6
        "
      >
        <h4 class="text-black">Voyager</h4>
        <ul class="nav navbar-nav">
          <app-link
            to="/settings"
            class="mx-5 my-1 block hover:text-gray-100 duration-700"
          >
            Setting
          </app-link>
          <app-link
            to="/about"
            class="mx-5 my-1 block hover:text-gray-100 duration-700"
          >
            About
          </app-link>
          <app-link
            to="/offers"
            class="mx-5 my-1 block hover:text-gray-100 duration-700"
          >
            Offers
          </app-link>
          <app-link
            to="/help"
            class="mx-5 my-1 block hover:text-gray-100 duration-700"
          >
            Help
          </app-link>
          <app-link
            to="/"
            class="mx-5 my-1 block hover:text-gray-100 duration-700"
          >
            Contact
          </app-link>
        </ul>
      </div>

      <div
        class="
          w-full
          overflow-hidden
          sm:my-1 sm:px-1 sm:w-1/2
          md:my-px md:px-px md:w-1/2
          lg:my-2 lg:px-2 lg:w-1/4
          xl:my-2 xl:px-2 xl:w-1/4
          pb-6
        "
      >
        <h4 class="">Explorer</h4>
        <ul class="">
          <app-link
            to="/offers"
            class="mx-5 my-1 block hover:text-gray-100 duration-700"
          >
            Journies
          </app-link>
          <app-link
            to="/help"
            class="mx-5 my-1 block hover:text-gray-100 duration-700"
          >
            Companies
          </app-link>
        </ul>
      </div>
      <div
        class="
          w-full
          overflow-hidden
          sm:my-1 sm:px-1 sm:w-1/2
          md:my-px md:px-px md:w-1/2
          lg:my-2 lg:px-2 lg:w-1/4
          xl:my-2 xl:px-2 xl:w-1/4
          pb-6
        "
      >
        <h4 class="">Help</h4>
        <ul class="">
          <app-link
            to="/help"
            class="mx-5 my-1 block hover:text-gray-100 duration-700"
          >
            Help
          </app-link>
          <app-link
            to="/help"
            class="mx-5 my-1 block hover:text-gray-100 duration-700"
          >
            Help
          </app-link>
        </ul>
      </div>
    </div>
    <div class="md:flex-auto md:flex-row-reverse my-2 flex-row flex justify-center">
      <router-link
        :to="'/' + lang.key"
        v-for="lang of langs"
        :key="lang.key"
        class="mr-2"
      >
        {{ lang.key.toUpperCase() }}
      </router-link>
    </div>
    <div
      class="pt-4 md:flex md:items-center md:justify-center"
      style="border-top: 1px solid white"
    >
      <ul class="">
        <li class="md:mx-2 md:inline text-sm">
          <a href="/disclaimer">Disclaimer</a>
        </li>
        <li class="md:mx-2 md:inline text-sm">
          <a href="/cookie">Cookie policy</a>
        </li>
        <li class="md:mx-2 md:inline text-sm">
          <a href="/privacy">Privacy</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { computed, ref } from "@vue/runtime-core";
import { useI18n } from "../../../../plugins/i18nPlugin";
export default {
  setup() {
    const i18n = useI18n();
    const langs = ref([
      { key: "en", name: "English" },
      { key: "fr", name: "Français" },
    ]);
    return { i18n, langs };
  },
};
</script>