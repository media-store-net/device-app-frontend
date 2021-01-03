import Vue from 'vue';
import store from './index'

export const EventBus = new Vue({
	store,
	data() {
		return {
			modalName: ''
		}
	},
	computed: {
		currentModal() {
			return store.getters.modals[this.modalName]
		},
	},
	methods: {
		onDeleteBtn(val = null) {
			this.$emit('delBtnClicked', val)
		},
		/**
		 * @vue-method showModal
		 * @description a helper function to open a new modal component
		 * @returns {ModalComponent}
		 */
		showModal(componentProps = {}) {
			this.$modal.show(
				this.currentModal.component,
				{...this.currentModal.attrs, componentProps},
				this.currentModal.props
			)
		},
		hideModal(name) {
			this.$modal.hide(name)
		},
		hideAllModals() {
			this.$modal.hideAll();
		}
	}
});
