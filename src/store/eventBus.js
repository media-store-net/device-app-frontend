import Vue from 'vue';

export const EventBus = new Vue({
	methods: {
		onDeleteBtn(val = null) {
			this.$emit('delBtnClicked', val)
		}
	}
});
