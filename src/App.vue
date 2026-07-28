<script setup>
import packageJson from "@/../package.json";

import { artists } from "@/scripts/artists.js";

// Converts special characters into a simple format for comparison
function normalize(value) {
	return value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/\s+/g, "");
}

// Creates the route for the selected album
// Example: ziedlapisTau -> ziedlapis-tau
function getAlbumPath(artist, album) {
	const albumKey = Object.keys(artist.data).find((key) => normalize(key) === normalize(album));

	const urlAlbum = albumKey.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

	return `/${artist.id}/albums/${urlAlbum}`;
}
</script>

<template>
	<v-app>
		<!-------------------- HEADER -------------------->
		<v-app-bar>
			<v-app-bar-title>Sorter</v-app-bar-title>
			<v-spacer />
			<v-btn to="/">Home</v-btn>
			<v-menu v-for="artist in artists" :key="artist.id" open-on-hover>
				<template #activator="{ props }">
					<v-btn v-bind="props" variant="text">
						{{ artist.name }}
					</v-btn>
				</template>
				<v-list>
					<!-------------------- SONGS -------------------->
					<v-list-item :to="`/${artist.id}/songs`">
						<v-list-item-title>Songs</v-list-item-title>
					</v-list-item>
					<!-------------------- ALBUMS -------------------->
					<v-list-item :to="`/${artist.id}/albums`">
						<v-list-item-title>Albums</v-list-item-title>
					</v-list-item>
					<!-------------------- ALBUM SONGS SUBMENU -------------------->
					<v-menu location="end" open-on-hover>
						<template #activator="{ props }">
							<v-list-item v-bind="props">
								<v-list-item-title>Album songs</v-list-item-title>
								<template #append>
									<v-icon icon="mdi-chevron-right" />
								</template>
							</v-list-item>
						</template>
						<v-list>
							<v-list-item v-for="album in artist.data.albums" :key="album" :to="getAlbumPath(artist, album)">
								<v-list-item-title>
									{{ album }}
								</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-list>
			</v-menu>
			<v-btn to="/custom" variant="text">Custom</v-btn>
		</v-app-bar>
		<!-------------------- MAIN VIEWS -------------------->
		<v-main>
			<router-view />
		</v-main>
		<!-------------------- FOOTER -------------------->
		<v-footer class="flex-grow-0 d-flex align-center justify-center">
			<span class="text-body-small my-4">Created by Mayonnaise_Sauce · v{{ packageJson.version }}</span>
		</v-footer>
	</v-app>
</template>
