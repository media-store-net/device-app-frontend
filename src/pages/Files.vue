<template>
  <div>
    <Header title="Dateien" />
    <v-container class="d-flex justify-center">
      <v-row>
        <v-col
          cols="12"
          class="text-center"
        >
          <h1 class="accent--text">
            File List
          </h1>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <template v-if="files">
        <file-list
          :items="files"
          is-admin
        />
      </template>
    </v-container>
  </div>
</template>

<script>
import Header from '../components/UI/Header';
import FileList from "@/components/Files/FileList";

import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    Header,
    FileList
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['files'])
  },
  methods: {
    ...mapActions(['showModal', 'hideModal', "setFiles"]),
  },
  created() {
    // start loading
    this.showModal({name: 'Loader'})
    // get Files from API / Store
    this.setFiles()
        .then(() => {
          this.hideModal('Loader')
        })
  }
};
</script>

<style></style>
