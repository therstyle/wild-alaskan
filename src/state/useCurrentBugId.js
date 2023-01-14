import { ref } from 'vue';

const currentBugId = ref(0);

function setCurrentBugId (id) {
	currentBugId.value = id;
}

export {
	currentBugId,
	setCurrentBugId
}