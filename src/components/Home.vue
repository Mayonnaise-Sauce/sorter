<script setup>
import { ref } from "vue";

import customIcon from "@/assets/icons/custom.png";
import { artists } from "@/scripts/artists.js";

// Stores the currently selected artist
const selectedArtist = ref(null);
const artistDialog = ref(false);

function openArtistDialog(artist) {
	selectedArtist.value = artist;
	artistDialog.value = true;
}
</script>

<template>
	<v-container fluid style="max-width: 800px">
		<v-row justify="center">
			<v-col cols="12" class="text-center">
				<h1>Sorter</h1>
				<p>
					Pick an artist to start sorting their songs or albums. <br />
					Choose "Custom Sorter" to create your own custom ranking.
				</p>
			</v-col>
		</v-row>
		<!-- ARTIST SORTERS -->
		<v-row justify="center">
			<v-col v-for="artist in artists" :key="artist.id" class="text-center">
				<v-btn icon variant="text" width="80" height="80" @click="openArtistDialog(artist)">
					<v-avatar size="80" :image="artist.icon" />
				</v-btn>

				<p>{{ artist.name }} Sorter</p>
			</v-col>
		</v-row>
		<v-divider>OR</v-divider>
		<!-- CUSTOM SORTER -->
		<v-row justify="center" class="mt-8">
			<v-col class="text-center">
				<v-btn icon variant="text" width="80" height="80" to="/custom">
					<v-avatar size="80" :image="customIcon" />
				</v-btn>

				<p>Custom Sorter</p>
			</v-col>
		</v-row>
		<!-- DIALOG WITH ARTIST OPTIONS -->
		<v-dialog v-model="artistDialog">
			<v-card>
				<v-card-title class="text-center pt-8"> {{ selectedArtist?.name }} Sorter </v-card-title>
				<v-card-text class="text-center">
					<p>What do you want to sort?</p>
					<v-row>
						<v-col>
							<v-btn block size="large" variant="tonal" :to="`/${selectedArtist?.id}/songs`" @click="artistDialog = false"> Songs </v-btn>
						</v-col>

						<v-col>
							<v-btn block size="large" variant="tonal" :to="`/${selectedArtist?.id}/albums`" @click="artistDialog = false"> Albums </v-btn>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-dialog>
	</v-container>
</template>
