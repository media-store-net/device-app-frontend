<!-- @format -->

<template>
  <v-container>
    <h1>Device List</h1>
    <p>Search Device or Customer...</p>
    <div class="addNew">
      <search-select
        class="select"
        :options="[
          ...devices.map((device) => device.sn),
          ...companies.map((c) => c.name)
        ]"
        v-model="selectedDevice"
      >
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

    <v-col
      class="pa-0"
      v-if="selectedDevice"
    >
      <v-card class="mx-auto">
        <v-list-item
          three-line
          class="list"
        >
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              Firma: {{ currentDevice.companie.name }}
            </v-list-item-title>
            <v-list-item-title class="headline mb-1">
              SN: {{ currentDevice.sn }}
            </v-list-item-title>
            <v-list-item-title class="headline mb-1">
              Art.Nr: {{ currentDevice.part.title }}
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
    </v-col>

    <v-col
      class="pa-0"
      v-if="!selectedDevice"
    >
      <!-- TODO This one as a own component -->
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
      <!-- This one as a own component -->
    </v-col>
  </v-container>
</template>

<script>
  //import vSelect from "vue-select"
  import api from "@/api/api"

  import { mdiQrcode, mdiPencil, mdiDelete } from "@mdi/js"
  import { mapGetters, mapActions } from "vuex"

  export default {
    name: "DeviceList",

    data: () => ({
      icons: {
        mdiQrcode,
        mdiPencil,
        mdiDelete
      },
      selectedDevice: ""
    }),
    computed: {
      ...mapGetters(["companies", "devices", "currentDevice", "doctypes"])
    },
    methods: {
      ...mapActions([
        "setCompanies",
        "setDevices",
        "setCurrentDevice",
        "setDoctypes"
      ]),
      genQr() {
        alert(1)
      },
      editDevice() {
        alert(1)
      },
      deletDevice() {
        alert(1)
      },
      async getCompanies() {
        const res = await api.getCompanies()
        this.setCompanies(res.data)
      },
      async getDiveces() {
        const res = await api.getDiveces()
        this.setDevices(res.data)
      },
      async getDoctypes() {
        const res = await api.getDoctypes()
        this.setDoctypes(res.data)
      }
    },
    watch: {
      selectedDevice(val) {
        console.log("selectedDevice on Watch " + val)
        this.setCurrentDevice(
          this.devices.filter(
            (device) => device.sn === val || device.companie.name.includes(val)
          )[0]
        )
      }
    },
    mounted() {
      this.getCompanies()
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
