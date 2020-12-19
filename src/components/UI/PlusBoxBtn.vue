<template>
  <v-btn
    icon
  >
    <v-icon>{{ plusBoxBtn }} </v-icon>
  </v-btn>
</template>

<script>
import { mdiPlusBox } from '@mdi/js';

export default {
  name: 'PlusBoxBtn',
  data() {
    return {
     plusBoxBtn: mdiPlusBox,
    };
  },
};
</script>

<style scoped></style>
