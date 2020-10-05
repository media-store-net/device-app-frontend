<template>
  <v-card class="mx-auto">
    <v-list-item
      three-line
      class="list"
    >
      <v-list-item-content>
        <v-list-item-title class="headline mb-4">
          <strong>SN: </strong><span class="title-span">{{ sn }}</span>
        </v-list-item-title>
        <v-list-item-title class="headline mb-1">
          <strong>Art.Nr: </strong><span class="title-span">{{ part.title }}</span>
        </v-list-item-title>
        <v-list-item-title class="headline mb-1">
          <strong>Firma: </strong><span class="title-span">{{ companie.name }}</span>
        </v-list-item-title>
      </v-list-item-content>

      <v-card-actions>
        <v-btn
          text
          color="primary"
          @click="$emit('gen-qr')"
        >
          <v-icon>{{ icons.mdiQrcode }}</v-icon> GenQR
        </v-btn>

        <v-btn
          text
          color="success"
          @click="$emit('edit-device')"
        >
          <v-icon>{{ icons.mdiPencil }}</v-icon> Edit
        </v-btn>

        <v-btn
          text
          color="red"
          @click="$emit('delete-device')"
        >
          <v-icon>{{ icons.mdiDelete }}</v-icon> Delete
        </v-btn>
      </v-card-actions>
    </v-list-item>
    <!-- Component -->
    <v-card-actions
      v-for="file in files"
      :key="file.id"
    >
      <v-list-item-content class="item">
        <v-list-item-title class="headline mb-1">
          {{ file.id }}. {{ fileDoctype(file.doctype) }} | {{ file.url.name }}
        </v-list-item-title>
      </v-list-item-content>
      <v-btn color="primary">
        Download
      </v-btn>
    </v-card-actions>
    <!-- /Component -->
  </v-card>
</template>
<script>
import { mdiQrcode, mdiPencil, mdiDelete, mdiFile } from '@mdi/js';

import { mapGetters } from 'vuex';

export default {
  name: 'DeviceItem',
  props: {
    id: { type: Number, required: true },
    companie: { type: Object, required: true },
    part: { type: Object, required: true },
    sn: { type: String, required: true },
    files: { type: Array, required: false, default: () => [] },
    isAdmin: { type: Boolean, default: false },
  },
  emits: ['gen-qr', 'edit-device', 'delete-device'],
  data() {
    return {
      icons: {
        mdiQrcode,
        mdiPencil,
        mdiDelete,
        mdiFile,
      },
    };
  },
  computed: {
    ...mapGetters(['doctypes']),
  },
  methods: {
    fileDoctype(id) {
      let doctype = this.doctypes.find((doc) => doc.id === id);
      return doctype && doctype.title ? doctype.title : '';
    },
  },
};
</script>
<style scoped>
.list {
  align-items: end;
  padding: 20px;
}
.item {
  padding: 0;
}
.title-span {
  position: absolute;
  left: 2em;
  margin-left: 4em;
}
</style>
