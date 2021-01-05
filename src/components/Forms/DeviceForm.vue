<template>
  <v-app>
    <v-container>
      <v-flex class="d-flex justify-end">
        <v-btn
          icon
          right
          color="accent"
          @click="hideModal('DeviceForm')"
        >
          <v-icon>{{ icons.mdiCloseBox }}</v-icon>
        </v-btn>
      </v-flex>
      <h1 class="accent--text">
        POWASERT® Device Form
      </h1>
      <v-form @submit.prevent="saveData">
        <v-col cols="12">
          <p>Firma</p>
          <v-flex class="d-flex justify-space-between align-center">
            <search-select
              label="firma"
              class="col-11"
              :options="companieOptions"
              v-model="formData.companie.name"
            />
            <PlusBoxBtn
              color="accent"
              size="2.6rem"
              @click="newCompanieModal"
            />
          </v-flex>
        </v-col>
        <v-col
          cols="12"
          class="addedSnPass"
        >
          <v-text-field
            class="input"
            label="SN:"
            v-model="formData.sn"
          />
          <v-text-field
            class="input"
            label="Pass:"
            v-model="formData.pass"
          />
          <v-btn
            text
            title="Passwort generieren"
            @click="generatePass"
          >
            <v-icon>{{ icons.mdiLockReset }}</v-icon>
          </v-btn>
          <v-btn
            text
            title="Kopieren"
            @click="toClipboard(formData.pass)"
          >
            <v-icon>{{ icons.mdiContentCopy }}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12">
          <p>Art. Nr.</p>
          <v-flex class="d-flex justify-space-between align-center">
            <search-select
              label="parts"
              class="col-11"
              :options="partsOptions"
              v-model="formData.part.title"
            />
            <PlusBoxBtn
              color="accent"
              size="2.6rem"
              @click="newPartsModal"
            />
          </v-flex>
        </v-col>
        <v-col
          cols="12"
          class="downloadFile my-8 gray--{lighten}-{3}"
        >
          <v-flex class="d-flex justify-space-between align-center">
            <PlusBoxBtn
              color="error"
              size="2.6rem"
              @click="newDoctypeModal"
            />
            <!-- TODO  check if vSelect can be scrollable-->
            <search-select
              label="doctypes"
              :options="doctypeOptions"
              v-model="doctypeTitle"
              class="col-10"
            />
            <CloudBtn
              color="accent"
              size="2rem"
              @click="filesModal"
            />
            <HarddiskBtn
              color="primary"
              size="2rem"
              @click="$refs.inputUpload.click()"
            />
            <!--            <v-btn
                color="primary"
                class="col-3"
                @click="$refs.inputUpload.click()"
            >
              Select File
            </v-btn>-->
            <input
              v-show="false"
              ref="inputUpload"
              type="file"
              name="files"
              multiple
              @change="uploadFile"
            >
          </v-flex>
        </v-col>

        <file-list
          :items="formData.files"
          :is-admin="true"
        />

        <v-btn-toggle
          group
          class="btnGroup mt-3"
        >
          <v-btn
            outlined
            class="btn"
            @click="GenQrCode"
            type="button"
          >
            <v-icon>{{ icons.mdiQrcode }}</v-icon>
            Gen QrCode
          </v-btn>
          <v-btn
            outlined
            color="primary"
            class="btn"
            type="submit"
            v-if="mode === 'new'"
          >
            <v-icon>{{ icons.mdiContentSave }}</v-icon>
            Save
          </v-btn>
          <v-btn
            outlined
            class="btn"
            type="submit"
            v-if="mode === 'update'"
          >
            <v-icon>{{ icons.mdiContentSave }}</v-icon>
            Update
          </v-btn>
        </v-btn-toggle>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {
  mdiContentCopy,
  mdiLockReset,
  mdiFilePdf,
  mdiQrcode,
  mdiContentSave,
  mdiCloseBox,
} from '@mdi/js';

import {EventBus} from '../../store/eventBus';
import FileList from '@/components/Files/FileList';
import PlusBoxBtn from "@/components/UI/PlusBoxBtn";
import HarddiskBtn from "@/components/UI/HarddiskBtn";
import CloudBtn from "@/components/UI/CloudBtn";

import api from "@/api/api";

export default {
  name: 'DeviceForm',
  components: {
    FileList,
    PlusBoxBtn,
    HarddiskBtn,
    CloudBtn
  },
  props: {
    mode: {
      type: String,
      default: 'new',
    },
  },
  data: () => ({
    options: [],
    icons: {
      mdiContentCopy,
      mdiLockReset,
      mdiFilePdf,
      mdiQrcode,
      mdiContentSave,
      mdiCloseBox,
    },
    formData: {},
    initFormData: {
      sn: '',
      companie: {name: ''},
      part: {title: ''},
      doctype: {title: ''},
      files: [],
    },
    doctypeTitle: 'Dokumentation',
    modalName: ''
  }),
  computed: {
    ...mapGetters(['companies', 'doctypes', 'parts', 'currentDevice', 'modals']),
    companieOptions() {
      return this.companies.map((comp) => comp.name);
    },
    partsOptions() {
      return this.parts.map((part) => part.title);
    },
    doctypeOptions() {
      return this.doctypes.map((doc) => doc.title);
    },
    currentModal() {
      return this.modals[this.modalName]
    },
  },
  methods: {
    ...mapActions(['showModal', 'hideModal', 'setCurrentDevice', 'genPass', 'newDevice', 'updateDevice', 'pushDevice']),
    newCompanieModal() {
      //set current modal to "CompanyForm"
      this.showModal({name: 'CompanyForm'});
    },
    newPartsModal() {
      // set current modal to "PartsForm"
      this.showModal({name: 'PartsForm'});
    },
    newDoctypeModal() {
      // set current modal to "DoctypesForm"
      this.showModal({name: 'DoctypesForm'});
    },
    filesModal() {
      // TODO open files from server as Modal
      alert('Files from Server...')
    },
    async generatePass() {
      const pass = await this.genPass(this.formData.sn)
      this.formData.pass = pass.toString();
    },
    toClipboard(text) {
      navigator.clipboard.writeText(text).then(
          function () {
            /* clipboard successfully set */
            console.log('Copy was succefull');
          },
          function () {
            /* clipboard write failed */
            console.log('Copy failed');
          },
      );
    },
    async uploadFile(event) {
      // create HTML Form Element
      const formEl = document.createElement("form");
      // append new inputs
      formEl.append(event.target)
      // TODO move logic to upload and send file to server over store
      // await the upload of all files
      const response = await api.upload.post(new FormData(formEl));

      const uploads = response.data;
      // loop through the uploaded data
      uploads.map(async upload => {
        const file = {
          filename: upload.name,
          url: upload
        }
        // send the file metadata to api
        const fileRes = await api.files.post(file);
        // store the result from api
        const uploadedFile = fileRes.data;
        // push it to the files array of a device
        this.formData.files.push(uploadedFile);
      })
    },
    GenQrCode() {
      EventBus.modalName = 'QrCode'
      EventBus.showModal();
    },

    async saveData() {
      // TODO Form Validation and Error Handling
      // Find the right company object
      const company = this.companies.find(cmp => cmp.name === this.formData.companie.name)
      this.formData.companie.id = company.id
      // Find the right part object
      const part = this.parts.find(part => part.title === this.formData.part.title)
      this.formData.part.id = part.id

      if (this.mode === 'new') {
        // send data to action
        await this.newDevice(this.currentDevice);
        this.closeModal();
      } else if (this.mode === 'update') {
        // send data to action
        await this.updateDevice(this.currentDevice);
        this.closeModal();
      }

      this.hideModal('DeviceForm');
    },
    removeFileFromDevice(payload) {
      //check if payload exists and contains "fileId" key
      if (payload && payload.fileId) {
        const files = [...this.formData.files]
        this.formData.files = files.filter(file => file.id !== payload.fileId)
      }
    },
  },
  watch: {
    formData(val) {
      this.setCurrentDevice(val);
    },
    doctypeTitle(val) {
      return val;
    },
  },
  created() {
    // only if the currentDevice not empty copy to formData
    if (this.currentDevice && this.currentDevice.sn) {
      this.formData = {...this.currentDevice};
    }
    // otherwise copy the initFormData
    else {
      this.formData = {...this.initFormData, pass: ''};
    }
    // eventlistening to delete File
    EventBus.$on('delBtnClicked', payload => this.removeFileFromDevice(payload));
  },
  destroyed() {
    EventBus.$off('delBtnClicked');
  },
};
</script>

<style scoped>
h1 {
  display: flex;
  justify-content: center;
}

.addedSnPass {
  display: flex;
  align-items: center;
}

.v-application p {
  margin-bottom: 0;
}

.input {
  margin: 10px;
}

.downloadFile {
  display: flex;
  align-items: baseline;
}

.my-2 {
  margin: 10px;
}

.btnGroup {
  display: flex;
  justify-content: flex-end;
}

.btn {
  margin: 10px;
}
</style>
