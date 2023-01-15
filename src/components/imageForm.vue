<script setup>
import { ref, onMounted, computed } from 'vue';
import API_URL from '../state/useApiUrl';
import { currentBugId } from '../state/useCurrentBugId';

const currentImage = ref({
	fileName: null,
	contentBase64: null
});

const imageInput = ref(null);
const images = ref([]);
const error = computed(() => currentImage.value.fileName === null);

const loadImages = async () => {
	try {
		const response = await fetch(`${API_URL}/${currentBugId.value}/images`);
		const data = await response.json();
		
		images.value = data;
	}
	catch(e) {
		console.error(e);
	}
}

const createImage = async () => {
  try {
		const response = await fetch(`${API_URL}/${currentBugId.value}/images`, {
			method: 'POST',
			body: JSON.stringify({
				fileName: currentImage.value.fileName,
				contentBase64: btoa(currentImage.value.contentBase64)
			}),
			headers: {
			'Content-type': 'application/json; charset=UTF-8',
			}
		});

		const data = await response.json();
		resetFields();
		loadImages();
	}
	catch(e) {
		console.error(e);
	}
}

const deleteImage = async (imageId) => {
	try {
		const response = await fetch(`${API_URL}/${currentBugId.value}/images/${imageId}`, {
			method: 'DELETE'
		});

		const data = await response.json();
		loadImages();
	}
	catch(e) {
		console.error(e);
	}
}

function setImage(data) {
	currentImage.value.fileName = imageInput.value.files[0].name;
  currentImage.value.contentBase64 = btoa(data);
}

function resetFields() {
	currentImage.value.fileName = null;
	currentImage.value.contentBase64 = null;
}

onMounted(() => {
	loadImages();
});

</script>

<template>
	<h3>Images</h3>

	<div class="bug-form" v-if="images.length > 0">
		<ul class="bug-form__image-list">
			<li 
				v-for="image in images"
				:key="image?.id"
			>
			<h5>Image ID: {{ image?.id }} - {{ image?.fileName }}</h5>
			<button @click="deleteImage(image?.id)" class="warning">Delete Image</button>
			</li>
		</ul>
	</div>

	<form class="bug-form" @submit.prevent="createImage">
		<div class="bug-form__input">
      <h4><label for="image">Add New Image</label></h4>
      <input type="file" name="image" id="image" @change="setImage" ref="imageInput" />
    </div>

		<button :disabled="error">Submit</button>
	</form>
</template>

<style lang="scss" scoped>
.bug-form {
	&__image-list {
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 16px;

		> li {
			h5 {
				margin-bottom: 0;
			}

			list-style: none;
			display: flex;
			align-items: center;
			gap: 16px;
		}
	}
}
</style>