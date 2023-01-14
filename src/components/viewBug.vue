<script setup>
import { onMounted, ref } from 'vue';
import API_URL from '../state/useApiUrl';
import { currentBugId } from '../state/useCurrentBugId';
import bugForm from './bugForm.vue';
import imageForm from '../components/imageForm.vue';

const bug = ref({});

const loadBug = async () => {
	const response = await fetch(`${API_URL}/${currentBugId.value}`);
	const data = await response.json();

	if (!data) {return};
	bug.value = data;
}

onMounted(() => {
	loadBug();
});
</script>

<template>
	<section>
		{{ bug?.title }}

		<bugForm></bugForm>
		<imageForm></imageForm>
	</section>
</template>

<style lang="scss">
</style>