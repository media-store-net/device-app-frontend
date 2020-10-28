<template>
  <div class="QrLabel">
    <div class="QrLabelDesc">
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
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import QrcodeVue from 'qrcode.vue';

/**
 * @description QrCode - Component with the generated QrCode of one specific device
 *
 * @vue-data {Number} size - size in px for the QrCode-Snapshot
 * @vue-computed {String} link - computed property, return full url with included urlParam 'sn'
 */
export default {
  name: 'QrCode',
  data() {
    return {
      size: 155,
    };
  },
  computed: {
    ...mapGetters(['currentDevice']),
    link() {
      return (
        process.env.VUE_APP_QR_LINK +
        '/#/customer-login?sn=' +
        this.currentDevice.sn
      );
    },
  },
  components: {
    QrcodeVue,
  },
};
</script>

<style scoped>
.QrLabel {
  margin: 20px;
}
.QrLabelDesc {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  align-items: flex-end;
}
.item {
  margin-top: 20px;
}
p {
  font-size: 24px;
}
</style>
