<template>
<div>
  <!--  Make a button that will trigger a function to scrap an api endpoint -->
  <button class="btn btn-primary" @click="(scrap)">Scrap</button>

</div>
</template>

<script lang="ts" setup>

const scrap = async () => {
  const response = await fetch("https://api.jikan.moe/v4/anime/1");
  const data = await response.json();
  console.log(data);
};

</script>
