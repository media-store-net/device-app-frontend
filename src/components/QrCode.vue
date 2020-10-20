<!-- @format -->

<template>
  <div class="QrLabel">
    <div class="QrLabelDesc">
      <div>
        <h1>POWASERT®</h1>
        <div class="item">
          <p>Art.Nr. ADF-...</p>
        </div>
        <div class="item">
          <p>SN: G-1234</p>
        </div>
        <div class="item">
          <p>Link https://powasert.de/find-docu</p>
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
  import QrcodeVue from 'qrcode.vue'

  export default {
    name: 'QrCode',
    data() {
      return {
        size: 200,
      }
    },
    computed: {
      value() {
        return process.env.VUE_APP_QR_LINK
      },
    },
    components: {
      QrcodeVue,
    },
  }
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
