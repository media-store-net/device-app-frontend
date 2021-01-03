<template>
  <v-app>
    <v-container class="d-flex justify-center align-center">
      <v-row>
        <v-col
            cols="12"
            class="text-center mt-6 mb-10 col-md-8 offset-md-2"
        >
          <v-card class="py-8">
            <close-btn
                class="mr-10"
                @click="closeModal"
            />
            <h1>Company Form</h1>
            <v-form
                @submit.prevent="sendForm"
                class="mx-10"
            >
              <v-text-field
                  type="text"
                  label="* Firmenname"
                  v-model="name"
              />
              <v-text-field
                  type="number"
                  label="* Kundennummer"
                  v-model="kdnr"
              />
              <v-flex class="d-flex">
                <v-text-field
                    class="input"
                    label="Pass:"
                    v-model="pass"
                />
                <v-btn
                    text
                    title="Passwort generieren"
                    @click="genarate"
                >
                  <v-icon>{{ icons.mdiLockReset }}</v-icon>
                </v-btn>
                <v-btn
                    text
                    title="Kopieren"
                    @click="true"
                >
                  <v-icon>{{ icons.mdiContentCopy }}</v-icon>
                </v-btn>
              </v-flex>
              <v-textarea
                  label="kurze Beschreibung"
                  v-model="desc"
              />
              <v-flex class="d-flex justify-end mt-3 mr-10">
                <v-btn
                    class="primary"
                    type="submit"
                >
                  Speichern
                </v-btn>
              </v-flex>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import {mapActions} from 'vuex';
import {EventBus} from "@/store/eventBus";

import {mdiContentCopy, mdiLockReset} from '@mdi/js';

import CloseBtn from '../UI/CloseBtn';

export default {
  components: {
    CloseBtn,
  },
  data() {
    return {
      name: '',
      kdnr: '',
      pass: '',
      desc: '',
      icons: {
        mdiContentCopy,
        mdiLockReset,
      },
    };
  },
  methods: {
    ...mapActions(['newCompanie', 'genPass']),
    genarate() {
      this.genPass(this.kdnr)
          .then((result) => {
            this.pass = result;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    async sendForm() {
      //TODO Validate User Input
      // Send the Data on Api/Store
      await this.newCompanie({
        name: this.name,
        kdnr: this.kdnr,
        pass: this.pass.toString(),
        desc: this.desc,
      });
      // close the Modal
      this.closeModal();
    },
    closeModal() {
      EventBus.hideModal('CompanyForm');
    },
  },
  watch: {
    pass(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        return newValue;
      }
    },
  },
};
</script>

<style></style>
