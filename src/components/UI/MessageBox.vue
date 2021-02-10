<template xmlns:slot="http://www.w3.org/1999/html">
  <v-app>
    <v-alert
        dense
        :type="type"
    >
      {{ message }}
    </v-alert> <!-- :close-icon="CloseBtn"-->
  </v-app>
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
<style type="scss">
.v-application--wrap {
  min-height: auto!important;
}
</style>
