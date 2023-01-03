<template>
<main id="home">

  <div v-if="isLoading" class="spinner_wrapper">
    <img alt="loading" class="spinner" src="/spinner.gif">
  </div>

  <h1 class="title">Top Anime list</h1>

  <div v-if="!isLoading" class="anime_cards">
    <div v-for="anime in animeList" :key="anime.id" class="anime_card">
      <img :src="anime.image" alt="anime image" class="anime_card__img">
      <div class="anime_card__content">
        <router-link :to="{ name: 'anime', params: { animeId: +anime.id, animeTitle: slugify(anime.title) } }" class="anime_card__title">
          {{ anime.title }}
        </router-link>
      </div>
    </div>

    <!-- pagination -->
    <div class="pagination">
      <button :disabled="topPagination?.current_page === 1" class="btn" type="button" @click="(prevPage)">Prev</button>
      <button :disabled="!topPagination?.has_next_page" class="btn" type="button" @click="(nextPage)">Next</button>
    </div>
  </div>


  <!--  <h2>Search for an Anime</h2> -->
  <!--  <form @submit.prevent="(search)"> -->
  <!--    <input v-model="querySearch" type="text"> -->
  <!--    <button type="submit" class="btn">Search</button> -->
  <!--  </form> -->

  <!--  <div class="anime__card"> -->
  <!--    <ul> -->
  <!--      <li v-for="search in animeSearch" :key="search.id"> -->
  <!--        <router-link :to="{ name: 'anime', params: { animeId: +search.id, animeName: search.title } }" class="search">{{ search.title }} -->
  <!--        </router-link> -->
  <!--      </li> -->
  <!--    </ul> -->
  <!--    &lt;!&ndash; pagination &ndash;&gt; -->
  <!--    <div class="pagination"> -->
  <!--      <button class="btn" @click="(prevPage)">Prev</button> -->
  <!--      <button class="btn" @click="(nextPage)">Next</button> -->
  <!--    </div> -->
  <!--  </div> -->

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
#home {

  .anime_cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 3rem;
    margin: 0 auto;

    .anime_card {
      width: 18%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;

      .anime_card__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .anime_card__content {
        position: absolute;
        visibility: hidden;
        bottom: 0;
        height: 0;
        width: 98%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 1rem;

        border: 1px solid rgba(255, 255, 255, 0.30);
        border-radius: 5% 5% 0% 0% / 5% 5% 0% 0%;

        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        transition: height 0.2s linear;

        .anime_card__title {
          color: var(--white);
          font-weight: bold;
          font-size: 1.8rem;
          text-decoration: none;

          &:hover {
            color: var(--white-soft);
            text-decoration: underline;
          }
        }
      }

      &:hover {
        .anime_card__content {
          height: 120px;
          visibility: initial;
        }
      }


    }

  }

  .spinner_wrapper {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    background-color: var(--white-soft);

    transform: translate(-50%, -50%);
  }
}
</style>
