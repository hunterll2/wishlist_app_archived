<template>
  <v-text-field
    solo
    :flat="shape == 'flat'"
    :dense="shape == 'flat' || dense"
    hide-details
    :class="{ 'rounded-0': shape == 'flat' || tile }"
    :type="type"
    :label="label"
    :placeholder="placeholder"
    :suffix="suffix"
    :value="value"
    @input="$emit('input', $event)"
    @change="$emit('change')"
    @keydown.enter="$emit('done')"
    :step="step"
    :min="nonNegative ? 0 : undefined"
    :disabled="disabled"
  >
    <template v-if="stepper" #append>
      <div class="d-flex flex-column">
        <app-button
          icon="arrow-up-drop-circle-outline"
          size="x-small"
          @click="$emit('increase')"
        />
        <app-button
          icon="arrow-down-drop-circle-outline"
          size="x-small"
          @click="$emit('decrease')"
        />
      </div>
    </template>
    <template #append>
      <slot name="append" />
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    label: String,
    placeholder: [String, Number],
    value: [String, Number],
    suffix: String,
    type: {
      type: String,
      default: "string",
    },
    step: {
      type: [Number, String],
      default: 100,
    },
    stepper: {
      type: Boolean,
      default: false,
    },
    nonNegative: Boolean,
    shape: {
      type: String,
      default: "flat",
      validator: (val) => ["", "flat", "box"].includes(val),
    },
    dense: Boolean,
    tile: Boolean,
    disabled: Boolean,
  },
};
</script>
