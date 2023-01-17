import { ref, defineAsyncComponent } from 'vue';

const CreateBug = defineAsyncComponent(() => import('../components/CreateBug.vue'));
const ListBugs = defineAsyncComponent(() => import('../components/ListBugs.vue'));
const ViewBug = defineAsyncComponent(() => import('../components/ViewBug.vue'));

const currentComponent = ref(null);
const components = {
	CreateBug,
	ListBugs,
	ViewBug
}

function setCurrentComponent(name) {
	currentComponent.value = name;
}

export {
	currentComponent,
	setCurrentComponent,
	components
};