<template>
  <v-container class="d-flex justify-center align-center">
    <v-card class="col-xs-12 col-md-8">
      <v-form @submit.prevent="sendForm">
        <v-col cols="12">
          <v-text-field
            type="text"
            :label="userLabel"
            :append-icon="activeUserIcon"
            v-model="username"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            :type="passType"
            label="Passwort"
            :append-icon="activePassIcon"
            @click:append="showPass"
            v-model="pass"
            required
          />
        </v-col>
        <v-col
          cols="6"
          class="offset-3"
        >
          <v-btn
            type="submit"
            color="primary"
            outlined
            block
          >
            Login
          </v-btn>
        </v-col>
        <v-col
          cols="6"
          offset="3"
          class="text-center"
        >
          Passwort vergessen?
          <span @click="passIsVisible != passIsVisible">Click</span>
        </v-col>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import {
  mdiEyeOutline,
  mdiEyeOffOutline,
  mdiAccount,
  mdiLaptopWindows,
} from '@mdi/js';

export default {
  props: {
    mode: {
      type: String,
      default: 'customer',
    },
    sn: {
      type: String,
      default: null,
    },
  },
  emits: ['submit-form', 'forgot-pass'],
  data() {
    return {
      icons: {
        eye: mdiEyeOutline,
        user: mdiAccount,
        device: mdiLaptopWindows,
      },
      username: this.sn,
      pass: '',
      passIsVisible: false,
    };
  },
  computed: {
    userLabel() {
      return this.mode === 'customer' ? 'Gerätenummer' : 'Username';
    },
    passType() {
      return !this.passIsVisible ? 'password' : 'text';
    },
    activeUserIcon() {
      return this.mode === 'customer' ? mdiLaptopWindows : mdiAccount;
    },
    activePassIcon() {
      return !this.passIsVisible ? mdiEyeOutline : mdiEyeOffOutline;
    },
  },
  methods: {
    showPass() {
      console.log('shoPass fired');
      this.passIsVisible = !this.passIsVisible;
    },
    sendForm() {
      console.log('submit-form fired');
      // emits the form data
      if (!this.username || !this.pass.trim()) {
        //TODO Show error message
        console.log("Empty form can't be submited");
      } else {
        this.$emit('submit-form', { username: this.username, pass: this.pass });
        //reset des Formulars
        (this.username = null), (this.pass = '');
      }
    },
    forgotPass() {
      console.log('Forgot password fired');
      this.$emit('forgot-pass', { username: this.username });
    },
  },
  watch: {},
};
</script>

<style scoped>
.container {
  height: 100%;
}
</style>
