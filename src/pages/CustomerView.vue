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
          v-for="(device, index) in currentDevice"
          :key="index"
          :id="currentDevice[index].id"
          :companie="currentDevice[index].companie"
          :part="currentDevice[index].part"
          :sn="currentDevice[index].sn"
          :files="currentDevice[index].files"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import DeviceItem from '../components/Devices/DeviceItem';

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
