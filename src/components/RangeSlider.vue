<template>
<div>
  <slot/>
  <vue-slider
    v-model="inputVal"
    :data="data"
    :marks="marks"
    :enable-cross="false"
    :lazy="true"
    :adsorb="true"
    />
</div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    marks: {
      type: Array,
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  components: {
    VueSlider,
  },
};
</script>
