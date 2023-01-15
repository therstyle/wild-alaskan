<script setup>
import { currentComponent, setCurrentComponent } from '../state/useCurrentComponent';
</script>

<template>
	<header>
		<nav>
			<ul>
				<li>
					<button 
					@click="setCurrentComponent('CreateBug')"
					:class="{'active': currentComponent === 'CreateBug'}"
					>Create Bug</button>
				</li>

				<li>
					<button 
						@click="setCurrentComponent('ListBugs')"
						:class="{'active': currentComponent === 'ListBugs'}"
					>View Bugs</button>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
header {
	--border-color: #ccc;

	margin-bottom: var(--space-2);
	border-bottom: 1px solid var(--border-color);
}

nav {
	> ul {
		display: flex;
		margin: 0;
		padding: 0;

		> li {
			list-style: none;
			border-right: 1px solid var(--border-color);

			button {
				font-weight: 700;
				font-size: 16px;
				padding: 16px;
				background: transparent;
				border: none;

				&.active {
					color: var(--dark-blue);
				}

				&:hover {
					color: var(--light-blue);
				}
			}
		}
	}
}
</style>