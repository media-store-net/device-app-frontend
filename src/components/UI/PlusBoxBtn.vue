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
      type: String,
      default: '2em'
    },
    color: {
      type: String,
      default: 'primary'
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
