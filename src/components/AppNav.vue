<script setup>
import { setCurrentComponent } from '../state/useCurrentComponent';
</script>

<template>
	<nav>
		<ul>
			<li><button @click="setCurrentComponent('CreateBug')">Create Bug</button></li>
			<li><button @click="setCurrentComponent('ListBugs')">View Bugs</button></li>
		</ul>
	</nav>
</template>

<style lang="scss" scoped>
nav {
	> ul {
		display: flex;
		gap: 16px;
	}

	li {
		list-style: none;
	}
}
</style>