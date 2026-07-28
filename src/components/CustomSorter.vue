<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";

// Gets the router instance to navigate between pages
const router = useRouter();

// Stores the current input text
const input = ref("");

// Stores all items added by the user
const items = ref([]);

// Gets the sorter actions provided by a parent component
const sorterActions = inject("sorterActions");

// Adds the current input as a new item
function addItem() {
	const value = input.value.trim();

	if (!value) return;

	items.value.push(value);
	input.value = ""; // Clears the input after adding the item
}

// Removes an item from the list using its position
function removeItem(index) {
	items.value.splice(index, 1);
}

// Finishes creating the custom sorter
function done() {
	if (items.value.length < 2) return;

	sorterActions.initCustomSorter(items.value);

	router.push("/custom/sorter");
}
</script>

<template>
	<v-container class="fill-height">
		<!-------------------- TITLE -------------------->
		<v-row justify="center">
			<v-col cols="12" class="text-center">
				<h1>CUSTOM SORTER</h1>
				<p>
					Welcome to the Custom Sorter. <br />
					Enter the options you want to sort in the box below. <br />
					You can add as many options as you like. <br />
					Once you're done, click the "Done" button to start sorting.
				</p>
			</v-col>
		</v-row>
		<!-------------------- INPUT FIELD -------------------->
		<v-row justify="center">
			<v-col cols="6">
				<v-text-field v-model="input" label="Items to sort" variant="outlined" clearable hide-details @keyup.enter="addItem" />
			</v-col>
			<v-col cols="1">
				<v-btn class="w-100 h-100" @click="addItem"> Add </v-btn>
			</v-col>
		</v-row>
		<!-------------------- LIST OF ITEMS -------------------->
		<v-row justify="center" v-show="items.length > 0">
			<v-col cols="8">
				<v-list>
					<v-list-item v-for="(item, index) in items" :key="index">
						{{ item }}
						<template #append>
							<v-btn variant="text" @click="removeItem(index)"> Remove </v-btn>
						</template>
					</v-list-item>
				</v-list>
			</v-col>
		</v-row>
		<!-------------------- DONE BUTTON -------------------->
		<v-row justify="center">
			<v-col cols="1">
				<v-btn :disabled="items.length < 2" @click="done"> Done </v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>
