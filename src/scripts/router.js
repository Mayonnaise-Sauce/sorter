import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/components/Home.vue";
import SorterSelector from "@/components/SorterSelector.vue";
import Sorter from "@/components/Sorter.vue";
import CustomSorter from "@/components/CustomSorter.vue";

// Defines all the routes used by the application
const routes = [
	{
		path: "/",
		component: Home,
	},
	// CUSTOM SORTER
	{
		name: "custom",
		path: "/custom",
		component: CustomSorter,
	},
	{
		name: "customSorter",
		path: "/custom/sorter",
		component: Sorter,
		props: {
			sorter: "custom",
		},
	},
	// ARTIST SORTERS
	{
		name: "sorterSelector",
		path: "/:sorter",
		component: SorterSelector,
		props: true,
	},
	{
		name: "albumSongs",
		path: "/:sorter/albums/:album",
		component: Sorter,
		props: (route) => ({
			sorter: route.params.sorter,
			album: route.params.album,
		}),
	},
	{
		name: "sorter",
		path: "/:sorter/:type",
		component: Sorter,
		props: true,
	},
];

// Create the Vue Router instance
const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
});

// Makes the router available to the whole app
export default router;
