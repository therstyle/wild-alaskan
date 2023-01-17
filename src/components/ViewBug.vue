<script setup>
import { onMounted, ref } from 'vue';
import PageTitle from './PageTitle.vue';
import BugForm from './BugForm.vue';
import ImageForm from './ImageForm.vue';
import API_URL from '../state/useApiUrl';
import { currentBugId } from '../state/useCurrentBugId';

const bug = ref({});

const loadBug = async () => {
	try {
		const response = await fetch(`${API_URL}/${currentBugId.value}`);
		const data = await response.json();

		if (!data) {return};
		bug.value = data;
	}
	catch(e) {
		console.error(e);
	}
}

onMounted(() => {
	loadBug();
});
</script>

<template>
	<section>
		<PageTitle>Bug ID: {{ bug?.id }} - {{ bug?.title }}</PageTitle>

		<BugForm @load-bug="loadBug"></BugForm>
		<ImageForm></ImageForm>
	</section>
</template>