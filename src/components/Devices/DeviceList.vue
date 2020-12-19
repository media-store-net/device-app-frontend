<template>
  <transition name="device-list">
    <v-container>
      <small>Search Device or Customer...</small>
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
          color="primary"
          outlined
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
          @delete-device="deleteDevice(currentDevice)"
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
          @delete-device="deleteDevice(device)"
        />
      </v-col>
    </v-container>
  </transition>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {mdiQrcode, mdiPencil, mdiDelete} from '@mdi/js'

import api from '@/api/api'
import DeviceItem from '@/components/Devices/DeviceItem'
import {EventBus} from "@/store/eventBus";

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
 * @vue-computed {Array<DeviceItem>} devices - this property will be loaded via mapGetters()-Method
 * from the VUEX state if the component is mounted
 *
 * @vue-computed {DeviceItem} currentDevice - this property will be loaded via mapGetters()-Method
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
      return this.modals[this.modalName]
    },
  },
  methods: {
    ...mapActions([
      'setCompanies',
      'setDevices',
      'setCurrentDevice',
      'setDoctypes',
      'setParts',
      'removeDevice'
    ]),
    /**
     * @vue-method addNew
     * @description set the currentDeviceID to null and the modalName to DeviceForm and show Modal Component
     * @returns {void}
     */
    addNew() {
      this.setCurrentDevice(null)
      this.modalName = 'DeviceForm'
      this.showModal()
    },
    /**
     * @vue-method genQr
     * @description set the modalName to QrCode and show the Modal Component
     * @param {Number} id the ID of the selected Device
     * @returns {ModalComponent}
     */
    genQr(id) {
      this.setCurrentDevice({deviceId: id})
      this.modalName = 'QrCode'
      this.showModal()
    },
    /**
     * @vue-method editDevice
     * @description set the currentDevice to given id, sets modalName to QrCode and show the Modal Component
     * @param {Number} id the ID of the selected Device
     * @returns {ModalComponent}
     */
    editDevice(id) {
      this.setCurrentDevice({deviceId: id})
      this.modalName = 'DeviceForm'
      this.showModal('update')
    },
    /**
     * @vue-method deleteDevice
     * @description remove device of given id from the devices array in the Store
     * @param {Number} id the ID of the selected Device
     * @returns {boolean}
     */
    async deleteDevice(device) {
      //TODO api call to delete the device
      if (confirm('You want realy delete?')) {
        console.log(device.id)
        await this.removeDevice(device.id)
      }
    },
    /**
     * @vue-method showModal
     * @description a helper function to open a new modal component
     * @returns {ModalComponent}
     */
    showModal(mode = 'new') {
      this.$modal.show(
          this.currentModal.component,
          {...this.currentModal.attrs, mode: mode},
          this.currentModal.props
      )
    },
  },
  watch: {
    selectedDevice(val) {
      const devId = this.devices.find(
          (device) => device.sn === val || device.companie.name.includes(val)
      )['id']
      this.setCurrentDevice({deviceId: devId})
    },
  },
  created() {
    // eventlistening to delete File
    EventBus.$on('delete-clicked-onFile', this.deleteDevice);
    // only if the currentDevice not empty copy to formData
    if (this.currentDevice && this.currentDevice.sn) {
      this.formData = {...this.currentDevice};
    }
    // otherwise copy the initFormData
    else {
      this.formData = {...this.initFormData, pass: ''};
    }
  },
  destroyed() {
    EventBus.$off('delete-clicked-onFile');
  },
  mounted() {
    this.setCompanies()
    this.setDevices()
    this.setDoctypes()
    this.setParts()
  },
}
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
