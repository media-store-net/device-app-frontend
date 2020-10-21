<!-- @format -->

<template>
  <transition name="device-list">
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
          :key="currentDevice.id"
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
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { mdiQrcode, mdiPencil, mdiDelete } from '@mdi/js';

import api from '@/api/api';
import DeviceItem from '@/components/DeviceItem';

/**
 * @description DeviceList - is the initial component used in the App.vue
 * to render the devices as list from DB / Api Endpoint
 *
 * @vue-data {object} [icons={}] - used MDI Icons inside the component {@link https://materialdesignicons.com}
 * @vue-data {string} [selectedDevice=''] - vModel for the search/select field
 * @vue-data {string} [modalName='DeviceForm'] - allows to set dynamic a component to the modal view,
 * awailable modal objects will be found under Global -> state {@link global#state}
 *
 * @vue-computed {Array<object>} companies - this property will be loaded via mapGetters()-Method
 * from the VUEX state if the component is mounted
 *
 * @vue-computed {Array<object>} devices - this property will be loaded via mapGetters()-Method
 * from the VUEX state if the component is mounted
 *
 * @vue-computed {object} currentDevice - this property will be loaded via mapGetters()-Method
 * from the VUEX state if the component is mounted
 *
 * @vue-computed {object} modals - this property will be loaded via mapGetters()-Method
 * from the VUEX state if the component is mounted
 *
 * @vue-computed {object} currentModal - computed property returns an modal-object from the modals state
 *
 */
export default {
  name: 'DeviceList',
  components: {
    DeviceItem,
  },
  data: () => ({
    icons: {
      mdiQrcode,
      mdiPencil,
      mdiDelete,
    },
    selectedDevice: '',
    modalName: 'DeviceForm',
  }),
  computed: {
    ...mapGetters(['companies', 'devices', 'currentDevice', 'modals']),
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
    /**
     * @vue-method addNew
     * @description set the modalName to DeviceForm and show Modal Component
     * @returns {void}
     */
    addNew() {
      this.modalName = 'DeviceForm';
      this.showModal();
    },
    /**
     * @vue-method genQr
     * @description set the modalName to QrCode and show the Modal Component
     * @returns {void}
     */
    genQr(id) {
      this.setCurrentDevice(id);
      this.modalName = 'QrCode';
      this.showModal();
    },
    editDevice() {
      alert(1);
    },
    deleteDevice() {
      alert(1);
    },
    /**
     * @vue-method showModal
     * @description a helper function to open a new modal component
     * @returns {void}
     */
    showModal() {
      this.$modal.show(
        this.currentModal.component,
        this.currentModal.attrs,
        this.currentModal.props,
      );
    },
  },
  watch: {
    selectedDevice(val) {
      this.setCurrentDevice(
        this.devices.find(
          (device) => device.sn === val || device.companie.name.includes(val),
        )['id'],
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

.device-list-enter-active {
  animation: dev-list-animation 0.8s ease;
}
.device-list-leave-active {
  animation: dev-list-animation 0.8s ease reverse;
}

@keyframes dev-list-animation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
