<template>
<div class="col home_cards">
  <div class="card-cover h-100 p-4 overflow-hidden text-white home__cards">
    <div class="d-flex flex-column h-100 text-white text-shadow-1 justify-content-between">
      <h2 class="py-5 my-4 display-6 lh-1 fw-bold home__cards-title">{{ anime.title }}</h2>
      <ul class="d-flex list-unstyled mt-5 mb-0">
        <li class="d-flex align-items-center ms-auto">
          <router-link class="anime" :to="{ name: 'anime', params: { id: anime.id } }">{{ anime.title }}</router-link>
          <i id="next" class="fas fa-angle-double-right text-white"></i>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { IAnime } from "@/core/interfaces/anime.interface";

const props = defineProps<{
  anime: {
    type: IAnime,
    required: true
  };
}>();

console.log(props.anime);
</script>

<style scoped>
.card-cover {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
