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
              label="Wishlist title"
              required
              autofocus
              :rules="nameRules"
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

        <v-row no-gutters align="center" class="py-2">
          <v-col>set expected complation date?</v-col>
          <v-col cols="2"><v-switch v-model="enableDate" /></v-col>
        </v-row>

        <v-row v-if="enableDate" no-gutters align="center" class="py-2">
          <v-col cols="3">Date</v-col>
          <v-col>
            <v-select
              v-model="form.date.year"
              label="Year"
              :items="years"
              hide-details
              dense
            />
          </v-col>
          <v-col>
            <v-select
              v-model="form.date.month"
              label="Month"
              :items="months"
              hide-details
              dense
            />
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
    priority: {
      type: String,
    },
    due_date: {
      type: String,
    },
  },
  data() {
    return {
      valid: false,
      enableDate: false,
      form: {
        name: "",
        priority: "normal",
        date: {
          year: "",
          month: "",
        },
      },
      nameRules: [
        (v) => !!v || "Please enter valid title",
        (v) => v.length > 2 || "Please enter valid title",
      ],
    };
  },
  computed: {
    years() {
      const years = [];
      for (let i = 2021; i <= 2031; i++) years.push(i.toString());
      return years;
    },
    months() {
      const months = [];
      for (let i = 1; i <= 12; i++) months.push(i.toString());
      return months;
    },
    getSelectedYear() {
      return this.due_date.split("-")[0];
    },
    getSelectedMonth() {
      return this.due_date.split("-")[1];
    },
  },
  methods: {
    submit() {
      this.$emit("submited", {
        name: this.form.name,
        priority: this.form.priority,
        due_date: this.enableDate
          ? `${this.form.date.year}-${this.form.date.month}`
          : "",
      });

      this.form.name = "";
      this.$refs.formNameField.focus();
    },
    setValues() {
      this.form.name = this.name ? this.name : "";
      this.form.priority = this.priority ? this.priority : "normal";
      this.form.date.year = this.due_date
        ? this.getSelectedYear
        : new Date().getFullYear().toString();
      this.form.date.month = this.due_date
        ? this.getSelectedMonth
        : (new Date().getMonth() + 1).toString();

      if (this.due_date) this.enableDate = true;
    },
  },
  created() {
    this.setValues();
  },
};
</script>
