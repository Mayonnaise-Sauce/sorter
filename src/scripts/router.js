import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Sorter from "../components/Sorter.vue";

const routes = [
	{
		path: "/",
		component: Home,
	},
	{
		name: "katarsisSorter",
		path: "/katarsisSorter",
		component: Sorter,
		props: {
			sorter: "katarsis",
		},
	},
	{
		name: "akliSorter",
		path: "/akliSorter",
		component: Sorter,
		props: {
			sorter: "akli",
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
