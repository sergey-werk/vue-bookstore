<template>
  <tr>
    <td>{{ item.id }}</td>
    <td>{{ item.title }}</td>
    <td>{{ item.price }}</td>
  </tr>
</template>

<script>
// import { mapMutations, mapGetters } from 'vuex';

export default {
  props: ['item'],
};
</script>
