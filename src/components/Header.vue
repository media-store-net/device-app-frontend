<template>
  <v-card>
    <v-app-bar
      color="primary"
      dark
    >
      <v-toolbar-title>Devices</v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>{{ icons.mdiMathLog }}</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>{{ icons.mdiFormDropdown }}</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>{{ icons.mdiFile }}</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>{{ icons.mdiCellphoneLink }}</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>{{ icons.mdiInformationVariant }}</v-icon>
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
  mdiFormDropdown,
  mdiFile,
  mdiCellphoneLink,
  mdiInformationVariant,
} from '@mdi/js'

export default {
  name: 'Header',
  data() {
    return {
      icons: {
        mdiMathLog,
        mdiFormDropdown,
        mdiFile,
        mdiCellphoneLink,
        mdiInformationVariant,
      },
    }
  },
}
</script>
