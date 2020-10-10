<template>
  <tr class="item-row">
    <td>{{ item.id }}</td>
    <td>
      <router-link
        :to="{ name: 'Book', params: { id: item.id }}"
        class="item-title"
        >
        {{ item.title }}
      </router-link>
    </td>
    <td>{{ item.price }}</td>
  </tr>
</template>

<script>
// import { mapMutations, mapGetters } from 'vuex';

export default {
  props: ['item'],
};
</script>

<style scoped>
.item-title {
  color: black;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.item-title:hover {
  text-decoration: underline;
}
.item-row:hover {
  background-color: lightgrey;
}
</style>
