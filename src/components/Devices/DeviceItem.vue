<template>
  <transition
    name="device"
    mode="out-in"
  >
    <v-card class="mx-auto">
      <v-list-item
        three-line
        class="list"
      >
        <v-list-item-content>
          <v-list-item-title class="headline mb-4">
            <strong>SN: </strong><span class="title-span">{{ sn }}</span>
          </v-list-item-title>
          <v-list-item-title class="headline mb-1">
            <strong>Art.Nr: </strong><span class="title-span">{{ part.title }}</span>
          </v-list-item-title>
          <v-list-item-title class="headline mb-1">
            <strong>Firma: </strong><span class="title-span">{{ companie.name }}</span>
          </v-list-item-title>
        </v-list-item-content>

        <div class="">
          <v-card-actions v-if="isAdmin">
            <v-row>
              <v-col cols="12">
                <QrBtn @click="$emit('gen-qr', id)" />

                <EditBtn @click="$emit('edit-device', id)" />

                <DeleteBtn @click="$emit('delete-device', id)" />
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-actions>
            <v-row>
              <v-col
                cols="12"
                class="badge-container"
              >
                <div
                  class="accent--text badge"
                  @click="showFiles = !showFiles"
                >
                  <v-icon
                    color="accent"
                    class="mr-3"
                    size="1.5em"
                  >
                    {{ icons.mdiFile }}
                  </v-icon>
                  <span>{{ files.length }}</span>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </div>
      </v-list-item>
      <div v-if="showFiles">
        <file-list :items="files" />
      </div>
    </v-card>
  </transition>
</template>
<script>
import {mdiFile} from '@mdi/js';

import FileList from '@/components/Files/FileList.vue';
import DeleteBtn from "@/components/UI/DeleteBtn";
import EditBtn from "@/components/UI/EditBtn";
import QrBtn from "@/components/UI/QrBtn";

/**
 * @description DeviceItem is a Component to reflect functionality of one device object
 *
 * @vue-prop {number} id - id of the item, this prop is required
 * @vue-prop {object} companie - represent the companie / customer of the device,
 * this prop is required
 * @vue-prop {object} part - represent the doctype of the device,
 * this prop is required
 * @vue-prop {string} sn - represent the series number of the device,
 * this prop is required
 * @vue-prop {Array} [files=[]] - Files Array include all the Files of one component
 * @vue-prop {Boolean} [isAdmin=false] - isAdmin prop allows to show or hide admin-specific buttons and actions
 *
 * @vue-data {object} [icons={mdiQrcode, mdiPencil, mdiDelete, mdiFile}] - used MDI Icons inside the
 * component {@link https://materialdesignicons.com}
 * @vue-data {Boolean} [showFiles=false] - this property allow to show and hide Files-Component
 *
 * @vue-computed {Array<object>} doctypes - the doctypes property will be loaded from the VUEX store via mapGetters() function
 *
 * @vue-event {number} gen-qr - Emit 'gen-qr' event with the given id of device if the generate qr button clicked
 * @vue-event {number} edit-device - Emit 'edit-device' event with the given id of device if the edit-button clicked
 * @vue-event {number} delete-device - Emit 'delete-device' with the given id of device event if the delete-button clicked
 */
export default {
  name: 'DeviceItem',
  components: {
    QrBtn,
    DeleteBtn,
    FileList,
    EditBtn
  },
  props: {
    id: {type: String, required: true},
    companie: {type: Object, required: true},
    part: {type: Object, required: true},
    sn: {type: String, required: true},
    files: {type: Array, required: false, default: () => []},
    isAdmin: {type: Boolean, default: false},
  },
  emits: ['gen-qr', 'edit-device', 'delete-device'],
  data() {
    return {
      icons: {
        mdiFile,
      },
      showFiles: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.list {
  align-items: end;
  padding: 20px;
}

.title-span {
  position: absolute;
  left: 2em;
  margin-left: 4em;
}

.badge {
  text-align: center;
  padding: 10px 20px;
  border: 1px solid;
  border-color: var(--v-accent-base);
  border-radius: 10px;
  margin: 0 auto;
  background: transparent;
  cursor: pointer;
}

.device-enter-active {
  animation: device-animation 0.8s ease-out;
}

.device-leave-active {
  animation: device-animation 0.5s ease-in reverse;
}

@keyframes device-animation {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
