<template>
  <v-container class="d-flex justify-center align-center">
    <v-row>
      <v-col
        cols="12"
        class="text-center my-10"
      >
        <h1>Geräteübersicht</h1>
      </v-col>
      <v-col cols="12">
        <device-item
          :id="currentDevice.id"
          :companie="currentDevice.companie"
          :part="currentDevice.part"
          :sn="currentDevice.sn"
          :files="currentDevice.files"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import DeviceItem from '../components/DeviceItem';

export default {
  components: {
    DeviceItem,
  },
  computed: {
    ...mapGetters(['currentDevice']),
  },
};
</script>

<style></style>
