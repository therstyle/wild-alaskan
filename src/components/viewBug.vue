<script setup>
import { onMounted, ref } from 'vue';
import API_URL from '../state/useApiUrl';
import { currentBugId } from '../state/useCurrentBugId';

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
	</section>
</template>

<style lang="scss">
</style>