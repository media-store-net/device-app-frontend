<template>
  <div>
    <Header />
    <v-container class="d-flex justify-center">
      <v-row>
        <v-col cols="12" class="text-center">
          <h1 class="accent--text">
            Device List
          </h1>
        </v-col>
        <device-list />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@/components/Header';
import DeviceList from '../components/DeviceList';

export default {
  components: {
    DeviceList,
    Header,
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  beforeMount() {
    // Get Userdata from localstorage
    const localUserData = JSON.parse(localStorage.getItem('pw_userinfo'));
    //console.log(localUserData);
    if (localUserData) {
      this.$store.commit('setCurrentUser', localUserData.user);
      this.$store.commit('setAuthenticated', localUserData.isAuthenticated);
      this.$store.commit('setAuthKey', localUserData.authKey);
    }

    //if (!this.isAuthenticated) this.$router.push('admin-login');
  },
};
</script>

<style></style>
