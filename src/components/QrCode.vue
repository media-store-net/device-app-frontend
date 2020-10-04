<!-- @format -->

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
  import QrcodeVue from "qrcode.vue"

  export default {
    name: "QrCode",
    data() {
      return {
        value: "https://example.com",
        size: 300,
      }
    },
    components: {
      QrcodeVue,
    },
  }
</script>

<style scoped></style>
