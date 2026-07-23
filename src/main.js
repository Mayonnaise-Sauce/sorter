import "./assets/main.css";

import { createApp } from "vue";

import App from "./App.vue";

import router from "./scripts/router.js";

import { useSorter } from "./scripts/sorter.js";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Create the Vue application instance using the root component
const app = createApp(App);

// Initialize the sorter manager
const sorter = useSorter();

// Provide sorter state globally so any component can access it using inject()
app.provide("sorterState", sorter.state);

// Provide sorter actions globally so components can execute sorter operations
app.provide("sorterActions", sorter);

// Register Vuetify as a Vue plugin
app.use(
	createVuetify({
		components,
		directives,
	}),
);

// Register Vue Router to enable navigation between views
app.use(router);

// Mount the Vue application to the HTML element with id="app"
app.mount("#app");
