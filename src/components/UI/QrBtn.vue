<template>
  <v-btn
    icon
    color="accent"
  >
    <v-icon>{{ qrBtn }} </v-icon>
  </v-btn>
</template>

<script>
import {mdiQrcode} from "@mdi/js";

export default {
  name: "QrBtn",
  data() {
    return {
      qrBtn: mdiQrcode,
    };
  },
}
</script>

<style scoped>

</style>