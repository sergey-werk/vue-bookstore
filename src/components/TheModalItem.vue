<template>
  <b-modal v-bind="$attrs" scrollable ok-only centered>
    <slot name="body"> Default body </slot>
  </b-modal>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['item'],
};
</script>
