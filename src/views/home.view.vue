<template>
<main id="home">
  <h1 class="anime_title">Top Anime list</h1>
  <ul>
    <li v-for="anime in animeList" :key="anime.id">
      <router-link class="anime" :to="{ name: 'anime', params: { animeId: anime.id } }">{{ anime.title }}</router-link>
    </li>
  </ul>
  <!--  Add pagination results -->
  <div class="pagination">
    <button class="btn btn-primary" @click="(prevPage)">Prev</button>
    <button class="btn btn-primary" @click="(nextPage)">Next</button>
  </div>

  <h2>Search for an Anime</h2>
  <form @submit.prevent="(search)">
    <input type="text" v-model="querySearch">
    <button type="submit">Search</button>
  </form>

  <div class="anime__card">
    <ul>
      <li v-for="search in animeSearch" :key="search.id">
        <router-link class="search" :to="{ name: 'anime', params: { animeId: search.id } }">{{ search.title }}</router-link>
      </li>
    </ul>
    <!--  Add pagination results -->
    <div class="pagination">
      <button class="btn btn-primary" @click="(prevPage)">Prev</button>
      <button class="btn btn-primary" @click="(nextPage)">Next</button>
    </div>
  </div>
</main>
</template>

<script lang="ts">
export default {
  name: "home-view",
}
</script>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AnimeRepository } from "@/shared/services/anime.repository";
import type { IDataList } from "@/core/interfaces/anime-list.interface";
import type { IAnime } from "@/core/interfaces/anime.interface";
import type { IPagination } from "@/core/interfaces/pagination.interface";

// Variables
const animeRepository: AnimeRepository = AnimeRepository.getInstance();
const animeList = ref<IAnime[]>();
const pagination = ref<IPagination>();
const animeSearch = ref<IAnime[]>();
const querySearch = ref("");

// Methods
const getAnimeList: () => Promise<void> = async () => {
  try {
    const response: IDataList<IAnime> = await animeRepository.getTopList();

    animeList.value = response.data;
    pagination.value = response.pagination;
  } catch (error) {
    console.error(error);
  }
};

const search: () => Promise<void> = async () => {
  try {
    const params = {
      q: querySearch.value,
    };
    const searchParams = new URLSearchParams(params);

    const response: IDataList<IAnime> = await animeRepository.getBySearch(searchParams);

    animeSearch.value = response.data;
    pagination.value = response.pagination;
  } catch (error) {
    console.error(error);
  }
};

const nextPage: () => Promise<void> = async () => {
  try {
    console.log("nextPage");
  } catch (error) {
    console.error(error);
  }
};

const prevPage: () => Promise<void> = async () => {
  try {
    console.log("prevPage");
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getAnimeList();
});
</script>

<style scoped>
.anime {
  cursor: pointer;
  transition: 0.2s;
}

.anime:hover {
  color: black;
  font-weight: bold;
}
</style>
