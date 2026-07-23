import "./assets/main.css";

import { createApp, h, provide, reactive } from "vue";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const values1 = [
	"Niekas",
	"Vasarą galvoj minoras",
	"Spengia Galvoje",
	"Siluetai",
	"Rasa",
	"DES",
	"Lapų šlamesiai išblaškė miegą",
	"Ėda",
	"Būsi",
	"Praradau tave",
	"Paleisiu (Dausos)",
	"Pamiršau žiūrėt į paukščius",
	"Tyla",
	"Nebeturiu jėgų",
	"Ji netikra",
	"Dingo",
	"Tavo Akys (Choir Version)",
	"Balta Meilė",
	"Paleisiu",
	"Išliesiu",
	"Dega",
	"Žiedlapis tau",
	"Likę tik randai",
	"Kada",
	"Laikei tu mane",
	"Neleisk man",
	"Malda",
	"Tavo Akys",
	"Kas man be jūros",
	"Nebepaleidžia",
	"Surasiu"
];

const state = reactive({
	values1,
	lists: [],
	parents: [],
	equals: [],
	results: [],
	leftIndex: 0,
	rightIndex: 0,
	currentLeftList: 0,
	currentRightList: 0,
	question: 1,
	totalSize: 0,
	finishedSize: 0,
	finished: false,
	ranking: [],
});

// Initialize the merge-sort structure and split the list into smaller groups
function initSorter() {
	state.lists = [values1.map((_, index) => index)];
	state.parents = [-1];
	state.totalSize = 0;
	state.finishedSize = 0;
	state.results = [];
	state.finished = false;
	state.ranking = [];
	state.leftIndex = 0;
	state.rightIndex = 0;
	state.question = 1;

	let index = 0;

	while (index < state.lists.length) {
		const list = state.lists[index];

		if (list.length >= 2) {
			const middle = Math.ceil(list.length / 2);
			const left = list.slice(0, middle);
			const right = list.slice(middle);

			state.lists.push(left, right);
			state.totalSize += left.length + right.length;
			state.parents.push(index, index);
		}

		index++;
	}

	state.equals = Array(values1.length).fill(-1);
	state.currentLeftList = state.lists.length - 2;
	state.currentRightList = state.lists.length - 1;
}

// Handle the user's selection for the current battle
// -1 => left option wins
// 0 => both are equal / no opinion
// 1 => right option wins
function choose(value) {
	if (state.finished) return;

	const leftList = state.lists[state.currentLeftList];
	const rightList = state.lists[state.currentRightList];

	if (value < 0) {
		state.results.push(leftList[state.leftIndex++]);
	} else if (value > 0) {
		state.results.push(rightList[state.rightIndex++]);
	} else {
		const left = leftList[state.leftIndex++];
		const right = rightList[state.rightIndex++];

		state.results.push(left);
		state.equals[left] = right;
		state.results.push(right);
	}

	state.finishedSize++;
	mergeRemaining();
	state.question++;
}

// Continue merging the current pair of lists until one side is empty
function mergeRemaining() {
	const leftList = state.lists[state.currentLeftList];
	const rightList = state.lists[state.currentRightList];

	if (state.leftIndex === leftList.length) {
		while (state.rightIndex < rightList.length) {
			state.results.push(rightList[state.rightIndex++]);
			state.finishedSize++; // count remaining items
		}
	}

	if (state.rightIndex === rightList.length) {
		while (state.leftIndex < leftList.length) {
			state.results.push(leftList[state.leftIndex++]);
			state.finishedSize++; // count remaining items
		}
	}

	if (state.leftIndex === leftList.length && state.rightIndex === rightList.length) {
		const parent = state.parents[state.currentLeftList];

		state.lists[parent] = [...state.results];

		state.lists.pop();
		state.lists.pop();

		state.currentLeftList -= 2;
		state.currentRightList -= 2;

		state.results = [];
		state.leftIndex = 0;
		state.rightIndex = 0;

		if (state.currentLeftList < 0) {
			finish();
		}
	}
}

// Build the final ranking once all comparisons are complete
function finish() {
	state.finished = true;
	state.ranking = state.lists[0].map((item, index) => ({
		position: index + 1,
		name: values1[item],
	}));
}

// Return the current completion percentage for the sorter
function progress() {
	if (!state.totalSize) return 0;
	return Math.floor((state.finishedSize * 100) / state.totalSize);
}

// Public actions exposed to the component.
const actions = {
	initSorter,
	choose,
	mergeRemaining,
	finish,
	progress,
};

// Vuetify instance used by the application
const vuetify = createVuetify({
	components,
	directives,
});

const app = createApp({
	setup() {
		provide("sorterState", state);
		provide("sorterActions", actions);
		return () => h(App);
	},
});

app.use(vuetify);
app.mount("#app");

initSorter();
