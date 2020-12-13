<template>
  <v-card>
    <v-app-bar
      color="primary"
      dark
    >
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer />

      <v-btn
        icon
        title="Show Logs"
        @click="showLogs"
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
          <v-list-item @click="newDoctype">
            Doctype
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: 'Powasert Geräteverwaltung',
    },
  },
  data() {
    return {
      icons: {
        mdiMathLog,
        mdiPlusThick,
        mdiFile,
        mdiCellphoneLink,
        mdiAccount,
      },
      modalName: '',
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'modals']),
    currentModal() {
      return this.modals[this.modalName];
    },
  },
  methods: {
    ...mapActions(['logoutUser']),
    logout() {
      this.logoutUser();
    },
    addUser() {
      alert('Add User');
    },
    showUser() {
      if (this.$route.name !== 'user') this.$router.push('user');
    },
    showLogs() {
      if (this.$route.name !== 'logs') this.$router.push('logs');
    },
    showDevices() {
      if (this.$route.name !== 'devices') this.$router.push('devices');
    },
    showFiles() {
      if (this.$route.name !== 'files') this.$router.push('files');
    },
    newCompany() {
      this.modalName = 'CompanyForm';
      this.showModal();
    },
    newPart() {
      this.modalName = 'PartsForm';
      this.showModal();
    },
    newDoctype() {
      this.modalName = 'DoctypesForm';
      this.showModal();
    },
    newFile() {
      alert('new File');
    },
    newDevice() {
      alert('new Device');
    },
    showModal(mode = 'new') {
      this.$modal.show(
        this.currentModal.component,
        { ...this.currentModal.attrs, mode: mode },
        this.currentModal.props,
      );
    },
  },
  watch: {
    isAuthenticated(newValue, oldValue) {
      if (newValue !== oldValue && newValue === false)
        this.$router.push('admin-login');
    },
  },
  created() {
    if (!this.isAuthenticated) this.$router.push('admin-login');
  },
};
</script>
