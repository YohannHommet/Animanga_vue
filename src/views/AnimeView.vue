<template>
<main id="anime">
  <h1 class="anime_title">{{ anime.title }}</h1>
  <div class="anime_card">
    <div class="anime_card__img">
      <img :src="anime.images?.webp?.image_url || ``" alt="anime image" >
    </div>
    <div class="anime_card__description">
      <p>{{ anime.synopsis }}</p>
    </div>
  </div>

</main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";

const anime = ref<any>({});
const route: RouteLocationNormalizedLoaded = useRoute();

const getAnime = async () => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${route.params.id}`);
    const jsonResponse = await response.json();
    anime.value = jsonResponse.data;
    console.log(anime.value);
  } catch (error) {
    console.error(error);
  }
};

// on mounted, get the anime
onMounted(() => {
  getAnime();
});

</script>

<style scoped>
.anime_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}

.anime_card__img {
  height: 200px;
  padding: 1rem;
  border: 1px solid var(--text-color);
  border-radius: 3px;
}

.anime_card__img img {
  height: 100%;
}

.anime_card__description {
  padding: 1.2rem;
}
</style>
