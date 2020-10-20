<template>
  <v-row>
    <v-card-actions
      v-for="file in items"
      :key="file.id"
    >
      <file-item
        :id="file.id"
        :doctype-id="file.doctype"
        :url="file.url"
      />
    </v-card-actions>
  </v-row>
</template>

<script>
import FileItem from '@/components/FileItem.vue';

export default {
  name: 'FileList',
  components: {
    FileItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.v-card__actions {
  width: 100%;
}
</style>
