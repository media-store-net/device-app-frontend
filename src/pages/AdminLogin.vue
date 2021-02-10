<template>
  <v-container class="d-flex justify-center align-center">
    <v-row>
      <v-col
        cols="12"
        class="text-center mt-6 mb-10"
      >
        <h1>Powasert® Administration Login</h1>
      </v-col>
      <login-form
        mode="admin"
        @submit-form="onSubmitForm"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoginForm from '../components/Forms/LoginForm';

export default {
  components: {
    LoginForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['loginUser']),
    async onSubmitForm(event) {
      // call action to login user from API
      await this.loginUser(event);
      if (this.isAuthenticated) this.$router.push('devices');
    },
  },
};
</script>

<style></style>
