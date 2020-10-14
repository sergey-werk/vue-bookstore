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
    <tr v-for="(row, index) in sortedRows"
      :key="row[key_field]"
      @dblclick="onRowDoubleClicked(row, index, $event)"
      >
      <th
        scope="row"
        @clicked="onCheckboxClicked"
        >
        <input
          type="checkbox"
          :checked="row.selected"
          />
      </th>
      <td>{{ row.title }}</td>
    </tr>
  </tbody>
  </template>
</table>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'crud-table',
  props: {
    columns: {},
    rows: {
      type: Array,
      required: true,
    },
    key_field: {
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
  data() {
    return {
      sortBy: null,
    };
  },
  watch: {

  },
  computed: {
  //  originalRows -> sortedRows
    sortedRows() {
      return this.rows;
    },
    originalRows() {
      return this.rows;
    },
  },
  methods: {
    toggleSelectAll() {
      return 0;
    },
    onCheckboxClicked(row) {
      console.log('onCheckboxClicked', row);
      Vue.set(row, 'selected', !row.selected);
    },
    onRowDoubleClicked(row) {
      console.log('onRowDoubleClicked', row);
      Vue.set(row, 'selected', !row.selected);
    },
  },
};
</script>
