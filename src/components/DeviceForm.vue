<template>
  <v-container>
    <h1>POWASERT® Device Form</h1>
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
        class="downloadFile"
      >
        <span class="col-1">
          <v-icon x-large>{{ icons.mdiFilePdf }}</v-icon>
        </span>
        <search-select
          label="doctypes"
          :options="doctypeOptions"
          v-model="doctypeTitle"
          class="col-8"
        />

        <v-btn
          :style="{ backgroundColor: '#4baf4f', color: 'white' }"
          class="col-3"
          @click="$refs.inputUpload.click()"
        >
          Select File
        </v-btn>
        <input
          v-show="false"
          ref="inputUpload"
          type="file"
          @change="uploadFile"
        >
      </v-col>

      <file-list :items="formData.files" />

      <v-btn-toggle
        group
        class="btnGroup mt-3"
      >
        <v-btn
          class="btn"
          @click="GenQrCode"
          type="button"
        >
          <v-icon>{{ icons.mdiQrcode }} </v-icon> Gen QrCode
        </v-btn>
        <v-btn
          class="btn"
          type="submit"
          v-if="mode === 'new'"
        >
          <v-icon>{{ icons.mdiContentSave }} </v-icon> Save
        </v-btn>
        <v-btn
          class="btn"
          type="submit"
          v-if="mode === 'update'"
        >
          <v-icon>{{ icons.mdiContentSave }} </v-icon> Update
        </v-btn>
      </v-btn-toggle>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  mdiContentCopy,
  mdiLockReset,
  mdiFilePdf,
  mdiQrcode,
  mdiContentSave,
} from '@mdi/js'

import FileList from '@/components/FileList'

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
    },
    formData: {},
    initFormData: {
      sn: '',
      companie: { name: '' },
      part: { title: '' },
      doctype: { title: '' },
      files: [],
    },
    doctypeTitle: '',
  }),
  computed: {
    ...mapGetters(['companies', 'doctypes', 'parts', 'currentDevice']),
    companieOptions() {
      return this.companies.map((comp) => comp.name)
    },
    partsOptions() {
      return this.parts.map((part) => part.title)
    },
    doctypeOptions() {
      return this.doctypes.map((doc) => doc.title)
    },
  },
  methods: {
    ...mapActions(['setCurrentDevice', 'pushDevice']),

    genPass() {
      let hash = 0

      if (this.formData.sn === '') return hash

      for (let i = 0; i < this.formData.sn.length; i++) {
        const char = this.formData.sn.charCodeAt(i)
        hash = (hash << 3) - hash + char
        hash = hash & hash
      }

      this.formData.pass = hash
    },
    toClipboard(text) {
      navigator.clipboard.writeText(text).then(
        function() {
          /* clipboard successfully set */
          console.log('Copy was succefull')
        },
        function() {
          /* clipboard write failed */
          console.log('Copy failed')
        }
      )
    },
    async uploadFile(event) {
      const selectedFile = await event.target.files[0]
      let doctypeId = 0
      if (this.doctypeTitle) {
        const doctype = this.doctypes.find(
          (doc) => doc.title === this.doctypeTitle
        )
        doctypeId = doctype.id
      }
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
      }
      this.formData.files.push(file)
    },
    GenQrCode() {
      this.$modal.show('QrCode')
    },
    closeModal() {
      this.$modal.hideAll()
    },
    saveData() {
      // TODO Form Validation and Error Handling
      if (this.mode === 'new') {
        // ID only temporär
        this.formData.id = new Date().getTime()
        this.pushDevice(this.formData)
      } else if (this.mode === 'update') {
        console.log('Update fires')
      }

      this.closeModal()
    },
  },
  watch: {
    formData(val) {
      this.setCurrentDevice(val)
    },
    doctypeTitle(val) {
      return val
    },
  },
  created() {
    // only if the currentDevice not empty copy to formData
    if (this.currentDevice && this.currentDevice.sn) {
      this.formData = { ...this.currentDevice }
    }
    // otherwise copy the initFormData
    else {
      this.formData = { ...this.initFormData, pass: '' }
    }
  },
}
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
