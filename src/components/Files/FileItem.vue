<template>
  <transition name="file">
    <v-col
      cols="12"
      class="file-item-container"
    >
      <v-list-item-content class="item">
        <v-list-item-title class="headline mb-1">
          <table>
            <thead>
              <tr>
                <td>Dokumentationsart</td>
                <td>Dateiname</td>
                <td />
                <td />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ fileDoctype(doctypeId) }}</td>
                <td>{{ url.name }}</td>
                <td v-if="isAdmin">
                  <DeleteBtn
                    @click="onDelete"
                  />
                </td>
                <td>
                  <a
                    :href="filelink"
                    target="_blank"
                  >
                    <v-btn
                      icon
                      color="blue"
                    >
                      <v-icon>{{ download }}</v-icon>
                    </v-btn>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </v-list-item-title>
      </v-list-item-content>
    </v-col>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex';

import {mdiFileDownload} from '@mdi/js';
import {EventBus} from '../../store/eventBus';
import DeleteBtn from '@/components/UI/DeleteBtn';

/**
 * @description FileItem - represent one given File Object
 *
 * @vue-prop {Number} id - (required) given ID of the current file, prop is required
 * @vue-prop {Number} doctypeId - (required) given ID of doctype, prop is required
 * @vue-prop {Object} url - (required) object with detail info of the given file, like mime, public url, name
 * @vue-prop {Boolean} [isAdmin=false] - this prop enable a administrative area to handle the items (edit,delete)
 * @vue-data {String} [download=mdiFileDownload] - mdi-icon for download
 * @vue-computed {String} filelink - computed property to return the full url of the current file, to make downloads available
 *
 */
export default {
  name: 'FileItem',
  components: {
    DeleteBtn,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    doctypeId: {
      type: String,
      required: false,
    },
    url: {
      type: Object,
      required: true,
    },
    isAdmin: {type: Boolean, default: false},
  },
  data() {
    return {
      download: mdiFileDownload,
    };
  },
  computed: {
    ...mapGetters(['doctypes']),
    filelink() {
      return process.env.VUE_APP_API_URL + this.url.url;
    },
  },
  methods: {
    /**
     * @vue-method fileDoctype
     * @description saerch a specific doctype from the doctypes array and return those title
     * @param {number} id - id from the doctype object
     * @returns {string}  - returns a title from the doctype
     */
    fileDoctype(id) {
      let doctype = this.doctypes.find((doc) => doc.id === id);
      return doctype && doctype.title ? doctype.title : '';
    },
    /**
     * @vue-method onDelete
     * @description emits the onDeleteBtn method on EventBus
     * @return {EventBus} - EventBus $emit
     */
    onDelete() {
      EventBus.onDeleteBtn({fileId: this.id})
    },
  },
};
</script>

<style scoped>
.file-item-container {
  display: inline-flex;
  padding: 0 1.5rem;
}

.item {
  padding: 0;
}

.file-enter-active {
  animation: list-animation 0.8s ease-out;
}

.file-leave-active {
  animation: list-animation 0.8s ease-in reverse;
}

@keyframes list-animation {
  from {
    opacity: 0;
    transform: translateX(-50);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
