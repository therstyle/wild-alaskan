<script setup>
import {currentComponent, components} from './state/useCurrentcomponent';
import AppNav from './components/AppNav.vue';
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
