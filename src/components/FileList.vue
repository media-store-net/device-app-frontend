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

/**
 * @description FileList - represent the Files Array Component in action cards
 *
 * @vue-prop {Array<FileItem>} [items=[]] - atterate through an array of FileItem-Objects
 */
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
