<template>
  <div class="w-min">
    <label class="relative w-16 h-8 box-content inline-block">
      <input
        v-model="checked"
        type="checkbox"
        class="opacity-0 w-0 h-0"
        @change="onChange"
      />
      <span
        class="slider round absolute pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition duration-300"
      />
    </label>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const checked = ref();
    checked.value = props.value;
    function onChange() {
      emit("onchange", checked.value);
    }

    return { checked, onChange };
  },
};
</script>

<style scoped>
.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #3f51b5;
}

input:focus + .slider {
  box-shadow: 0 0 1px #3f51b5;
}

input:checked + .slider:before {
  -webkit-transform: translateX(32px);
  -ms-transform: translateX(32px);
  transform: translateX(32px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
