<template>
  <v-simple-table dense>
    <template #default>
      <thead>
        <tr>
          <th class="pa-0 pl-3">
            <v-fab-transition>
              <v-progress-circular
                v-if="loading"
                indeterminate
                size="10"
                width="1"
              />
            </v-fab-transition>
          </th>
          <th colspan="2" class="pa-0 text-right">
            <app-button
              label="edit"
              v-show="mode == 'view'"
              @click="mode = 'edit'"
            />
            <template v-if="mode == 'edit'">
              <app-button label="cancel" color="error" @click="cancel" />
              <app-button label="done" color="success" @click="done" />
            </template>
          </th>
        </tr>
      </thead>

      <tbody v-if="mode === 'view'">
        <tr v-for="item in localItems" :key="item.id">
          <td>{{ item.name }}</td>
          <td class="text-right">{{ item.amount }} SAR</td>
        </tr>
      </tbody>

      <tfoot v-if="mode === 'view'">
        <tr class="text--secondary font-italic">
          <td class="">Total</td>
          <td class="text-right">{{ total }} SAR</td>
        </tr>
      </tfoot>

      <tbody v-if="mode === 'edit'">
        <tr v-for="item in localItems" :key="item.id">
          <td class="pa-0 px-1">
            <app-button icon="close" @click="deleteItem(item)" />
          </td>
          <td class="pa-0" style="width: 50%">
            <app-text-field
              v-model="item.name"
              placeholder="Name"
              @change="setDirtyItem(item)"
            />
          </td>
          <td class="pa-0">
            <app-text-field
              v-model="item.amount"
              placeholder="Amount"
              suffix="SAR"
              type="number"
              @change="setDirtyItem(item)"
            />
          </td>
        </tr>
      </tbody>

      <tfoot v-if="mode === 'edit'">
        <tr>
          <td class="pa-0 px-1">
            <app-button icon="plus" @click="addItem" />
          </td>
          <td class="pa-0">
            <app-text-field
              v-model="newItem.name"
              ref="newItemNameField"
              placeholder="Name"
              @done="addItem"
            />
          </td>
          <td class="pa-0">
            <app-text-field
              v-model="newItem.amount"
              type="number"
              placeholder="Amount"
              suffix="SAR"
              @done="addItem"
            />
          </td>
        </tr>
      </tfoot>
    </template>
  </v-simple-table>
</template>

<script>
const _ = require("lodash/lang");
const uniqid = require("uniqid");

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      mode: "view",
      loading: false,
      localItems: [],
      itemsToDelete: [],
      newItem: {
        name: "",
        amount: 0,
      },
    };
  },
  created() {
    this.localItems = _.cloneDeep(this.items);
  },
  computed: {
    total() {
      return this.localItems.reduce((prev, cur) => {
        return Number(prev) + Number(cur.amount);
      }, 0);
    },
  },
  methods: {
    setDirtyItem(item) {
      if (item.new == undefined || item.new == false) {
        item.dirty = true;
      }
    },

    addItem() {
      if (this.newItem.name.length >= 2 && this.newItem.amount >= 100) {
        this.localItems.push({
          id: uniqid(),
          name: this.newItem.name,
          amount: this.newItem.amount,
          new: true,
        });

        this.newItem.name = "";
        this.newItem.amount = 0;

        this.$refs.newItemNameField.$children[0].focus();
      }
    },
    deleteItem(item) {
      const itemIndex = this.localItems.findIndex((obj) => obj.id === item.id);

      if (item.new == undefined || item.new == false) {
        this.itemsToDelete.push(this.localItems[itemIndex]);
      }

      this.localItems.splice(itemIndex, 1);
    },
    done() {
      this.loading = true;

      this.$emit("done", {
        itemsToAdded: this.localItems.filter((item) => item.new === true),
        itemsToUpdate: this.localItems.filter((item) => item.dirty === true),
        itemsToDelete: this.itemsToDelete,
      });

      this.$bus.$on("saving-saving_changes_done", () => {
        this.mode = "view";
        this.itemsToDelete = [];
        this.localItems.forEach((item) => {
          if (item.dirty) item.dirty = false;
          if (item.new) item.new = false;
        });
        this.loading = false;
      });
    },
    cancel() {
      this.localItems = _.cloneDeep(this.items);
      this.mode = "view";
    },
  },
};
</script>
