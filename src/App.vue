<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
<header>
  <div class="wrapper">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </div>
</header>

<router-view />
</template>

<style scoped>
  header {
    line-height: 1.5;
  }
  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    padding: 2rem 0;
  }

  nav a.router-link-exact-active {
    color: #000000;
  }

  nav a:visited {
    color: #4c4c4c;
  }

  nav a.router-link-exact-active:hover, nav a:hover {
    opacity: 0.8;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    color: #4c4c4c;
  }

  nav a:first-of-type {
    border: 0;
  }
</style>
