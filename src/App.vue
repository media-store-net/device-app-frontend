<template>
  <div id="app">
    <v-app>
      <v-main>
        <admin-login />
        <customer-login />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AdminLogin from './pages/AdminLogin';
import CustomerLogin from './pages/CustomerLogin';

export default {
  name: 'App',

  components: {
    AdminLogin,
    CustomerLogin,
  },
};
</script>

<style>
.container,
.QrLabel {
  font-family: 'Roboto';
}
</style>
