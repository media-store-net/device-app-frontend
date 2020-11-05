<template>
  <v-container class="d-flex justify-center">
    <v-row>
      <v-col
        cols="12"
        class="text-center"
      >
        <h1 class="accent--text">
          Device List
        </h1>
      </v-col>
      <device-list />
    </v-row>
  </v-container>
</template>

<script>
import DeviceList from '../components/DeviceList';

export default {
  components: {
    DeviceList,
  },
};
</script>

<style></style>
