<template>
  <ul>
    <li
    v-for="item in items" :key="item.id"
      >
      {{ item.title }} - {{ item.id  }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return { items: {} };
  },
};
</script>
