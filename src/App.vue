<template>
  <div id="app">
    <v-app>
      <v-main>
        <DeviceList />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import DeviceList from './components/DeviceList';

export default {
  name: 'App',

  components: {
    DeviceList,
  },
};
</script>
