<template>
<main id="home">
  <div v-if="isLoading">
    <img alt="loading" class="spinner" src="/spinner.gif">
  </div>
  <h1 class="anime_title">Top Anime list</h1>
  <ul v-if="!isLoading">
    <li v-for="anime in animeList" :key="anime.id">
      <router-link :to="{ name: 'anime', params: { animeId: +anime.id, animeTitle: slugify(anime.title) } }" class="anime">{{ anime.title }}
      </router-link>
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
        <router-link :to="{ name: 'anime', params: { animeId: +search.id, animeName: search.title } }" class="search">{{ search.title }}
        </router-link>
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
import { AnimeRepository } from "@/shared/repositories/anime.repository";
import type { IDataList } from "@/shared/interfaces/anime-list.interface";
import type { IAnime } from "@/shared/interfaces/anime.interface";
import type { IPagination } from "@/shared/interfaces/pagination.interface";

// Variables
const animeRepository: AnimeRepository = AnimeRepository.getInstance();
const isLoading = ref<Boolean>(false);
const animeList = ref<IAnime[]>();
const topPagination = ref<IPagination>();
const searchPagination = ref<IPagination>();
const animeSearch = ref<IAnime[]>();
const querySearch = ref("");

// Methods
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

async function getTopAnimeList(page: number = 1): Promise<void> {
  isLoading.value = true;

  const params = {
    page: page.toString()
  };
  const searchParams = new URLSearchParams(params);

  const { data, pagination }: IDataList<IAnime> = await animeRepository.getTopList(searchParams);
  animeList.value = data;
  topPagination.value = pagination;

  isLoading.value = false;
}

const search: () => Promise<void> = async () => {
  const params = {
    q: querySearch.value
  };
  const searchParams = new URLSearchParams(params);

  const { data, pagination }: IDataList<IAnime> = await animeRepository.getBySearch(searchParams);

  animeSearch.value = data;
  searchPagination.value = pagination;
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

<style lang="scss" scoped>
.anime {
  cursor: pointer;
  transition: 0.2s;
  color: var(--color-link);

  &:hover {
    color: var(--color-hover);
  }
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
}
</style>
