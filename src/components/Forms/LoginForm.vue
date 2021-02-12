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

/**
 * @description LoginForm - LoginForm Component is the user input area to login to the app
 *
 * @vue-prop {String} [mode='customer'] - the login-form is usable for customer and the admin
 * @vue-prop {String} [sn=null] - the serial-number can pass through as a url param to the form
 * @vue-event {Object} submit-form - emit a submit-form event by sending the form
 * @vue-event forgot-pass - emit the event by click on forgot-password link
 * @vue-data {Object} [icons={eye: mdiEyeOutline, user: mdiAccount, device: mdiLaptopWindows,}]
 * @vue-data {String | null } [username=this.sn] - v-model for the username input element
 * @vue-data {String} pass - v-model for the password input element
 * @vue-data {Boolean} passIsVisible - make the password input readable
 */
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
      return this.mode === 'customer' ? 'Kundennummer / Gerätenummer' : 'Username';
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
    /**
     * @vue-method showPass
     * @description method to make the password field readable
     * @returns {void}
     */
    showPass() {
      console.log('shoPass fired');
      this.passIsVisible = !this.passIsVisible;
    },
    /**
     * @vue-method sendForm
     * @description method to validate and submit the user input
     * @returns {$emit} 'submit-form'-event
     */
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
    /**
     * @vue-method forgotPass
     * @description fire the 'forgot-pass' Event with the given username
     * @returns {$emit} 'forgot-pass'- Event
     */
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
