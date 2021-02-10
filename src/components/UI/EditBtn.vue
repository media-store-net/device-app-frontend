<template>
  <v-btn
    icon
    color="primary"
    @click="$emit('click')"
  >
    <v-icon>{{ editBtn }} </v-icon>
  </v-btn>
</template>

<script>
import { mdiPencilOutline } from '@mdi/js';

export default {
  name: 'EditBtn',
  data() {
    return {
     editBtn: mdiPencilOutline,
    };
  },
};
</script>

<style scoped></style>
