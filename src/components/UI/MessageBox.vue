<template xmlns:slot="http://www.w3.org/1999/html">
  <v-alert
    dismissible
    :type="type"
  >
    {{ message }}
  </v-alert> <!-- :close-icon="CloseBtn"-->
</template>

<script>
//import CloseBtn from "@/components/UI/CloseBtn";
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

