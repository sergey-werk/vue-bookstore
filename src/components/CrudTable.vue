<!-- Try to implement our own Table component
... to never do this again in a life.

Inspired by vue-good-table.
-->
<template>
<table class="table" :class="{'table-sm': compact}">
  <template>
    <thead
      @on-toggle-select-all="toggleSelectAll"
      >
    </thead>
  </template>
  <template>
  <tbody>
    <tr v-for="row in sortedRows" :key="row[key]" >
      <th scope="row">
        <input
          type="checkbox"
          slot="selected"
          slot-scope="props"
          :value="props.selected"
          v-model="checkedRows"
          />
      </th>
      <td>{{ row.title }}</td>
    </tr>
  </tbody>
  </template>
</table>
</template>

<script>

export default {
  name: 'crud-table',
  props: {
    columns: {},
    rows: {
      type: Array,
      required: true,
    },
    kf: {
      type: String,
      required: true,
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    sortable: {
      type: Boolean,
      default: true,
    },
    compact: Boolean,
  },
  data: () => ({
    sortBy: null,
    filteredRows: [],
  }),

  computed: {
  //  rows -> filteredRows -> sortedRows
    sortedRows() {
      return this.rows;
    },
  },
  methods: {
    toggleSelectAll() {
      return 0;
    },
  },
};
</script>
