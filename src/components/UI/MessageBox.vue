<template xmlns:slot="http://www.w3.org/1999/html">
  <v-app class="d-flex">
    <v-alert
        dismissible
        :close-icon="CloseBtn"
        :type="type"
    >
      {{ message }}
    </v-alert>
  </v-app>
</template>

<script>
import CloseBtn from "@/components/UI/CloseBtn";
export default {
  name: "MessageBox",
  props: {
    type: {
      type: String
    },
    message: {
      type: String
    }
  },
  emits: ['close-message']
};
</script>

<style scoped></style>
