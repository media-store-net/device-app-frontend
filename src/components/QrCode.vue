<template>
  <v-app>
    <v-container class="QrLabel">
      <v-card class="QrLabelDesc">
        <div>
          <h1>POWASERT®</h1>
          <div class="item">
            <p><strong>Firma:</strong> {{ currentDevice.companie.name }}</p>
          </div>
          <div class="item">
            <p><strong>Art.Nr:</strong> {{ currentDevice.part.title }}</p>
          </div>
          <div class="item">
            <p><strong>SN:</strong> {{ currentDevice.sn }}</p>
          </div>
          <div class="item">
            <p><strong>Link:</strong> {{ link }}</p>
          </div>
        </div>

        <div>
          <qrcode-vue
            :value="link"
            :size="size"
            level="H"
          />
        </div>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";

import QrcodeVue from "qrcode.vue";

/**
 * @description QrCode - Component with the generated QrCode of one specific device
 *
 * @vue-data {Number} size - size in px for the QrCode-Snapshot
 * @vue-computed {String} link - computed property, return full url with included urlParam 'sn'
 */
export default {
  name: "QrCode",
  data() {
    return {
      size: 155
    };
  },
  computed: {
    ...mapGetters(["currentDevice"]),
    link() {
      return (
        process.env.VUE_APP_QR_LINK +
        "/#/customer-login?sn=" +
        this.currentDevice.sn
      );
    }
  },
  components: {
    QrcodeVue
  }
};
</script>

<style scoped>
.QrLabelDesc {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: flex-end;
}

p {
  font-size: 24px;
}
</style>
