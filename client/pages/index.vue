<script setup lang="ts">
const search = ref("");
const year = ref("");
const type = ref("");
const currentPage = ref(1);

const { data, pending } = await useFetch("/api/searchMedia", {
  query: {
    title: search,
    year: year,
    type: type,
    page: currentPage,
  },
});

const paginationInfo = computed(() => {
  const pageIndex = 10 * (currentPage.value - 1);
  const totalResults = data.value?.totalResults ?? 0;
  const resultsLength = data.value?.results?.length ?? 0;
  const currentFirst = pageIndex + 1;
  const lastPage = pageIndex + resultsLength >= totalResults;
  const currentLast = lastPage ? totalResults : pageIndex + resultsLength;

  return {
    currentFirst,
    currentLast,
  };
});

const typeOptions = [
  { text: "Movie", value: "movie" },
  { text: "Series", value: "series" },
  { text: "Episode", value: "episode" },
];
</script>

<template>
  <h1 class="text-3xl font-bold text-center mt-4">Media Search - Raketech</h1>

  <div class="flex gap-4 mt-4">
    <input
      v-model="search"
      @input="currentPage = 1"
      type="text"
      id="search"
      name="search"
      placeholder="Title"
      class="inline bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
    />

    <input
      v-model="year"
      type="text"
      id="year"
      name="year"
      placeholder="Year"
      class="inline bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
    />

    <select
      v-model="type"
      name="type"
      id="type"
      placeholder="Type"
      class="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <option selected value="">Choose type</option>
      <option v-for="option in typeOptions" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>

  <div v-if="pending" class="text-center mt-4">loading</div>

  <div v-else class="overflow-hidden border border-gray-200 rounded-lg mt-4">
    <table class="table-auto min-w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="py-2 px-4 text-left">Name</th>
          <th class="py-2 px-4 text-left">Year</th>
          <th class="py-2 px-4 text-left">Type</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="result in data.results" v-if="data.results?.length > 0">
          <td class="py-2 px-4">{{ result.Title ?? "-" }}</td>
          <td class="py-2 px-4">{{ result.Year ?? "-" }}</td>
          <td class="py-2 px-4">{{ result.Type ?? "-" }}</td>
        </tr>

        <tr v-else>
          <td colspan="3" class="text-center py-2 px-4">No results found</td>
        </tr>
      </tbody>
    </table>

    <nav
      v-if="data.results?.length > 0"
      class="flex items-center justify-between px-4 py-2 border-t-2"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal">
        <span>Showing&nbsp;</span>
        <span class="font-semibold">
          {{ paginationInfo.currentFirst }}-{{ paginationInfo.currentLast }}
        </span>
        of
        <span class="font-semibold">{{ data?.totalResults }}</span>
      </span>

      <div class="inline-flex items-center -space-x-px">
        <button
          @click="currentPage--"
          type="button"
          :disabled="currentPage <= 1"
          class="w-24 block px-3 py-2 ml-0 leading-tight bg-gray-50 border border-gray-300 rounded-l-lg hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-gray-50 font-semibold"
        >
          Previous
        </button>

        <button
          @click="currentPage++"
          type="button"
          :disabled="paginationInfo.currentLast >= data?.totalResults"
          class="w-24 block px-3 py-2 ml-0 leading-tight bg-gray-50 border border-gray-300 rounded-r-lg hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-gray-50 font-semibold"
        >
          Next
        </button>
      </div>
    </nav>
  </div>
</template>
