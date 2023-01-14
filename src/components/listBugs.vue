<script setup>
import { onMounted, ref } from 'vue';
import PageTitle from './PageTitle.vue';
import ListBug from './ListBug.vue';
import API_URL from '../state/useApiUrl';

const bugs = ref([]);

const loadBugs = async () => {
	const response = await fetch(API_URL);
	const data = await response.json();

	if (!data) {return};
	bugs.value = data;
}

onMounted(() => {
	loadBugs();
});
</script>

<template>
	<section class="list-bugs">
		<PageTitle>View Bugs</PageTitle>

		<ListBug 
			v-for="bug in bugs"
			:key="bug.id"
			:bug="bug"
			@load-bugs="loadBugs"
		></ListBug>
	</section>
</template>

<style lang="scss">
.list-bugs {
	display: flex;
	flex-direction: column;
	gap: 16px;
}
</style>