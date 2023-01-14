<script setup>
import { defineProps, defineEmits } from 'vue';
import API_URL from '../state/useApiUrl';
import { setCurrentComponent } from '../state/useCurrentComponent';
import { setCurrentBugId } from '../state/useCurrentBugId';

const props = defineProps({
	bug: Object
});

const emit = defineEmits(['load-bugs']);

function viewBug(id) {
	setCurrentBugId(id);
	setCurrentComponent('ViewBug');
}

const deleteBug = async (bugId) => {
	const response = await fetch(`${API_URL}/${bugId}`, {
    method: 'DELETE'
  });

  const data = await response.json();
	emit('load-bugs');
	console.log(data);
}
</script>

<template>
	<article class="list-bug" :id="`bug-${bug?.id}`">
		<div class="list-bug__content">
			<h3 v-if="bug?.title" class="list-bug__title">Bug Id: {{ bug?.id }} - {{ bug.title }}</h3>

			<ul class="list-bug__actions">
				<li>
					<button @click="viewBug(bug?.id)">View Bug</button>
				</li>
				<li>
					<button @click="deleteBug(bug?.id)">Delete Bug</button>
				</li>
			</ul>
		</div>
	</article>
</template>

<style lang="scss" scoped>
.list-bug {
	background: var(--gray);
	padding: 16px;
	border-radius: 8px;

	&__content {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 16px;
	}

	&__title {
		margin: 0;
	}

	&__actions {
		margin: 0;
		padding: 0;
		display: flex;
		gap: 16px;

		> li {
			list-style: none;
		}
	}
}
</style>