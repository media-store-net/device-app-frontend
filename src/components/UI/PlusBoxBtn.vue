<template>
  <v-btn
    icon
    :color="color"
    @click="$emit('click')"
  >
    <v-icon :size="size">
      {{ plusBoxBtn }}
    </v-icon>
  </v-btn>
</template>

<script>
import { mdiPlusBox } from '@mdi/js';

export default {
  name: 'PlusBoxBtn',
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
     plusBoxBtn: mdiPlusBox,
    };
  },
};
</script>

<style scoped></style>
