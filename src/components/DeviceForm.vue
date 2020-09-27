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
    <!-- <template slot="no-options">type to search GitHub repositories..</template>
      <template slot="option" slot-scope="option">
        <div class="d-center">
          <img :src="option.owner.avatar_url" />
          {{ option.full_name }}
        </div>
      </template>
    </v-select>-->

    <div>
      <div class="addedSnPass">
        <v-text-field class="input" label="SN:"></v-text-field>
        <v-text-field class="input" label="Pass:"></v-text-field>
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
        item-value="text"
      ></v-overflow-btn>
      <v-btn color="primary">
        Select File
      </v-btn>
    </div>

    <v-card-actions v-for="doc in doctypes" :key="doc.id">
      <v-list-item-content class="item">
        <v-list-item-title class="headline mb-1">
          <v-icon x-large>{{ icons.mdiFilePdf }}</v-icon>
          {{ doc.title }}: {{ doc.desc }}
        </v-list-item-title>
      </v-list-item-content>
    </v-card-actions>

    <v-btn-toggle group class="btnGroup">
      <v-btn class="btn">
        <v-icon>{{ icons.mdiQrcode }} </v-icon> Gen QrCode
      </v-btn>
      <v-btn class="btn">
        <v-icon>{{ icons.mdiContentSave }} </v-icon> Save
      </v-btn>
    </v-btn-toggle>
  </v-container>
</template>

<script>
import _ from 'lodash';

import {
  mdiContentCopy,
  mdiOnepassword,
  mdiFilePdf,
  mdiQrcode,
  mdiContentSave,
} from '@mdi/js';

import api from '@/api/api';

export default {
  name: 'DeviceForm',

  data: () => ({
    options: [],
    icons: {
      mdiContentCopy,
      mdiOnepassword,
      mdiFilePdf,
      mdiQrcode,
      mdiContentSave,
    },
    doctypes: '',
  }),
  methods: {
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: _.debounce((loading, search, vm) => {
      fetch(`https://localhost:1337/companies${escape(search)}`).then((res) => {
        res.json().then((json) => (vm.options = json.items));
        loading(false);
      });
    }, 350),
    getDoctypes() {
      const self = this;
      api.getDoctypes().then((res) => {
        self.doctypes = res.data;
        console.log(res.data);
      });
    },
  },
  mounted() {
    this.getDoctypes();
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
