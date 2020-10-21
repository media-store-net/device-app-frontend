<!-- @format -->

<template>
  <div class="QrLabel">
    <div class="QrLabelDesc">
      <div>
        <h1>POWASERT®</h1>
        <div class="item">
          <p>Firma: {{ currentDevice.companie.name }}</p>
        </div>
        <div class="item">
          <p>Art.Nr: {{ currentDevice.part.title }}</p>
        </div>
        <div class="item">
          <p>SN: {{ currentDevice.sn }}</p>
        </div>
        <div class="item">
          <p>Link: {{ value }}</p>
        </div>
      </div>

      <div>
        <qrcode-vue
          :value="value"
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

export default {
  name: 'QrCode',
  data() {
    return {
      size: 155,
    };
  },
  computed: {
    ...mapGetters(['currentDevice']),
    value() {
      return process.env.VUE_APP_QR_LINK + '?sn=' + this.currentDevice.sn;
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
