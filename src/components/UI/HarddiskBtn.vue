<template>
  <v-btn
    icon
    :color="color"
    @click="$emit('click')"
  >
    <v-icon :size="size">
      {{ addHarddiskBtn }}
    </v-icon>
  </v-btn>
</template>

<script>
import {mdiHarddiskPlus} from '@mdi/js';

export default {
  name: 'AddHarddiskBtn',
  props: {
    size: {
      type: String
    },
    color: {
      type: String
    }
  },
  emits: ['click'],
  data() {
    return {
      addHarddiskBtn: mdiHarddiskPlus,
    };
  },
};
</script>

<style scoped></style>
