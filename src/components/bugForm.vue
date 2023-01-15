<script setup>
import { ref, onMounted } from 'vue';
import API_URL from '../state/useApiUrl';
import { currentBugId } from '../state/useCurrentBugId';
import { currentComponent } from '../state/useCurrentComponent';

const inputTitle = ref('');
const inputDescription = ref('');

const emit = defineEmits(['load-bug']);

const createBug = async () => {
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

		const data = await response.json();

		console.log(data);
		console.log('creating bug');
		resetFields();
	}
	catch(e) {
		console.error(e);
	}
}

const updateBug = async () => {
	try {
		const response = await fetch(`${API_URL}/${currentBugId.value}`, {
			method: 'PUT',
			body: JSON.stringify({
				title: title.value,
				description: description.value
			}),
			headers: {
			'Content-type': 'application/json; charset=UTF-8',
			}
		});

		const data = await response.json();
		emit('load-bug');

		console.log(data);
		console.log('updating bug');
	}
	catch(e) {
		console.error(e);
	}
}

const loadBug = async () => {
	try {
		if (currentComponent.value !== 'ViewBug') {return};
		const response = await fetch(`${API_URL}/${currentBugId.value}`);
		const data = await response.json();

		if (!data) {return};

		console.log(data);
		inputTitle.value = data?.title;
		inputDescription.value = data?.description;
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
	title.value = '';
	description.value = '';
}

onMounted(() => {
	loadBug();
})
</script>

<template>
	<form class="bug-form" @submit.prevent="formHandler">
		<div class="bug-form__input">
			<label for="title">Title</label>
			<input type="text" name="title" id="title" v-model="inputTitle" />
		</div>

		<div class="bug-form__input">
			<label for="description">Description</label>
			<textarea name="description" id="description" v-model="inputDescription" />
		</div>

		<button>Submit</button>
	</form>
</template>

<style lang="scss" scoped>
.bug-form {
}
</style>