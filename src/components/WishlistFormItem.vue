<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-card>
      <v-card-title>
        <v-row no-gutters>
          <v-col cols="auto">{{ formTitle }}</v-col>
          <v-spacer />
          <v-col>
            <v-btn
              text
              small
              color="error"
              class="text-capitalize"
              @click="$emit('cancel')"
            >
              Cancel
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              type="submit"
              text
              small
              color="success"
              class="text-capitalize"
              :disabled="!valid"
            >
              {{ name ? "Save" : "Add" }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-row no-gutters class="pb-2">
          <v-col>
            <v-text-field
              ref="formNameField"
              v-model="form.name"
              label="Item name"
              required
              autofocus
              :rules="nameRules"
              validate-on-blur
            />
          </v-col>
          <v-col>
            <v-text-field
              ref="formCostField"
              v-model="form.cost"
              label="Cost"
              required
              :rules="costRules"
              validate-on-blur
            />
          </v-col>
        </v-row>

        <v-row no-gutters align="center" class="py-2">
          <v-col cols="3"> Priority </v-col>
          <v-col>
            <v-btn-toggle v-model="form.priority" mandatory dense borderless>
              <v-btn
                v-for="option in ['low', 'normal', 'high']"
                :key="option"
                :value="option"
                class="text-capitalize"
              >
                {{ option }}
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
export default {
  props: {
    formTitle: {
      type: String,
      require: true,
    },
    name: {
      type: String,
    },
    cost: {
      type: Number,
    },
    priority: {
      type: String,
    },
  },
  data() {
    return {
      valid: false,
      form: {
        name: "",
        cost: 0,
        priority: "normal",
      },
      nameRules: [
        (v) => !!v || "Please enter valid name",
        (v) => v.length > 1 || "Please enter valid name",
      ],
      costRules: [(v) => !!v || "Please enter valid cost"],
    };
  },
  methods: {
    submit() {
      this.$emit("submited", {
        name: this.form.name,
        cost: Number(this.form.cost),
        priority: this.form.priority,
      });

      this.form.name = "";
      this.form.cost = 0;
      this.$refs.formNameField.focus();
    },
    setValues() {
      this.form.name = this.name ? this.name : "";
      this.form.cost = this.cost ? Number(this.cost) : 0;
      this.form.priority = this.priority ? this.priority : "normal";
    },
  },
  created() {
    this.setValues();
  },
};
</script>

<style></style>
