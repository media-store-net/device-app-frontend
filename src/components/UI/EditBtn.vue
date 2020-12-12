<template>
  <v-btn icon color="primary" >
    <v-icon>{{ editBtn }} </v-icon>
  </v-btn>
</template>

<script>
import { mdiPencilOutline } from '@mdi/js';

export default {
  name: 'DeleteBtn',
  data() {
    return {
     editBtn: mdiPencilOutline,
    };
  },
};
</script>

<style scoped></style>
