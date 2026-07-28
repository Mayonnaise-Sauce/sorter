<script setup>
// ! Artists import
import customIcon from "@/assets/icons/custom.png";
import { artists } from "@/scripts/artists.js";
</script>

<template>
	<v-container class="fill-height">
		<!-------------------- TITLE -------------------->
		<v-row justify="center">
			<v-col cols="12" class="text-center">
				<h1>SORTER</h1>
				<p>
					Pick an artist to start sorting their songs or albums. <br />
					Choose "Custom Sorter" to create your own custom ranking.
				</p>
			</v-col>
		</v-row>
		<!-------------------- ARTIST SORTERS -------------------->
		<v-row justify="center">
			<v-col v-for="artist in artists" :key="artist.id" class="text-center">
				<v-btn icon variant="text" width="80" height="80" :to="{ path: artist.id }">
					<v-avatar size="80" :image="artist.icon" />
				</v-btn>
				<p>{{ artist.name }} Sorter</p>
			</v-col>
		</v-row>
		<v-divider>OR</v-divider>
		<!-------------------- CUSTOM SORTER -------------------->
		<v-row justify="center" class="mt-8">
			<v-col class="text-center">
				<v-btn icon variant="text" width="80" height="80" to="/custom">
					<v-avatar size="80" :image="customIcon" />
				</v-btn>
				<p>Custom Sorter</p>
			</v-col>
		</v-row>
	</v-container>
</template>
