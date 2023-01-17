<script setup>
import { ref, onMounted, computed } from 'vue';
import API_URL from '../state/useApiUrl';
import { currentBugId } from '../state/useCurrentBugId';
import { currentComponent } from '../state/useCurrentComponent';

const state = ref({
	title: '',
	description: ''
});

const status = ref({
	submitted: false,
	output: '',
});

const errors = computed(() => {
	return {
		title: state.value.title.length,
		description: state.value.description.length
	}
});

const emit = defineEmits(['load-bug']);

const createBug = async () => {
	status.value.submitted = false;

	try {
		const response = await fetch(`${API_URL}`, {
			method: 'POST',
			body: JSON.stringify({
				title: title.value,
				description: description.value
			}),
			headers: {
			'Content-type': 'application/json; charset=UTF-8',
			}
		});

		if (!response?.ok) {
			status.value.output = `An error has occurred: ${response?.statusText}`;
		}
		else {
			status.value.output = 'Successfully submitted!';
		}

		resetFields();
	}
	catch(e) {
		console.error(e);
		status.value.output = `An error has occurred: ${e}`;
	}

	status.value.submitted = true;
}

const updateBug = async () => {
	status.value.submitted = false;

	try {
		const response = await fetch(`${API_URL}/${currentBugId.value}`, {
			method: 'PUT',
			body: JSON.stringify({
				title: state.value.title,
				description: state.value.description
			}),
			headers: {
			'Content-type': 'application/json; charset=UTF-8',
			}
		});

		if (!response?.ok) {
			status.value.output = `An error has occurred: ${response?.statusText}`;
		}
		else {
			status.value.output = 'Successfully updated!';
		}

		emit('load-bug');
	}
	catch(e) {
		console.error(e);
		status.value.output = `An error has occurred: ${e}`;
	}

	status.value.submitted = true;
}

const loadBug = async () => {
	try {
		if (currentComponent.value !== 'ViewBug') {return};
		const response = await fetch(`${API_URL}/${currentBugId.value}`);
		const data = await response.json();

		if (!data) {return};
		state.value.title = data?.title;
		state.value.description = data?.description;
	}
	catch(e) {
		console.error(e);
	}
}

function formHandler() {
	if (currentComponent.value === 'ViewBug') {
		updateBug();
	}
	else {
		createBug();
	}
}

function resetFields() {
	state.value.title = '';
	state.value.description = '';
}

onMounted(() => {
	loadBug();
})
</script>

<template>
	<form class="bug-form" @submit.prevent="formHandler">
		<div class="bug-form__input">
			<label for="title">Title <small>(required)</small></label>
			<input type="text" name="title" id="title" v-model="state.title" />
		</div>

		<div class="bug-form__input">
			<label for="description">Description <small>(required)</small></label>
			<textarea name="description" id="description" v-model="state.description" />
		</div>

		<button :disabled="errors.title === 0 || errors.description === 0">Submit</button>

		<h5 v-if="status.submitted">
			{{ status.output }}
		</h5>
	</form>
</template>