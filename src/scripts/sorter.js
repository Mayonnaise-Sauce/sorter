import { reactive } from "vue";

// Default values used to initialize and reset the sorter state
const initialState = {
	sortingItems: [], // Original items to sort
	lists: [], // Lists used during the merge sort process
	parents: [], // Parent list index for each generated sublist
	equals: [], // Stores items considered equal by the user
	results: [], // Temporary results while merging two lists

	leftIndex: 0, // Current position in the left list
	rightIndex: 0, // Current position in the right list

	currentLeftList: 0, // Index of the current left list being compared
	currentRightList: 0, // Index of the current right list being compared

	question: 1, // Current battle/question number

	totalSize: 0, // Total number of comparisons required
	finishedSize: 0, // Number of comparisons already completed

	finished: false, // Indicates whether sorting has finished

	ranking: [], // Final sorted ranking
};

// Composable that manages the sorting algorithm state and actions
export function useSorter() {
	// Create reactive state so Vue components update automatically
	const state = reactive({
		...initialState,
	});

	// Resets the sorter state to its initial values
	function reset() {
		Object.assign(state, structuredClone(initialState));
	}

	// Initializes the sorter with a new set of items
	// Creates the initial list and splits it into smaller lists following a merge sort approach
	function initSorter(sorter) {
		reset();

		state.sortingItems = [...sorter.items];
		state.lists = [state.sortingItems.map((_, index) => index)];
		state.parents = [-1];

		for (let i = 0; i < state.lists.length; i++) {
			const list = state.lists[i];

			if (list.length < 2) continue;

			const middle = Math.ceil(list.length / 2);

			state.lists.push(list.slice(0, middle), list.slice(middle));
			state.totalSize += list.length;
			state.parents.push(i, i);
		}

		state.equals = Array(state.sortingItems.length).fill(-1);
		state.currentLeftList = state.lists.length - 2;
		state.currentRightList = state.lists.length - 1;
	}

	// Handles the user's choice during a comparison
	// value < 0 -> left item wins
	// value > 0 -> right item wins
	// value === 0 -> both items are considered equal
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

			state.results.push(left, right);
			state.equals[left] = right;
		}

		state.finishedSize++;

		mergeRemaining();

		state.question++;
	}

	// Completes a merge when one of the lists has no remaining items
	function mergeRemaining() {
		const left = state.lists[state.currentLeftList];
		const right = state.lists[state.currentRightList];

		while (state.leftIndex < left.length && state.rightIndex === right.length) {
			state.results.push(left[state.leftIndex++]);

			state.finishedSize++;
		}

		while (state.rightIndex < right.length && state.leftIndex === left.length) {
			state.results.push(right[state.rightIndex++]);

			state.finishedSize++;
		}

		if (state.leftIndex !== left.length || state.rightIndex !== right.length) return;

		const parent = state.parents[state.currentLeftList];

		state.lists[parent] = [...state.results];
		state.lists.splice(-2);

		state.currentLeftList -= 2;
		state.currentRightList -= 2;

		state.results = [];
		state.leftIndex = 0;
		state.rightIndex = 0;

		if (state.currentLeftList < 0) {
			finish();
		}
	}

	// Generates the final ranking after sorting is completed
	function finish() {
		state.finished = true;

		state.ranking = state.lists[0].map((item, index) => ({
			position: index + 1,
			name: state.sortingItems[item],
		}));
	}

	// Calculates sorting progress percentage
	function progress() {
		return state.totalSize ? Math.floor((state.finishedSize * 100) / state.totalSize) : 0;
	}

	// Expose state and public actions to Vue components
	return {
		state,
		initSorter,
		choose,
		progress,
	};
}
