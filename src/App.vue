<script setup>
import { artists } from "@/scripts/artists.js";
</script>

<template>
	<v-app>
		<!-- HEADER -->
		<v-app-bar>
			<v-app-bar-title> Sorter</v-app-bar-title>
			<v-spacer />
			<v-btn to="/">Home</v-btn>
			<!-- ARTIST MENUS -->
			<v-menu v-for="artist in artists" :key="artist.id" open-on-hover>
				<template #activator="{ props }">
					<v-btn v-bind="props" variant="text">
						{{ artist.name }}
					</v-btn>
				</template>
				<v-list>
					<v-list-item :to="`/${artist.id}/songs`">
						<v-list-item-title>Songs</v-list-item-title>
					</v-list-item>

					<v-list-item :to="`/${artist.id}/albums`">
						<v-list-item-title>Albums</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-btn to="/custom" variant="text"> Custom </v-btn>
		</v-app-bar>
		<!-- APP -->
		<v-main class="fill-height d-flex align-center justify-center">
			<router-view />
		</v-main>
	</v-app>
</template>
