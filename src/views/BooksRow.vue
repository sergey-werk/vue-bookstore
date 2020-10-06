<template>
  <tr class="item-row">
    <td>{{ item.id }}</td>
    <td>
      <a href="#" @click.prevent="add($event)" class="item-title" v-b-modal.item-card-modal>
        {{ item.title }}
      </a>
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
