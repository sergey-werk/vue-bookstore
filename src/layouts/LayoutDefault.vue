<template>
  <div>
    <h1>{{ header }}</h1>

    <div class="d-flex mb-3">
      <slot name="controls" />
    </div>

    <div class="d-flex text-center justify-content-center mb-3" v-if="loading">
      <b-spinner label="Loading..."></b-spinner>
    </div>

    <TheModalItem id="modal-popup" size="lg">
      <slot name="modal" />
    </TheModalItem>

    <slot />

</template>

<script>
export default {
  name: 'LayoutDefault',
  props: {
    header: String,
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
