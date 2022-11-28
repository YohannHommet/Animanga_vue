<template>
<main id="animanga">
  <h1 class="anime_title">Top Anime list</h1>
  <ul>
    <li v-for="anime in animeList" :key="anime.id">
      <router-link class="anime" :to="{ name: 'anime', params: { id: anime.id } }">{{ anime.title }}</router-link>
    </li>
  </ul>

  <h2>Search for an Anime</h2>
  <form @submit.prevent="(search)">
    <input type="text" v-model="querySearch" >
    <button type="submit">Search</button>
  </form>

  <div class="anime__card">
    <h3>{{ animeSearch.title }}</h3>
    <img  v-if="animeSearch.images" :src="animeSearch.images?.webp?.image_url || ``" alt="anime image" >
    <p>{{ animeSearch.synopsis }}</p>
  </div>
</main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { AnimeRepository } from "@/shared/services/AnimeRepository";
import { AnimeModel } from "@/core/models/Anime.model";

// Variables
const animeRepository: AnimeRepository = AnimeRepository.getInstance();
const animeList = ref<AnimeModel[]>([]);
const animeSearch = ref<any>({});
const querySearch = ref('');

// Methods
const getAnimeList: () => Promise<void> = async () => {
  try {
    animeList.value = await animeRepository.getAnimeList('anime')
  } catch (error) {
    console.error(error);
  }
};

const search: () => Promise<void> = async () => {
  try {
    const response = await animeRepository.getAnimeSearch('anime', querySearch.value, []);
    animeSearch.value = response.data.data[0];
  } catch (error) {
    console.error(error);
  }
};

// on mounted, get the top anime list
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
