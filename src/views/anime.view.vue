<template>
<main id="anime">
  <h1 class="anime_title">{{ anime.title }}</h1>
  <div class="anime_card">
    <div class="anime_card__img">
      <img :src="anime.image" alt="anime image">
    </div>
    <div class="anime_card__description">
      <p>{{ anime.synopsis }}</p>
    </div>
  </div>
</main>
</template>

<script lang="ts">
export default {
  name: "anime-view"
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";

import { IAnime } from "@/core/interfaces/anime.interface";
import { AnimeRepository } from "@/shared/services/anime.repository";

const animeRepository: AnimeRepository = AnimeRepository.getInstance();
const route: RouteLocationNormalizedLoaded = useRoute();
const anime = ref<IAnime>();
const id = ref(route.params.animeId);

const getAnime: (id?: string) => Promise<void> = async () => {
  try {
    anime.value = await animeRepository.getById(+id.value);
  } catch (error) {
    console.error(error);
  }
};

getAnime();
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
  padding: 0.6rem;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);

  border-radius: 3px;
}

.anime_card__img img {
  height: 100%;
  border-top-left-radius: 10px;
}

.anime_card__description {
  padding: 1.2rem;
}
</style>
