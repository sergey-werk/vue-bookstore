<template>
  <b-modal v-bind="$attrs" scrollable ok-only centered>
    <slot> Default body </slot>

    <template v-slot:modal-footer="{ cancel }">
      <b-button variant="warning" @click="cancel()">
        Edit
      </b-button>
      <b-button variant="outline-primary" @click="cancel()">
        Close
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  inheritAttrs: true,
};
</script>
