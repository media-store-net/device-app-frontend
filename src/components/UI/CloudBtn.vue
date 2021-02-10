<template>
  <v-btn
    icon
    :color="color"
    @click="$emit('click')"
  >
    <v-icon :size="size">
      {{ addCloudBtn }}
    </v-icon>
  </v-btn>
</template>

<script>
import {mdiCloudDownload} from '@mdi/js';

export default {
  name: 'AddCloudBtn',
  props: {
    size: {
      type: String
    },
    color: {
      type: String
    }
  },
  data() {
    return {
      addCloudBtn: mdiCloudDownload,
    };
  },
};
</script>

<style scoped></style>
