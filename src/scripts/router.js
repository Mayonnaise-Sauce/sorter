import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Sorter from "@/components/Sorter.vue";
import CustomSorter from "@/components/CustomSorter.vue";

// ! Defines all the routes used by the application
const routes = [
	{
		path: "/",
		component: Home,
	},
	{
		name: "katarsisSongs",
		path: "/katarsis/songs",
		component: Sorter,
		props: {
			sorter: "katarsis",
			type: "songs",
		},
	},
	{
		name: "katarsisAlbums",
		path: "/katarsis/albums",
		component: Sorter,
		props: {
			sorter: "katarsis",
			type: "albums",
		},
	},
	{
		name: "akliSongs",
		path: "/akli/songs",
		component: Sorter,
		props: {
			sorter: "akli",
			type: "songs",
		},
	},
	{
		name: "akliAlbums",
		path: "/akli/albums",
		component: Sorter,
		props: {
			sorter: "akli",
			type: "albums",
		},
	},
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
];

// Create the Vue Router instance
const router = createRouter({
	history: createWebHistory(), // Uses the browser URL without adding a "#"
	routes,
});

// Makes the router available to the whole app
export default router;
