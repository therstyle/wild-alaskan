<script setup>
import { onMounted, ref } from 'vue';
import PageTitle from './PageTitle.vue';
import ListBug from './ListBug.vue';
import API_URL from '../state/useApiUrl';

const bugs = ref([]);

const loadBugs = async () => {
	try {
		const response = await fetch(`${API_URL}?sortBy=createdAt&order=desc`);
		const data = await response.json();

		if (!data) {return};
		bugs.value = data;
	}
	catch(e) {
		console.error(e);
	}
}

onMounted(() => {
	loadBugs();
});
</script>

<template>
	<section class="list-bugs">
		<PageTitle>View Bugs</PageTitle>

		<div class="list-bugs__grid">
			<ListBug 
				v-for="bug in bugs"
				:key="bug.id"
				:bug="bug"
				@load-bugs="loadBugs"
			></ListBug>
		</div>
	</section>
</template>

<style lang="scss">
.list-bugs {
	&__grid {
		--columns: 2;

		@media only screen and (max-width: 768px) {
			--columns: 1;
		}

		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		gap: var(--space-1);
	}
}
</style>