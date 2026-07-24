<template>
	<v-container fluid style="max-width: 800px">
		<v-row justify="center">
			<v-col cols="12" class="text-center">
				<h1>Sorter</h1>
				<p>Pick an artist to start sorting their songs or albums. <br/> Choose "Other Sorter" for a customized sorter.</p>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col>
				<v-btn
					block
					prepend-icon="$vuetify"
					stacked
					variant="tonal"
					@click="
						showKatarsis = true;
						showAkli = false;
					"
					>Katarsis Sorter</v-btn
				>
			</v-col>
			<v-col>
				<v-btn
					block
					prepend-icon="$vuetify"
					stacked
					variant="tonal"
					@click="
						showAkli = true;
						showKatarsis = false;
					"
					>Aklì Sorter</v-btn
				>
			</v-col>
		</v-row>
		<v-row justify="center" v-show="showKatarsis">
			<v-col>
				<v-btn block prepend-icon="$vuetify" stacked variant="tonal" :to="{ path: 'katarsis/songs' }">Katarsis Songs</v-btn>
			</v-col>
			<v-col>
				<v-btn block prepend-icon="$vuetify" stacked variant="tonal" :to="{ path: 'katarsis/albums' }">Katarsis Albums</v-btn>
			</v-col>
		</v-row>
		<v-row justify="center" v-show="showAkli">
			<v-col>
				<v-btn block prepend-icon="$vuetify" stacked variant="tonal" :to="{ path: 'akli/songs' }">Aklì Songs</v-btn>
			</v-col>
			<v-col>
				<v-btn block prepend-icon="$vuetify" stacked variant="tonal" :to="{ path: 'akli/albums' }">Aklì Albums</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { ref } from "vue";

const showKatarsis = ref(false);
const showAkli = ref(false);
</script>
