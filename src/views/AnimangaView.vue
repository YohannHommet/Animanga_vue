<template>
<main id="animanga">
  <h1>Animanga</h1>
  <p>Animanga is a collection of anime and manga. It is a work in progress.</p>

  <h2>Animanga List</h2>
  <ul>
    <li v-for="anime in topAnime" :key="anime.mal_id" @click="searchAnime = anime">
      <span class="anime" @click="searchAnime = anime">{{ anime.title }}</span>
      <router-link :to="{ name: 'anime', params: { id: anime.mal_id } }">See more</router-link>
    </li>
  </ul>

  <h2>Search</h2>
  <form @submit.prevent="(search)">
    <input type="text" v-model="searchQuery" >
    <button type="submit">Search</button>
  </form>

  <h2>Search Result</h2>
  <div class="anime__card">
    <h2>{{ searchAnime.title }}</h2>
    <img :src="searchAnime.images?.webp?.image_url || ``" alt="anime image" >
    <p>{{ searchAnime.synopsis }}</p>
  </div>
</main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const topAnime = ref<any[]>([]);
const searchAnime = ref<any>({});
const searchQuery = ref('');

const getTopAnime = async () => {
  try {
    const response = await fetch('https://api.jikan.moe/v4/top/anime');
    const jsonResponse = await response.json();
    topAnime.value = jsonResponse.data;
    console.log(topAnime.value);
  } catch (error) {
    console.error(error);
  }
};

const search = async () => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery.value}&type=tv`);
    const jsonResponse = await response.json();
    searchAnime.value = jsonResponse.data[0];
  } catch (error) {
    console.error(error);
  }
};

// on mounted, get the top anime list
onMounted(() => {
  getTopAnime();
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
