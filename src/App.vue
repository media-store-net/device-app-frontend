<!-- @format -->

<template>
  <v-app>
    <v-main>
      <DeviceForm />
    </v-main>
  </v-app>
</template>

<script>
  import DeviceForm from "./components/DeviceForm"
  // import DeviceList from "./components/DeviceList"

  export default {
    name: "App",

    components: {
      DeviceForm
    },

    data: () => ({
      //
    })
  }
</script>
