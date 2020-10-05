<!-- @format -->

<template>
  <div id="app">
    <v-app>
      <v-main>
        <!-- <device-form /> -->
        <DeviceList />
      </v-main>
    </v-app>
  </div>
</template>

<script>
  // import DeviceForm from "./components/DeviceForm"
  import DeviceList from "./components/DeviceList"

  export default {
    name: "App",

    components: {
      // DeviceForm,
      DeviceList,
    },

    data: () => ({
      //
    }),
  }
</script>
