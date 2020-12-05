<template>
  <v-btn
    icon
    color="red"
    @click="clickDelete"
  >
    <v-icon>{{ deleteBtn }} </v-icon>
  </v-btn>
</template>

<script>
import { mdiDelete } from "@mdi/js";

export default {
  name: "DeleteBtn",
  data() {
    return {
      deleteBtn: mdiDelete
    };
  },
  methods: {
    clickDelete() {
      this.$emit("deleteClick", "Delete element");
    }
  }
};
</script>

<style scoped></style>
