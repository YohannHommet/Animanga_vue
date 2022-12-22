<template>
<main id="anime">
  <h1 class="anime_title">{{ anime?.title }}</h1>
  <div class="anime_card">
    <div class="anime_card__img">
      <img :alt="anime?.title" :src="anime?.image" @click="showOverlay = !showOverlay">
    </div>
    <div class="anime_card__description">
      <p>{{ anime?.synopsis }}</p>
    </div>
  </div>
  <div v-if="showOverlay" class="overlay_container">
    <img :alt="anime?.title" :src="anime?.image" class="overlay_image" @click="showOverlay = !showOverlay">
  </div>
</main>
</template>

<script lang="ts">
export default {
  name: "anime-view"
};
</script>

<script lang="ts" setup>
import { defineProps } from "vue";
import { ref } from "vue";
import { AnimeRepository } from "@/shared/services/anime.repository";
import type { IAnime } from "@/core/interfaces/anime.interface";

const props = defineProps<{
  animeId: {
    type: string;
    required: true;
  };
}>();

const animeRepository: AnimeRepository = AnimeRepository.getInstance();
const anime = ref<IAnime>();
const showOverlay = ref<Boolean>(false);

const getAnime: () => Promise<void> = async () => {
  try {
    anime.value = await animeRepository.getById(+props.animeId);
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

.overlay_container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay_image {
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
}

.anime_card__img {
  height: 200px;
  padding: 0.6rem;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);

  border-radius: 3px;
}

.anime_card__img img {
  height: 100%;
  border-radius: 5px;
}

.anime_card__description {
  padding: 1.2rem;
}
</style>
