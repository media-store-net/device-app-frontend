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
  emits: ['click'],
  data() {
    return {
      closeBtn: mdiCloseBox,
    };
  },
  methods: {
    onClose() {
      this.$emit('click');
    },
  },
};
</script>

<style></style>
