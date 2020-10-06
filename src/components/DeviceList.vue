<template>
  <div>
    <v-container>
      <h1>Device List</h1>
      <p>Search Device or Customer...</p>
      <div class="addNew">
        <search-select
          class="select"
          :options="[
            ...devices.map((device) => device.sn),
            ...companies.map((c) => c.name),
          ]"
          v-model="selectedDevice"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No results found for <em>{{ search }}</em>.
            </template>
            <em
              style="opacity: 0.5;"
              v-else
            >Search Device or Customer...</em>
          </template>
        </search-select>
        <v-btn
          color="success"
          @click="addNew"
        >
          Add New
        </v-btn>
      </div>

      <v-col
        class="pa-0"
        v-if="selectedDevice"
      >
        <device-item
          :id="currentDevice.id"
          :companie="currentDevice.companie"
          :part="currentDevice.part"
          :sn="currentDevice.sn"
          :files="currentDevice.files"
          :is-admin="true"
          @gen-qr="genQr"
          @edit-device="editDevice"
          @delete-device="deleteDevice"
        />
      </v-col>

      <v-col
        class="pa-0"
        v-if="!selectedDevice"
      >
        <device-item
          v-for="device in devices"
          :key="device.id"
          :id="device.id"
          :companie="device.companie"
          :part="device.part"
          :sn="device.sn"
          :files="device.files"
          :is-admin="true"
          @gen-qr="genQr"
          @edit-device="editDevice"
          @delete-device="deleteDevice"
        />
      </v-col>
    </v-container>
  </div>
</template>

<script>
//import vSelect from "vue-select"
import api from '@/api/api';
import DeviceItem from '@/components/DeviceItem';
import DeviceForm from '@/components/DeviceForm';
import QrCode from '@/components/QrCode';

import { mdiQrcode, mdiPencil, mdiDelete } from '@mdi/js';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DeviceList',
  components: {
    DeviceItem,
    // eslint-disable-next-line
    DeviceForm,
    // eslint-disable-next-line
    QrCode,
  },
  data: () => ({
    icons: {
      mdiQrcode,
      mdiPencil,
      mdiDelete,
    },
    selectedDevice: '',
    modals: {
      DeviceForm: {
        name: 'DeviceForm',
        class: 'DeviceForm',
        height: '99%',
        width: '700px',
        component: DeviceForm,
      },
      QrCode: {
        name: 'QrCode',
        class: 'QrCode',
        height: '99%',
        width: '700px',
        component: QrCode,
      },
    },
    modalName: 'DeviceForm',
  }),
  computed: {
    ...mapGetters(['companies', 'devices', 'currentDevice']),
    currentModal() {
      return this.modals[this.modalName];
    },
  },
  methods: {
    ...mapActions([
      'setCompanies',
      'setDevices',
      'setCurrentDevice',
      'setDoctypes',
    ]),
    addNew() {
      this.modalName = 'DeviceForm';
      this.showModal();
    },
    genQr() {
      this.modalName = 'QrCode';
      this.showModal();
    },
    editDevice() {
      alert(1);
    },
    deleteDevice() {
      alert(1);
    },
    showModal() {
      this.$modal.show(
        this.currentModal.component,
        {},
        {
          height: this.currentModal.height,
          width: this.currentModal.width,
          class: this.currentModal.class,
        },
      );
    },

    // MOVED TO STORE
    // async getCompanies() {
    //   const res = await api.getCompanies()
    //   this.setCompanies(res.data)
    // },
    // async getDiveces() {
    //   const res = await api.getDiveces();
    //   this.setDevices(res.data);
    // },
    // async getDoctypes() {
    //   const res = await api.getDoctypes();
    //   this.setDoctypes(res.data);
    // },
  },
  watch: {
    selectedDevice(val) {
      this.setCurrentDevice(
        this.devices.filter(
          (device) => device.sn === val || device.companie.name.includes(val),
        )[0],
      );
    },
  },
  mounted() {
    this.setCompanies();
    this.setDevices();
    this.setDoctypes();
  },
};
</script>

<style scoped>
h1 {
  display: flex;
  justify-content: center;
  margin: 40px;
}

.v-application p {
  margin-bottom: 0;
}
.addNew {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.select {
  width: 100%;
  margin-right: 20px;
}
.mx-auto {
  margin-top: 40px;
}
.list {
  align-items: end;
  padding: 20px;
}
.item {
  padding: 0;
}
.QrCode {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
