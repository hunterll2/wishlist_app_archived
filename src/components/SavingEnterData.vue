<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h5">Set Your Incomes</div>
        <br />
        <p class="text-body-2">
          <b>Incomes</b> are a fixed amount of money that you receive each
          month.
        </p>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col class="text-h6"> Incomes </v-col>
    </v-row>

    <saving-item-form />

    <v-row align="center" justify="center">
      <v-col cols="1">
        <v-btn icon x-small>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text class="text--primary">
            <v-row>
              <v-col class="text-capitalize font-weight-medium" cols="auto">
                Salary
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="text-right">$4,500</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col>
        <v-divider></v-divider>
      </v-col>
    </v-row> -->

    <v-row>
      <v-col>
        <v-btn block tile large color="success" @click="$emit('next')">
          I'm done, Next!
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
