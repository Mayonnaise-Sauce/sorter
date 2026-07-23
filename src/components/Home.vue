<template>
	<v-container fluid style="max-width: 800px">
		<v-row justify="center">
			<v-col cols="12" class="text-center">
				<h1>Sorter</h1>
				<p>Pick a sorter to start sorting songs, albums or other items.</p>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col>
				<v-btn block prepend-icon="$vuetify" stacked variant="tonal" :to="{ path: 'katarsisSorter' }">Katarsis Sorter</v-btn>
			</v-col>
			<v-col>
				<v-btn block prepend-icon="$vuetify" stacked variant="tonal" :to="{ path: 'akliSorter' }">Aklì Sorter</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>
