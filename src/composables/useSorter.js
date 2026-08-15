import { reactive } from "vue";

const initialState = {
  title: "",

  sortingItems: [],
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
};

export function useSorter() {
  const state = reactive({ ...initialState });

  function reset() {
    Object.assign(state, structuredClone(initialState));
  }

  function shuffle(items) {
    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  function initSorter(sorter) {
    reset();

    state.title = sorter.title;
    state.sortingItems = shuffle(sorter.items);
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

  function initCustomSorter(title, items) {
    initSorter({ id: "custom", title: title || "Custom Sorter", items });
  }

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

      state.finishedSize++;
    }

    state.finishedSize++;

    mergeRemaining();

    state.question++;
  }

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

    if (state.currentLeftList < 0) finish();
  }

  function finish() {
    state.finished = true;

    state.ranking = state.lists[0].map((item, index) => ({ position: index + 1, name: state.sortingItems[item] }));
  }

  function progress() {
    return state.totalSize ? Math.floor((state.finishedSize * 100) / state.totalSize) : 0;
  }

  return { state, initSorter, initCustomSorter, choose, progress };
}
