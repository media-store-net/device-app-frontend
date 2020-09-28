<!-- @format -->

<template>
  <v-container>
    <h1>Device List</h1>
    <p>Search Device or Customer...</p>
    <div class="addNew">
      <search-select class="select">
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
      <v-btn color="success">
        Add New
      </v-btn>
    </div>

    <v-card
      class="mx-auto"
      v-for="device in devices"
      :key="device.id"
    >
      <v-list-item
        three-line
        class="list"
      >
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">
            Firma: {{ device.companie.name }}
          </v-list-item-title>
          <v-list-item-title class="headline mb-1">
            SN: {{ device.sn }}
          </v-list-item-title>
          <v-list-item-title class="headline mb-1">
            Art.Nr: {{ device.part.title }}
          </v-list-item-title>
        </v-list-item-content>

        <v-btn
          text
          color="primary"
          @click="genQr"
        >
          <v-icon>{{ icons.mdiQrcode }}</v-icon> GenQR
        </v-btn>

        <v-btn
          text
          color="success"
          @click="editDevice"
        >
          <v-icon>{{ icons.mdiPencil }}</v-icon> Edit
        </v-btn>

        <v-btn
          text
          color="red"
          @click="deletDevice"
        >
          <v-icon>{{ icons.mdiDelete }}</v-icon> Delete
        </v-btn>
      </v-list-item>

      <v-card-actions
        v-for="doc in doctypes"
        :key="doc.id"
      >
        <v-list-item-content class="item">
          <v-list-item-title class="headline mb-1">
            {{ doc.id }}. {{ doc.title }}: {{ doc.desc }}
          </v-list-item-title>
        </v-list-item-content>
        <v-btn color="primary">
          Download
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import vSelect from "vue-select"
  import api from "@/api/api"

  import { mdiQrcode, mdiPencil, mdiDelete } from "@mdi/js"

  export default {
    name: "DeviceList",

    data: () => ({
      icons: {
        mdiQrcode,
        mdiPencil,
        mdiDelete
      },
      devices: "",
      doctypes: ""
    }),
    methods: {
      genQr() {
        alert(1)
      },
      editDevice() {
        alert(1)
      },
      deletDevice() {
        alert(1)
      },
      getDiveces() {
        const self = this
        api
          .getDiveces()
          .then((res) => {
            self.devices = res.data
          })
          .catch((error) => console.log(error))
      },
      getDoctypes() {
        const self = this
        api.getDoctypes().then((res) => {
          self.doctypes = res.data
        })
      }
    },
    mounted() {
      this.getDiveces()
      this.getDoctypes()
    }
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
</style>
