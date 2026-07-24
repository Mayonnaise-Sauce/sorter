<script setup>
import { computed, inject, onMounted } from "vue";

import katarsis from "../scripts/katarsis.js";
import akli from "../scripts/akli.js";

// Access global sorter state and actions provided in main.js
const sorterState = inject("sorterState");
const sorterActions = inject("sorterActions");

// Component prop that determines which sorter configuration to load
const props = defineProps({
	sorter: String,
	type: String,
});

// Available sorter configurations
const sorters = {
	katarsis,
	akli,
};

// Initialize the selected sorter once the component is ready
onMounted(() => {
	const sorter = sorters[props.sorter];

	sorterActions.initSorter({
		id: sorter.id,
		title: sorter.title,
		items: sorter[props.type],
	});
});

// Gets the current left option displayed in the battle
const leftItem = computed(() => {
	const index = sorterState.lists[sorterState.currentLeftList]?.[sorterState.leftIndex];

	return sorterState.sortingItems[index];
});

// Gets the current right option displayed in the battle
const rightItem = computed(() => {
	const index = sorterState.lists[sorterState.currentRightList]?.[sorterState.rightIndex];

	return sorterState.sortingItems[index];
});

// Sends the user's choice to the sorter logic
// -1 = left option selected
//  0 = both options are equal / no preference
//  1 = right option selected
function choose(value) {
	sorterActions.choose(value);
}
</script>

<template>
	<v-container class="fill-height">
		<v-row justify="center">
			<v-col cols="12" class="text-center">
				<h2>{{ sorters[sorter]?.title }}</h2>
				<p>
					Choose the option you prefer in each battle to create an accurate ranking of your favorite items from the group.
					<br />
					Note: Selecting "No opinion" or "I like both" too often may reduce the accuracy of your results.
				</p>
			</v-col>
		</v-row>
		<v-row v-if="!sorterState.finished" justify="center">
			<v-col cols="12" class="text-center">
				<h3>
					Battle #{{ sorterState.question }}
					<br />
					{{ sorterActions.progress() }}% sorted
				</h3>
			</v-col>
		</v-row>
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
