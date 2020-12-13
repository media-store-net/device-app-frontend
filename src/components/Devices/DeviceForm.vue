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
            @click="genPass"
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
    doctypeTitle: '',
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
    ...mapActions(['setCurrentDevice', 'pushDevice']),

    genPass() {
      let hash = 0;

      if (this.formData.sn === '') return hash;

      for (let i = 0; i < this.formData.sn.length; i++) {
        const char = this.formData.sn.charCodeAt(i);
        hash = (hash << 3) - hash + char;
        hash = hash & hash;
      }

      this.formData.pass = hash;
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
      console.log(event.target.files)
      //TODO make selected files as a loop
      const selectedFile = await event.target.files[0];
      let doctypeId = 0;
      if (this.doctypeTitle) {
        const doctype = this.doctypes.find(
            (doc) => doc.title === this.doctypeTitle,
        );
        doctypeId = doctype.id;
      }
      //TODO id is only temporery, should be removed by calling API
      const file = {
        id: new Date().getTime(),
        filename: selectedFile.name,
        doctype: doctypeId,
        url: {
          created_at: selectedFile.lastModified,
          mime: selectedFile.type,
          name: selectedFile.name,
          size: selectedFile.size,
          url: '/' + selectedFile.name,
        },
      };
      //TODO push files only if thruety from API
      this.formData.files.push(file);
    },
    GenQrCode() {
      this.$modal.show('QrCode');
    },
    closeModal() {
      this.$modal.hideAll();
    },
    saveData() {
      // TODO Form Validation and Error Handling
      if (this.mode === 'new') {
        // ID only temporär
        this.formData.id = new Date().getTime();
        this.pushDevice(this.formData);
      } else if (this.mode === 'update') {
        console.log('Update fires');
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
