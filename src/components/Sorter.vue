<script setup>
import { computed, inject, watch } from "vue";

import { artists } from "@/scripts/artists.js";

// Accesses global sorter state and actions provided in main.js
const sorterState = inject("sorterState");
const sorterActions = inject("sorterActions");

// Data received from the current route
const props = defineProps({
	sorter: String,
	type: String,
	album: String,
});

// Find the current artist
const artist = computed(() => {
	return artists.find((artist) => artist.id === props.sorter);
});

// Get the current artist's data
const currentData = computed(() => {
	return artist.value?.data;
});

// Gets the items that should be sorted
function getItems() {
	if (!artist.value) {
		return null;
	}

	// Sort songs from a specific album
	if (props.album) {
		const album = artist.value.data.albums.find(
			(album) => album.id === props.album
		);

		return album?.songs;
	}

	// Sort all albums
	if (props.type === "albums") {
		return artist.value.data.albums.map((album) => album.name);
	}

	// Sort all songs
	return artist.value.data[props.type];
}

// Initializes the sorter when the route changes
watch(
	() => [props.sorter, props.type, props.album],
	() => {
		const items = getItems();

		if (!items) {
			return;
		}

		sorterActions.initSorter({
			id: artist.value.data.id,
			title: artist.value.data.title,
			items,
		});
	},
	{ immediate: true },
);

// Gets the current left item
const leftItem = computed(() => {
	const index = sorterState.lists[sorterState.currentLeftList]?.[sorterState.leftIndex];

	return sorterState.sortingItems[index];
});

// Gets the current right item
const rightItem = computed(() => {
	const index = sorterState.lists[sorterState.currentRightList]?.[sorterState.rightIndex];

	return sorterState.sortingItems[index];
});

// Send the user's choice to the sorter
// -1 = left option selected
//  0 = both options are equal
//  1 = right option selected
function choose(value) {
	sorterActions.choose(value);
}
</script>

<template>
	<v-container class="fill-height">
		<!-------------------- TITLE -------------------->
		<v-row justify="center">
			<v-col cols="12" class="text-center">
				<h2>{{ props.sorter === "custom" ? "CUSTOM SORTER" : currentData?.title }}</h2>
				<p>
					Choose the option you prefer in each battle to create an accurate ranking of your favorite items. <br />
					Note: Selecting "I like both" or "No opinion" too often may affect the accuracy of your results.
				</p>
			</v-col>
		</v-row>
		<!-------------------- BATTLE -------------------->
		<v-row v-if="!sorterState.finished" justify="center">
			<v-col cols="12" class="text-center">
				<h3>
					Battle #{{ sorterState.question }}
					<br />
					{{ sorterActions.progress() }}% sorted
				</h3>
			</v-col>
		</v-row>
		<!-------------------- ITEM BUTTONS -------------------->
		<v-row v-if="!sorterState.finished" style="height: 20%" align="stretch">
			<v-col cols="4">
				<button class="w-100 h-100" @click="choose(-1)">
					{{ leftItem }}
				</button>
			</v-col>
			<v-col cols="4" class="d-flex flex-column">
				<button class="w-100 h-100 mb-2" @click="choose(0)">I like both</button>
				<button class="w-100 h-100" @click="choose(0)">No opinion</button>
			</v-col>
			<v-col cols="4">
				<button class="w-100 h-100" @click="choose(1)">
					{{ rightItem }}
				</button>
			</v-col>
		</v-row>
		<!-------------------- RESULTS TABLE -------------------->
		<v-row v-else justify="center">
			<v-col cols="12" class="text-center">
				<h2>Ranking</h2>
				<p>You can start over by reloading the page.</p>
				<v-table striped="even">
					<thead>
						<tr>
							<th class="text-center">Rank</th>
							<th class="text-center">Items</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in sorterState.ranking" :key="item.position">
							<td>{{ item.position }}</td>
							<td>{{ item.name }}</td>
						</tr>
					</tbody>
				</v-table>
			</v-col>
		</v-row>
	</v-container>
</template>
