<template>
<main id="anime">
  <h1>{{ anime.title }}</h1>
  <div class="anime__card">
    <div class="anime__card_img">
      <img :src="anime.images?.webp?.image_url || ``" alt="anime image" >
    </div>
    <div class="anime__card_description">
      <p>{{ anime.synopsis }}</p>
    </div>
  </div>

</main>
</template>

<script setup lang="ts">
// Get the id from the route
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
.anime__card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  margin: 1rem 0;
  padding: 1rem;
}

.anime__card_img {
  padding: 1rem;
  width: 30%;
}

.anime__card_img img {
  height: 100%;
}

.anime__card_description {
  padding: 1rem;
  width: 70%;
}
</style>
