<!-- @format -->

<template>
  <v-container>
    <search-select
      label="name"
      :filterable="false"
      :options="options"
      @search="onSearch"
    />
    <!-- <template slot="no-options">type to search GitHub repositories..</template>
      <template slot="option" slot-scope="option">
        <div class="d-center">
          <img :src="option.owner.avatar_url" />
          {{ option.full_name }}
        </div>
      </template>
    </v-select>-->
  </v-container>
</template>

<script>
  import _ from "lodash"
  import vSelect from "vue-select"

  export default {
    name: "DeviceForm",

    data: () => ({
      options: []
    }),
    methods: {
      onSearch(search, loading) {
        loading(true)
        this.search(loading, search, this)
      },
      search: _.debounce((loading, search, vm) => {
        fetch(`https://localhost:1337/companies${escape(search)}`).then(
          (res) => {
            res.json().then((json) => (vm.options = json.items))
            loading(false)
          }
        )
      }, 350)
    }
  }
</script>

<style></style>
