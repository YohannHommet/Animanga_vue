<template>
<navbar-component />

<div class="container">
  <slider-component />
  <router-view />
</div>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import SliderComponent from "@/components/slider.vue";
import NavbarComponent from "@/components/navbar.vue";</script>

<style lang="scss" scoped></style>
