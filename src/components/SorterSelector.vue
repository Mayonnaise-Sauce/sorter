<script setup>
import { computed, ref } from "vue";
import { artists } from "@/scripts/artists.js";

// Artist ID received from the route
const props = defineProps({
	sorter: {
		type: String,
		required: true,
	},
});

// Finds the selected artist
const artist = computed(() => {
	return artists.find((artist) => artist.id === props.sorter);
});

// Controls whether the album selection dialog is open
const albumDialog = ref(false);

// Converts special characters into a simple format for comparison
function normalize(value) {
	return value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[\s-]+/g, "");
}

// Creates the route for the selected album
// Example: ziedlapisTau -> ziedlapis-tau
function getAlbumPath(album) {
	const albumKey = Object.keys(artist.value.data).find((key) => normalize(key) === normalize(album));

	const urlAlbum = albumKey.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

	return `/${artist.value.id}/albums/${urlAlbum}`;
}
</script>

<template>
	<v-container v-if="artist" class="fill-height">
		<!-------------------- TITLE -------------------->
		<v-row justify="center">
			<v-col cols="12" class="text-center">
				<h2>{{ artist.data.title }}</h2>
				<p>What do you want to sort?</p>
			</v-col>
		</v-row>
		<!-------------------- SORTERS -------------------->
		<v-row justify="center">
			<v-col cols="4">
				<v-card class="pa-4" :to="`/${artist.id}/songs`">
					<v-card-title>Songs</v-card-title>
					<v-card-text>Sort all {{ artist.name }} songs</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card class="pa-4" :to="`/${artist.id}/albums`">
					<v-card-title>Albums</v-card-title>
					<v-card-text>Sort all {{ artist.name }} albums</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card class="pa-4" @click="albumDialog = true">
					<v-card-title>Album songs</v-card-title>
					<v-card-text>Choose an album and sort its songs</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<!-------------------- ALBUM SELECTION DIALOG -------------------->
		<v-dialog v-model="albumDialog" max-width="500">
			<v-card>
				<v-card-title class="text-center pt-6">Choose an album</v-card-title>
				<v-card-text>
					<v-list>
						<v-list-item v-for="album in artist.data.albums" :key="album" :to="getAlbumPath(album)" @click="albumDialog = false">
							<v-list-item-title>
								{{ album }}
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-container>
</template>