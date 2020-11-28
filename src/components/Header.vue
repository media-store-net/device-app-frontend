<template>
  <v-card>
    <v-app-bar
      color="primary"
      dark
    >
      <v-toolbar-title>Devices</v-toolbar-title>

      <v-spacer />

      <v-btn
        icon
        title="Show Logs"
      >
        <v-icon>{{ icons.mdiMathLog }}</v-icon>
      </v-btn>

      <v-menu nudge-bottom="56px">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            title="Add new Item"
            v-on="on"
          >
            <v-icon>{{ icons.mdiPlusThick }}</v-icon>
          </v-btn>
        </template>
        <v-list class="grey lighten-4">
          <v-list-item @click="newCompany">
            Firma
          </v-list-item>
          <v-list-item @click="newPart">
            Artikelnummer
          </v-list-item>
          <v-list-item @click="newFile">
            File
          </v-list-item>
          <v-list-item @click="newDevice">
            Device
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        icon
        title="Show Files"
        @click="showFiles"
      >
        <v-icon>{{ icons.mdiFile }}</v-icon>
      </v-btn>

      <v-btn
        icon
        title="Show Devices"
        @click="showDevices"
      >
        <v-icon>{{ icons.mdiCellphoneLink }}</v-icon>
      </v-btn>

      <v-menu
        nudge-bottom="56px"
        left
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            title="User Details"
            v-on="on"
          >
            <v-icon>{{ icons.mdiAccount }}</v-icon>
          </v-btn>
        </template>
        <v-list class="grey lighten-4">
          <v-list-item @click="showUser">
            Userinfo
          </v-list-item>
          <v-list-item @click="addUser">
            Add User
          </v-list-item>
          <v-list-item @click="logout">
            Logout
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-sheet
      class="overflow-y-auto"
      max-height="600"
    />
  </v-card>
</template>

<script>
import {
  mdiMathLog,
  mdiPlusThick,
  mdiFile,
  mdiCellphoneLink,
  mdiAccount,
} from '@mdi/js';

export default {
  name: 'Header',
  data() {
    return {
      icons: {
        mdiMathLog,
        mdiPlusThick,
        mdiFile,
        mdiCellphoneLink,
        mdiAccount,
      },
    };
  },
  methods: {
    logout() {
      alert('logout');
    },
    addUser() {
      alert('Add User');
    },
    showUser() {
      alert('Show User Info');
    },
    showDevices() {
      alert('DevicePage');
    },
    showFiles() {
      alert('Show Files');
    },
    newCompany() {
      alert('New Company');
    },
    newPart() {
      alert('new Part');
    },
    newFile() {
      alert('new File');
    },
    newDevice() {
      alert('new Device');
    },
  },
};
</script>
