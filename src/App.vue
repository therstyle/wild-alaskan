<script setup>
import { onMounted } from 'vue';
import { currentComponent, components, setCurrentComponent } from './state/useCurrentComponent';
import AppNav from './components/AppNav.vue';

onMounted(() => {
	//The home page component
	setCurrentComponent('CreateBug');
});
</script>

<template>
	<AppNav></AppNav>

  <component
		:is="components[currentComponent]"
	>
	</component>
</template>

<style lang="scss">
	@import './assets/css/global.scss';
</style>
