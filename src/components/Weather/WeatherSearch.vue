<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      @input="getSearchResults"
      placeholder="Search for a city or state"
      class="search-bar"
    />
    <ul v-if="searchResults" class="city-container">
      <p class="error" v-if="searchError">
        Sorry, something went wrong, please try again.
      </p>
      <p class="error" v-if="!searchError && searchResults.length === 0">
        No results match your query, try a different term.
      </p>
      <template v-else>
        <li
          v-for="searchResult in searchResults"
          :key="searchResult.id"
          @click="getCity(searchResult.name)"
          class="city"
        >
          {{ searchResult.name }}, {{ searchResult.country }}
        </li>
      </template>
    </ul>
  </div>
  <div v-if="city !== ''">
    <Suspense>
      <WeatherData :city="city" />
    </Suspense>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, Suspense } from "vue";

import WeatherData from "./WeatherData.vue";

const APIKey = "11248aa345d4458b96283937251505";
const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResults = ref(null);
const searchError = ref(null);
const city = ref("");

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${APIKey}&q=${searchQuery.value}`
        );
        searchResults.value = result.data;
      } catch {
        searchError.value = true;
      }
      return;
    }
    searchResults.value = null;
  }, 300);
};

const getCity = (searchResult) => {
  city.value = searchResult;
  searchResults.value = null;
  searchQuery.value = "";
};
</script>

<style scoped>
.search-bar {
  width: 100%;
  font-size: 24px;
  padding: 6px;
  border-radius: 6px;
  margin: 10px;
}

.search-bar:focus {
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
  outline: none;
}

.city-container {
  margin: 0px 10px 10px 10px;
  width: 100%;
  border-radius: 6px;
}

.city {
  background-color: rgba(24, 134, 121, 0.7);
  padding: 10px;
  list-style: none;
  font-size: 24px;
  cursor: pointer;
}

.error {
  font-size: 24px;
}
</style>
