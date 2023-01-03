<template>
<main id="about">
  <h1>About</h1>
  <p>About is a collection of information about the site. It is a work in progress.</p>

  <slider-component />

</main>
</template>

<script lang="ts">
export default {
  name: "about-view",
};
</script>

<script setup lang="ts">

import SliderComponent from "@/components/slider.vue";
</script>

<style lang="scss" scoped></style>
