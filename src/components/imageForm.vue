<script setup>
import { defineProps, ref, onMounted } from 'vue';
import API_URL from '../state/useApiUrl';
import { currentBugId } from '../state/useCurrentBugId';
import { currentComponent } from '../state/useCurrentComponent';

const currentImage = ref({
	fileName: null,
	contentBase64: null
});

const imageInput = ref(null);
const images = ref([]);

const loadImages = async () => {
	const response = await fetch(`${API_URL}/${currentBugId.value}/images`);
  const data = await response.json();
	
	images.value = data;
}

const createImage = async () => {
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
	console.log(data);
	resetFields();
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

//TODO: add styling + delete functions
</script>

<template>
	<h3>Images</h3>

	<div class="bug-form">
		<ul class="bug-form__image-list" v-if="images.length > 0">
			<li 
				v-for="image in images"
				:key="image?.id"
			>
			<h5>{{ image?.fileName }}</h5>
			<button>Delete Image</button>
			</li>
		</ul>
	</div>

	<form class="bug-form" @submit.prevent="createImage">
		<div class="bug-form__input">
      <label for="image">Add New Image</label>
      <input type="file" name="image" id="image" @change="setImage" ref="imageInput" />
    </div>

		<button>Submit</button>
	</form>
</template>

<style lang="scss" scoped>
.bug-form {
}
</style>