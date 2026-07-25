<script setup>
import { ref } from "vue";

import katarsisIcon from "@/assets/icons/katarsis.jpg";
import akliIcon from "@/assets/icons/akli.jpg";
import customIcon from "@/assets/icons/custom.png";

// ! Stores the currently selected artist
const selectedArtist = ref(null);

const artists = [
	{
		name: "Katarsis",
		value: "katarsis",
		icon: katarsisIcon,
	},
	{
		name: "Aklì",
		value: "akli",
		icon: akliIcon,
	},
];
</script>

<template>
	<v-container fluid style="max-width: 800px">
		<v-row justify="center">
			<v-col cols="12" class="text-center">
				<h1>Sorter</h1>
				<p>
					Pick an artist to start sorting their songs or albums. <br />
					Choose "Custom Sorter" for a customized sorter.
				</p>
			</v-col>
		</v-row>
		<v-row justify="center">
			<!-- ARTIST SORTER -->
			<v-col class="text-center" v-for="artist in artists" :key="artist.value">
				<v-btn icon variant="text" width="80" height="80" @click="selectedArtist = artist.value">
					<v-avatar class="mb-4" size="80" :image="artist.icon" />
				</v-btn>
				<p>{{ artist.name }} Sorter</p>
			</v-col>
			<!-- CUSTOM SORTER -->
			<v-col class="text-center">
				<v-btn variant="text" icon width="80" height="80" :to="{ path: 'custom' }">
					<v-avatar class="mb-4" size="80" :image="customIcon" />
				</v-btn>
				<p>Custom Sorter</p>
			</v-col>
		</v-row>
		<v-row justify="center" v-show="selectedArtist === 'katarsis'">
			<!-- KATARSIS SONG SORTER -->
			<v-col>
				<v-btn prepend-icon="$vuetify" variant="tonal" block stacked :to="{ path: 'katarsis/songs' }">Katarsis Songs</v-btn>
			</v-col>
			<!-- KATARSIS ALBUM SORTER -->
			<v-col>
				<v-btn prepend-icon="$vuetify" variant="tonal" block stacked :to="{ path: 'katarsis/albums' }">Katarsis Albums</v-btn>
			</v-col>
		</v-row>
		<v-row justify="center" v-show="selectedArtist === 'akli'">
			<!-- AKLI SONG SORTER -->
			<v-col>
				<v-btn prepend-icon="$vuetify" variant="tonal" block stacked :to="{ path: 'akli/songs' }">Aklì Songs</v-btn>
			</v-col>
			<!-- AKLI ALBUM SORTER -->
			<v-col>
				<v-btn prepend-icon="$vuetify" variant="tonal" block stacked :to="{ path: 'akli/albums' }">Aklì Albums</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>
