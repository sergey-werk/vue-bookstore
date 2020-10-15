<!-- Try to implement our own Table component
... to never do this again in a life.

Inspired by vue-good-table.
-->
<template>
<table class="table" :class="{'table-sm': compact}">
  <template>
    <thead>
      <th
        scope="col"
        @click="toggleSelectAll"
        >
        <input type="checkbox" :checked="isAllSelected" />
      </th>
      <th v-for="(title, field) in columns" :key="field">
        {{ title }}
      </th>
    </thead>
  </template>
  <template>
  <tbody>
    <!-- Just an illustration of unwanted event bubbling. -->
    <tr v-for="row in sortedRows"
      :key="row[key_field]"
      @click="onCheckboxChanged(row, 'row', $event)"
      :class="{'selected': row.selected}"
      >
      <!-- Illustration of event modifiers chainging.
        NB: order is important!, .self.stop would not work. -->
      <th
        scope="row"
        @click.stop.self="onCheckboxChanged(row, 'th', $event)"
        >
        <input
          type="checkbox"
          :checked="row.selected"
          @change="onCheckboxChanged(row, 'checkbox', $event)"
          />
      </th>
      <td v-for="(title, field) in columns" :key="field">
        {{ row[field] }}
      </td>
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
    columns: {
      type: [Array, Object],
      default() {
        return {
          title: 'Title',
          price: 'Price',
        };
      },
    },
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
    originalRows: {
      handler(newValue, oldValue) {
        if (oldValue.lengh > newValue.length) {
          // TODO: a better solution is to implement filter method inside CrudTable.
          this.unselectAll();
        }
      },
    },
  },
  computed: {
  /*  originalRows -> sortedRows */
    sortedRows() { // TODO: sorging
      return this.originalRows;
    },
    originalRows() {
      // FIXME: How to implement local reactive copy to not to affect vuex store instance?
      // _.deepCopy ?
      return this.rows;
    },
    selectedRows() {
      const selectedRows = [];
      this.sortedRows.forEach((row) => {
        if (row.selected) {
          selectedRows.push(row);
        }
      });
      // Prevent triggering observers when table was sorted
      return selectedRows.sort((r1, r2) => r1[this.key_field] - r2[this.key_field]);
    },
    isAllSelected() {
      return this.originalRows.length
          && this.selectedRows.length === this.originalRows.length;
    },
  },
  methods: {
    onCheckboxChanged(row, where) {
      console.log('called from', where);
      Vue.set(row, 'selected', !row.selected);
    },
    selectAll() {
      this.sortedRows.forEach((row) => {
        Vue.set(row, 'selected', true);
      });
    },
    unselectAll() {
      this.sortedRows.forEach((row) => {
        // eslint-disable-next-line no-param-reassign
        Vue.set(row, 'selected', false);
      });
    },
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.unselectAll();
        return;
      }
      this.selectAll();
    },
  },
};
</script>

<style scoped>
tr th {
  width: 1em;
}
tr:hover {
  background-color: lightgray;
}
tr.selected {
  background-color: lightgray;
}
</style>
