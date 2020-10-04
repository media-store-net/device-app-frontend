<!-- @format -->

<template>
  <v-container>
    <h1>POWASERT® Device Form</h1>
    <p>Firma</p>
    <search-select
      label="name"
      :filterable="false"
      :options="options"
      @search="onSearch"
    />
    <div>
      <div class="addedSnPass">
        <v-text-field
          class="input"
          label="SN:"
        />
        <v-text-field
          class="input"
          label="Pass:"
        />
        <v-btn text>
          <v-icon>{{ icons.mdiContentCopy }}</v-icon>
        </v-btn>
        <v-btn text>
          <v-icon>{{ icons.mdiOnepassword }}</v-icon>
        </v-btn>
      </div>
      <p>Art. Nr.</p>
      <search-select
        label="name"
        :filterable="false"
        :options="options"
        @search="onSearch"
      />
    </div>
    <div class="downloadFile">
      <span>
        <v-icon x-large>{{ icons.mdiFilePdf }}</v-icon>
      </span>

      <v-overflow-btn
        class="my-2"
        label="Dropdown DocType"
        editable
        :items="items"
      />

      <v-btn
        color="primary"
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
    </div>

    <v-card-actions
      v-for="doc in doctypes"
      :key="doc.id"
    >
      <v-list-item-content class="item">
        <v-list-item-title class="headline mb-1">
          <v-icon x-large>
            {{ icons.mdiFilePdf }}
          </v-icon>
          {{ doc.title }}: {{ doc.desc }}
        </v-list-item-title>
      </v-list-item-content>
    </v-card-actions>

    <v-btn-toggle
      group
      class="btnGroup"
    >
      <v-btn
        class="btn"
        @click="GenQrCode"
      >
        <v-icon>{{ icons.mdiQrcode }} </v-icon> Gen QrCode
      </v-btn>
      <v-btn class="btn">
        <v-icon>{{ icons.mdiContentSave }} </v-icon> Save
      </v-btn>
    </v-btn-toggle>
  </v-container>
</template>

<script>
  import _ from "lodash"

  import {
    mdiContentCopy,
    mdiOnepassword,
    mdiFilePdf,
    mdiQrcode,
    mdiContentSave,
  } from "@mdi/js"

  import api from "@/api/api"

  export default {
    name: "DeviceForm",
    components: {},

    data: () => ({
      options: [],
      icons: {
        mdiContentCopy,
        mdiOnepassword,
        mdiFilePdf,
        mdiQrcode,
        mdiContentSave,
      },
      items: [
        "User - Manual",
        "Data - Sheet",
        "CE - Konfirmität",
        "Video",
        "Sonstiges",
      ],
      doctypes: "",
    }),
    methods: {
      onSearch(search, loading) {
        loading(true)
        this.search(loading, search, this)
      },
      search: _.debounce((loading, search, vm) => {
        fetch(`https://localhost:1337/companies${escape(search)}`).then(
          (res) => {
            res.json().then((json) => (vm.options = json.items))
            loading(false)
          }
        )
      }, 350),
      getDoctypes() {
        const self = this
        api
          .getDoctypes()
          .then((res) => {
            self.doctypes = res.data
          })
          .catch((error) => console.log(error))
      },
      uploadFile($event) {
        console.log($event.target.files)
      },
      GenQrCode() {
        this.$modal.show("QrCode")
      },
    },
    mounted() {
      this.getDoctypes()
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
