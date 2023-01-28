<template>
  <div ref="container" class="relative">
    <div
      v-if="width.window > _options.navigation.start"
      class="flex items-center justify-between absolute w-full h-full"
    >
      <div
        v-if="_hasPrev"
        class="w-10 h-10 flex items-center justify-center rounded-20px bg-white shadow-card z-10 cursor-pointer absolute -left-5"
        @click="prev"
      >
        <svg
          :fill="_options.navigation.color"
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
        >
          <path
            d="M10.757 12l4.95 4.95a1 1 0 1 1-1.414 1.414l-5.657-5.657a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 0 1 1.414 1.414L10.757 12z"
          />
        </svg>
      </div>

      <div
        v-if="_hasNext"
        class="w-10 h-10 flex items-center justify-center rounded-20px bg-white shadow-card z-10 cursor-pointer absolute -right-5"
        @click="next"
      >
        <svg
          :fill="_options.navigation.color"
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
        >
          <path
            d="M13.314 12.071l-4.95-4.95a1 1 0 0 1 1.414-1.414l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95z"
          />
        </svg>
      </div>
    </div>

    <div class="overflow-hidden h-full -mb-5" :style="_style.container">
      <div
        ref="list"
        class="flex overflow-hidden"
        :class="_options.list.class"
        :style="_style.list"
      >
        <div
          v-for="item in items"
          :key="item"
          ref="item"
          class="min-w-full"
          :class="_options.item.class"
          :style="_style.item"
        >
          <slot :item="item">
            {{ item }}
          </slot>
        </div>
        <div :style="_style.tail" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorizontalList",
  props: {
    items: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      position: 0,
      width: {
        container: 0,
        window: 576,
      },
    };
  },
  computed: {
    _options() {
      const options = this.options;
      return {
        navigation: {
          start: options?.navigation?.start ?? 992,
          color: options?.navigation?.color ?? "#000",
        },
        item: {
          class: options?.item?.class ?? "",
          padding: options?.item?.padding ?? 16,
        },
        list: {
          class: options?.list?.class ?? "",
          windowed: options?.list?.windowed ?? 1200,
          padding: options?.list?.padding ?? 20,
        },
        responsive: [
          ...(options?.responsive ?? []),
          // Fallback default responsive
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 2 },
          { start: 768, end: 992, size: 3 },
          { start: 992, end: 1200, size: 4 },
          { start: 1200, size: 5 },
        ],
      };
    },

    _style() {
      const style = {
        container: {},
        list: {},
        item: {},
        tail: {},
      };

      const workingWidth = this._workingWidth;
      const size = this._size;

      // Full Screen Mode
      if (this.width.window < this._options.list.windowed) {
        style.container.marginLeft = `-${this._options.list.padding}px`;
        style.container.marginRight = `-${this._options.list.padding}px`;

        style.item.width = `${
          (workingWidth - (size - 1) * this._options.item.padding) / size
        }px`;
        style.item.paddingLeft = `${this._options.list.padding}px`;
        style.item.paddingRight = `${this._options.item.padding}px`;
        style.item.marginRight = `-${this._options.list.padding}px`;
      }

      // Windowed Mode
      else {
        style.item.paddingLeft = `${this._options.item.padding / 2}px`;
        style.item.paddingRight = `${this._options.item.padding / 2}px`;

        style.container.marginLeft = `-${this._options.item.padding / 2}px`;
        style.container.marginRight = `-${this._options.item.padding / 2}px`;

        style.item.width = `${
          (workingWidth - (size - 1) * this._options.item.padding) / size
        }px`;
      }

      return style;
    },

    _itemWidth() {
      return (
        (this._workingWidth - (this._size - 1) * this._options.item.padding) /
        this._size
      );
    },

    _workingWidth() {
      // Full Screen Mode
      if (this.width.window < this._options.list.windowed) {
        return this.width.window - this._options.list.padding * 2;
      }

      // Windowed Mode
      else {
        return this.width.container;
      }
    },

    _size() {
      const width = this._workingWidth;
      return this._options.responsive.find((value) => {
        return (
          (!value.start || value.start <= width) &&
          (!value.end || value.end >= width)
        );
      }).size;
    },

    _hasNext() {
      return this.items.length > this.position + this._size;
    },

    _hasPrev() {
      return this.position > 0;
    },
  },
  mounted() {
    this.$resize = () => {
      this.width.window = window.innerWidth;
      this.width.container = this.$refs.container.clientWidth;
    };
    this.$resize();
    window.addEventListener("resize", this.$resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$resize);
  },
  methods: {
    go(position) {
      const maxPosition = this.items.length - this._size;
      this.position = position > maxPosition ? maxPosition : position;

      const left =
        this._itemWidth * this.position +
        this.position * this._options.item.padding;
      this.$refs.list.scrollTo({ top: 0, left: left, behavior: "smooth" });
    },

    prev() {
      this.go(this.position - this._size);
    },

    next() {
      this.go(this.position + this._size);
    },
  },
};
</script>