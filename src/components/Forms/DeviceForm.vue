<template>
  <v-app>
    <v-container>
      <v-flex class="d-flex justify-end">
        <v-btn
          icon
          right
          color="accent"
          @click="closeModal"
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
          <search-select
            label="firma"
            :options="companieOptions"
            v-model="formData.companie.name"
          />
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
          <search-select
            label="parts"
            :options="partsOptions"
            v-model="formData.part.title"
          />
        </v-col>
        <v-col
          cols="12"
          class="downloadFile my-8 gray--{lighten}-{3}"
        >
          <span class="col-1">
            <v-icon
              x-large
              color="error darken-3"
            >{{
              icons.mdiFilePdf
            }}</v-icon>
          </span>
          <search-select
            label="doctypes"
            :options="doctypeOptions"
            v-model="doctypeTitle"
            class="col-8"
          />

          <v-btn
            color="primary"
            class="col-3"
            @click="$refs.inputUpload.click()"
          >
            Select File
          </v-btn>
          <input
            v-show="false"
            ref="inputUpload"
            type="file"
            name="files"
            multiple
            @change="uploadFile"
          >
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
import api from "@/api/api";

export default {
  name: 'DeviceForm',
  components: {
    FileList,
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
    doctypeTitle: 'User-Manual',
  }),
  computed: {
    ...mapGetters(['companies', 'doctypes', 'parts', 'currentDevice']),
    companieOptions() {
      return this.companies.map((comp) => comp.name);
    },
    partsOptions() {
      return this.parts.map((part) => part.title);
    },
    doctypeOptions() {
      return this.doctypes.map((doc) => doc.title);
    },
  },
  methods: {
    ...mapActions(['setCurrentDevice', 'genPass', 'newDevice', 'updateDevice', 'pushDevice']),

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
      // TODO logic to upload and send file to server over store
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
      this.$modal.show('QrCode');
    },
    closeModal() {
      this.$modal.hideAll();
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
        // ID only temporär
        /*this.formData.id = new Date().getTime();
        this.pushDevice(this.formData);*/
        //console.log(this.formData)
        // send data to action
        await this.newDevice(this.formData);
        this.closeModal();

      } else if (this.mode === 'update') {
        console.log('Update fires');
        // send data to action
        await this.updateDevice(this.currentDevice);
        this.closeModal();
      }

      this.closeModal();
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
  // created() {
  //
  // },
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
