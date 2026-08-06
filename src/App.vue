<script setup>
import packageJson from "@/../package.json";

import { artists } from "@/scripts/artists.js";
</script>

<template>
	<v-app>
		<!-- HEADER -->
		<v-app-bar density="comfortable" title="Sorter">
			<v-btn class="mr-2" to="/">Home</v-btn>
			<v-btn class="mr-2" v-for="artist in artists" :key="artist.id" :to="`/${artist.id}`">
				{{ artist.name }}
				<v-menu activator="parent" open-on-hover>
					<v-list density="comfortable">
						<v-list-item :to="`/${artist.id}/songs`">
							<v-list-item-title>Songs</v-list-item-title>
						</v-list-item>
						<v-list-item :to="`/${artist.id}/albums`">
							<v-list-item-title>Albums</v-list-item-title>
						</v-list-item>
						<v-menu open-on-hover location="end">
							<template #activator="{ props }">
								<v-list-item v-bind="props">
									<v-list-item-title>Album songs</v-list-item-title>
									<template #append>
										<v-icon icon="mdi-menu-right" size="x-small" />
									</template>
								</v-list-item>
							</template>
							<v-list density="comfortable">
								<v-list-item v-for="album in artist.data.albums" :key="album.id" :to="`/${artist.id}/albums/${album.id}`">
									<v-list-item-title>
										{{ album.name }}
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-list>
				</v-menu>
			</v-btn>
			<v-btn class="header-button" to="/custom">Custom</v-btn>
		</v-app-bar>
		<!-- MAIN VIEWS -->
		<v-main>
			<router-view />
		</v-main>
		<!-- FOOTER -->
		<v-footer class="flex-grow-0 d-flex align-center justify-center">
			<span class="text-body-small py-2"> Created by Mayonnaise_Sauce · v{{ packageJson.version }} </span>
		</v-footer>
	</v-app>
</template>

<style lang="css">
.v-menu .v-list-item-title {
	font-size: 14px;
}
</style>
