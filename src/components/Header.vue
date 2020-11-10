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

      <v-btn
        icon
        title="Add new Item"
      >
        <v-icon>{{ icons.mdiPlusThick }}</v-icon>
      </v-btn>

      <v-btn
        icon
        title="Show Files"
      >
        <v-icon>{{ icons.mdiFile }}</v-icon>
      </v-btn>

      <v-btn
        icon
        title="Show Devices"
      >
        <v-icon>{{ icons.mdiCellphoneLink }}</v-icon>
      </v-btn>

      <v-btn
        icon
        title="User Details"
      >
        <v-icon>{{ icons.mdiAccount }}</v-icon>
      </v-btn>
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
};
</script>
