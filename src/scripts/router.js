import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Sorter from "../components/Sorter.vue";

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
			type: "songs"
		},
	},
	{
		name: "katarsisAlbums",
		path: "/katarsis/albums",
		component: Sorter,
		props: {
			sorter: "katarsis",
			type: "albums"
		},
	},
	{
		name: "akliSongs",
		path: "/akli/songs",
		component: Sorter,
		props: {
			sorter: "akli",
			type: "songs"
		},
	},
	{
		name: "akliAlbums",
		path: "/akli/albums",
		component: Sorter,
		props: {
			sorter: "akli",
			type: "albums"
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
