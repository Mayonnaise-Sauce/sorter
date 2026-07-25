<script setup>
import { ref } from "vue";

// Stores the currently selected artist
const selectedArtist = ref(null);
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
			<!-- KATARSIS SORTER -->
			<v-col>
				<v-btn block prepend-icon="$vuetify" stacked variant="tonal" @click="selectedArtist = 'katarsis'">Katarsis Sorter</v-btn>
			</v-col>
			<!-- AKLI SORTER -->
			<v-col>
				<v-btn block prepend-icon="$vuetify" stacked variant="tonal" @click="selectedArtist = 'akli'">Aklì Sorter</v-btn>
			</v-col>
			<!-- CUSTOM SORTER -->
			<v-col>
				<v-btn prepend-icon="$vuetify" variant="tonal" block stacked :to="{ path: 'custom' }">Custom Sorter</v-btn>
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
