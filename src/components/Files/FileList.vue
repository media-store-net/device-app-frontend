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
        :is-admin="isAdmin"
      />
    </v-card-actions>
  </v-row>
</template>

<script>
import FileItem from '@/components/Files/FileItem.vue';

//TODO Docu for prop isAdmin
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
    isAdmin: {type: Boolean, default: false},
  },
};
</script>

<style scoped>
.v-card__actions {
  width: 100%;
}
</style>
