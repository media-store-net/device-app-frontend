<template>
  <v-flex class="d-flex justify-end">
    <v-btn
      icon
      right
      color="accent"
      @click="onClose"
    >
      <v-icon>{{ closeBtn }}</v-icon>
    </v-btn>
  </v-flex>
</template>

<script>
import { mdiCloseBox } from '@mdi/js';

export default {
  emits: ['close-click'],
  data() {
    return {
      closeBtn: mdiCloseBox,
    };
  },
  methods: {
    onClose() {
      this.$emit('close-click');
    },
  },
};
</script>

<style></style>
