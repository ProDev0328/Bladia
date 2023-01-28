<template>
  <div class="relative overflow-hidden">
    <input
      v-model="phoneNumber"
      type="text"
      :placeholder="placeholder"
      :name="name"
      class="
        text-xs
        font-medium
        w-full
        h-full
        bg-transparent
        focus:outline-none
        number-input
      "
      @change="onChange"
      @keyup="onChange"
    />
    <select
      v-model="prefixCode"
      class="
        text-xs
        font-medium
        absolute
        h-full
        top-0
        left-0
        pl-2
        bg-transparent
        focus:outline-none
        prefix-input
      "
      @change="onChange"
    >
      <option v-for="code in codes" :key="code._id" :value="code.prefix_phone">
        {{ code.name }}&nbsp;
        {{ code.prefix_phone === "" ? "No" : code.prefix_phone }}
      </option>
    </select>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { countries } from "../../store/data/countries";
export default {
  props: {
    modelValue: String,
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const codes = ref(countries);
    const phoneNumber = ref("");
    const prefixCode = ref("");
    prefixCode.value = codes.value.filter((item) => {
      return item.code_iso2 === 'FR';
    })[0].prefix_phone;

    if (props.modelValue) {
      const split = props.modelValue.trim().split(" ");
      prefixCode.value = split[0] ? split[0] : prefixCode.value;
      phoneNumber.value = split[1] ? split[1] : phoneNumber.value;
    }
    function onChange() {
      emit("update:modelValue", prefixCode.value + " " + phoneNumber.value);
    }

    watch(
      () => [props.modelValue],
      () => {
        if (props.modelValue) {
          const split = props.modelValue.trim().split(" ");
          prefixCode.value = split[0] ? split[0] : prefixCode.value;
          phoneNumber.value = split[1] ? split[1] : phoneNumber.value;
        }
      }
    );
    return {
      codes,
      onChange,
      phoneNumber,
      prefixCode,
    };
  },
};
</script>
<style scoped>
.number-input {
  padding-left: 45%;
}
.prefix-input {
  width: 45%;
}
</style>