<script setup>
import { ref, onMounted } from "vue";
import KatarsisSorter from "./components/KatarsisSorter.vue";

const currentView = ref(window.location.pathname === "/katarsisSorter" ? "katarsisSorter" : "home");

function openKatarsisSorter() {
	currentView.value = "katarsisSorter";
	window.history.pushState({}, "", "/katarsisSorter");
}

function syncViewFromPath() {
	currentView.value = window.location.pathname === "/katarsisSorter" ? "katarsisSorter" : "home";
}

onMounted(() => {
	window.addEventListener("popstate", syncViewFromPath);
});
</script>

<template>
	<v-app>
		<v-main class="fill-height d-flex align-center justify-center">
			<v-container v-if="currentView === 'home'" fluid style="max-width: 800px">
				<!-- Title -->
				<v-row justify="center">
					<v-col cols="12" class="text-center">
						<h1>Sorter</h1>
						<p>Pick a sorter to start sorting songs, albums or others.</p>
					</v-col>
				</v-row>
				<!-- Sorters-->
				<v-row justify="center">
					<v-col>
						<v-btn block prepend-icon="$vuetify" stacked variant="tonal" @click="openKatarsisSorter">Katarsis Sorter</v-btn>
					</v-col>
				</v-row>
			</v-container>
			<KatarsisSorter v-else />
		</v-main>
	</v-app>
</template>
