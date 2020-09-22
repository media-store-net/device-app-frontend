<template>
  <v-app>
    <v-main>
      <DeviceForm />
    </v-main>
  </v-app>
</template>

<script>
import DeviceForm from "./components/DeviceForm";

export default {
  name: "App",

  components: {
    DeviceForm
  },

  data: () => ({
    //
  })
};
</script>
