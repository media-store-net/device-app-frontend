<template>
  <v-btn
    icon
  >
    <v-icon>{{ addHarddiskBtn }} </v-icon>
  </v-btn>
</template>

<script>
import { mdiHarddiskPlus } from '@mdi/js';

export default {
  name: 'AddHarddiskBtn',
  data() {
    return {
     addHarddiskBtn: mdiHarddiskPlus,
    };
  },
};
</script>

<style scoped></style>
