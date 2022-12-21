<template>
<main id="home">
  <h1 class="anime_title">Top Anime list</h1>
  <ul>
    <li v-for="anime in animeList" :key="anime.id">
      <router-link :to="{ name: 'anime', params: { animeId: anime.id } }" class="anime">{{ anime.title }}</router-link>
    </li>
  </ul>
  <!-- pagination -->
  <div class="pagination">
    <button :disabled="topPagination?.current_page === 1" class="btn btn-primary" @click="(prevPage)">Prev</button>
    <button :disabled="!topPagination?.has_next_page" class="btn btn-primary" @click="(nextPage)">Next</button>
  </div>

  <h2>Search for an Anime</h2>
  <form @submit.prevent="(search)">
    <input v-model="querySearch" type="text">
    <button type="submit">Search</button>
  </form>

  <div class="anime__card">
    <ul>
      <li v-for="search in animeSearch" :key="search.id">
        <router-link :to="{ name: 'anime', params: { animeId: search.id } }" class="search">{{ search.title }}</router-link>
      </li>
    </ul>
    <!-- pagination -->
    <div class="pagination">
      <button class="btn btn-primary" @click="(prevPage)">Prev</button>
      <button class="btn btn-primary" @click="(nextPage)">Next</button>
    </div>
  </div>
</main>
</template>

<script lang="ts">
export default {
  name: "home-view"
};
</script>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { AnimeRepository } from "@/shared/services/anime.repository";
import type { IDataList } from "@/core/interfaces/anime-list.interface";
import type { IAnime } from "@/core/interfaces/anime.interface";
import type { IPagination } from "@/core/interfaces/pagination.interface";

// Variables
const animeRepository: AnimeRepository = AnimeRepository.getInstance();
const animeList = ref<IAnime[]>();
const topPagination = ref<IPagination>();
const searchPagination = ref<IPagination>();
const animeSearch = ref<IAnime[]>();
const querySearch = ref("");


// Methods
async function getTopAnimeList(page: number = 1) {
  const params = {
    page: page.toString()
  };
  const searchParams = new URLSearchParams(params);
  try {
    const { data, pagination }: IDataList<IAnime> = await animeRepository.getTopList(searchParams);
    animeList.value = data;
    topPagination.value = pagination;
  } catch (error) {
    console.error(error);
  }
}

const search: () => Promise<void> = async () => {
  const params = {
    q: querySearch.value
  };
  const searchParams = new URLSearchParams(params);

  try {
    const { data, pagination }: IDataList<IAnime> = await animeRepository.getBySearch(searchParams);

    animeSearch.value = data;
    searchPagination.value = pagination;
  } catch (error) {
    console.error(error);
  }
};

const nextPage: () => Promise<void> = async () => {
  if (!topPagination.value?.has_next_page) return;

  const nextPage = topPagination.value?.current_page + 1;
  await getTopAnimeList(nextPage);
};

const prevPage: () => Promise<void> = async () => {
  if (!topPagination.value) return;
  if (topPagination.value.current_page === 1) return;

  const prevPage = topPagination.value.current_page - 1;
  await getTopAnimeList(prevPage);
};

onMounted(() => {
  getTopAnimeList();
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
