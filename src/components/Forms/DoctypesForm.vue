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
            <h1>Doctype Form</h1>
            <v-form
              @submit.prevent="sendForm"
              class="mx-10"
            >
              <v-text-field
                type="text"
                label="* Doctype"
                v-model="title"
              />
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

import CloseBtn from '../UI/CloseBtn';

export default {
  name: "DoctypesForm",
  components: {
    CloseBtn
  },
  data() {
    return {
      title: '',
      desc: ''
    }
  },
  methods: {
    ...mapActions(['newDoctype']),
    async sendForm() {
      //TODO Validate User Input
      // Send the Data on Api/Store
      await this.newDoctype({
        title: this.title,
        desc: this.desc,
      });
      this.closeModal();
    },
    closeModal() {
      EventBus.hideModal('DoctypesForm')
    },

  }
}
</script>

<style scoped>

</style>
