<script setup lang="ts">
const { data, pending } = await useFetch("/api/searchMedia");
</script>

<template>
  <div>test</div>

  <div v-if="pending" class="text-center">loading</div>

  <div v-else class="overflow-hidden border border-gray-200 rounded-lg">
    <table class="table-auto min-w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="py-2 px-4 text-left">Name</th>
          <th class="py-2 px-4 text-left">Year</th>
          <th class="py-2 px-4 text-left">Type</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="result in data.results">
          <td class="py-2 px-4">{{ result.Title ?? "-" }}</td>
          <td class="py-2 px-4">{{ result.Year ?? "-" }}</td>
          <td class="py-2 px-4">{{ result.Type ?? "-" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
