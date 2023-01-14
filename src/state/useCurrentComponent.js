import { ref, defineAsyncComponent } from 'vue';

const createBug = defineAsyncComponent(() => import('../components/createBug.vue'));
const listBugs = defineAsyncComponent(() => import('../components/listBugs.vue'));
const viewBug = defineAsyncComponent(() => import('../components/viewBug.vue'));

const currentComponent = ref('createBug');
const components = {
	createBug,
	listBugs,
	viewBug
}

function setCurrentComponent(name) {
	currentComponent.value = name;
	console.log('setting new component');
}

export {
	currentComponent,
	setCurrentComponent,
	components
};