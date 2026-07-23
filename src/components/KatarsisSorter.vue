<script setup>
import { inject } from "vue";

const sorterState = inject("sorterState");
const sorterActions = inject("sorterActions");
</script>

<template>
	<v-container class="fill-height">
		<!-- Title -->
		<v-row justify="center">
			<v-col cols="12" class="text-center">
				<h2>KATARSIS SORTER</h2>
				<p>
					Pick which song you like better in each battle to get an accurate list of your favorite songs from the group.
					<br />
					Note: hitting "No opinion" or "I like both" frequently will negatively affect your results.
				</p>
			</v-col>
		</v-row>
		<!--Battle -->
		<v-row v-if="!sorterState.finished" justify="center">
			<v-col cols="12" class="text-center">
				<h3>
					Battle #{{ sorterState.question }}
					<br />
					{{ sorterActions.progress() }}% sorted
				</h3>
			</v-col>
		</v-row>
		<!-- Buttons-->
		<v-row v-if="!sorterState.finished" style="height: 20%;" align="stretch">
			<v-col cols="4">
				<button class="w-100 h-100" @click="sorterActions.choose(-1)">
					{{ sorterState.values1[sorterState.lists[sorterState.currentLeftList]?.[sorterState.leftIndex]] }}
				</button>
			</v-col>
			<v-col cols="4" class="d-flex flex-column">
				<button class="w-100 h-100 mb-2" @click="sorterActions.choose(0)">I like both</button>
				<button class="w-100 h-100" @click="sorterActions.choose(0)">No opinion</button>
			</v-col>
			<v-col cols="4">
				<button class="w-100 h-100" @click="sorterActions.choose(1)">
					{{ sorterState.values1[sorterState.lists[sorterState.currentRightList]?.[sorterState.rightIndex]] }}
				</button>
			</v-col>
		</v-row>
		<!-- Ranking -->
		<v-row v-else justify="center">
			<v-col cols="12" class="text-center">
				<h2>Ranking</h2>
				<p>You can start over by reloading the page.</p>
				<v-table striped="even">
					<thead>
						<tr>
							<th class="text-center">Rank</th>
							<th class="text-center">Option</th>
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
