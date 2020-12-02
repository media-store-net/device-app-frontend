<template>
  <div>
    <Header title="User Dashboard" />
    <v-container class="d-flex justify-center">
      <v-row>
        <v-col
          cols="12"
          class="text-center"
        >
          <h1 class="accent--text">
            User Dashboard
          </h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Header from '../components/Header';

export default {
  components: {
    Header,
  },
};
</script>

<style></style>
