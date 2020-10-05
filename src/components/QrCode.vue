<template>
  <div>
    <qrcode-vue
      :value="value"
      :size="size"
      level="H"
    />
  </div>
</template>
<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'QrCode',
  data() {
    return {
      size: 300,
    };
  },
  computed: {
    value() {
      return process.env.VUE_APP_QR_LINK;
    },
  },
  components: {
    QrcodeVue,
  },
};
</script>

<style scoped></style>
