<!-- @format -->

<template>
  <v-app>
    <v-main>
      <DeviceList />
    </v-main>
  </v-app>
</template>

<script>
  // import DeviceForm from "./components/DeviceForm";
  import DeviceList from "./components/DeviceList"

  export default {
    name: "App",

    components: {
      DeviceList
    },

    data: () => ({
      //
    })
  }
</script>
