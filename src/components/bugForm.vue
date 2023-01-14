<script setup>
import { defineProps, ref } from 'vue';
import API_URL from '../state/useApiUrl';
import { currentBugId } from '../state/useCurrentBugId';
import { currentComponent } from '../state/useCurrentComponent';

const props = defineProps({
	title: String,
	description: String
});

const title = ref('');
const description = ref('');

const createBug = async () => {
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

	const data = await response.json();

	console.log(data);
	console.log('creating bug');
	resetFields();
}

const updateBug = async () => {
	console.log('updating bug');
}

function formHandler() {
	if (currentComponent.value === 'viewBug') {
		updateBug();
	}
	else {
		createBug();
	}
}

function resetFields() {
	title.value = '';
	description.value = '';
}
</script>

<template>
	<form class="bug-form" @submit.prevent="formHandler">
		<div class="bug-form__input">
			<label for="title">Title</label>
			<input type="text" name="title" id="title" v-model="title" />
		</div>

		<div class="bug-form__input">
			<label for="description">Description</label>
			<textarea name="description" id="description" v-model="description" />
		</div>

		<button>Submit</button>
	</form>
</template>

<style lang="scss" scoped>
.bug-form {
}
</style>