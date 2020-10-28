<template>
  <v-container class="d-flex justify-center align-center">
    <v-row>
      <v-col
        cols="12"
        class="text-center mt-6 mb-10"
      >
        <h1>Powasert® Kunden Login</h1>
      </v-col>
      <login-form
        mode="customer"
        :sn="snQuery"
        @submit-form="onSubmitForm"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

import LoginForm from '../components/LoginForm';

export default {
  components: {
    LoginForm,
  },
  data() {
    return {};
  },
  computed: {
    snQuery() {
      if (this.$route.query.sn) {
        return this.$route.query.sn;
      }

      return '';
    },
  },
  methods: {
    ...mapActions(['loginCustomer']),
    async onSubmitForm(eventdata) {
      // console.log(JSON.stringify(eventdata));
      await this.loginCustomer({
        sn: eventdata.username,
        pass: eventdata.pass,
      });
      this.$router.push('customer-view');
    },
  },
};
</script>

<style></style>
