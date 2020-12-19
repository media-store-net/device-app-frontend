<template>
  <v-btn
    icon
  >
    <v-icon>{{ addCloudBtn }} </v-icon>
  </v-btn>
</template>

<script>
import { mdiCloudDownload } from '@mdi/js';

export default {
  name: 'AddCloudBtn',
  data() {
    return {
     addCloudBtn: mdiCloudDownload,
    };
  },
};
</script>

<style scoped></style>
