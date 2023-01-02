<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";</script>

<template>
<header id="header">
  <div class="wrapper">
    <nav class="header_nav">
      <router-link class="header_nav__link" to="/">Home</router-link>
      <router-link class="header_nav__link" to="/about">About</router-link>
      <router-link class="header_nav__link" to="/chat">Chat</router-link>
    </nav>
  </div>
</header>

<router-view />
</template>

<style lang="scss" scoped>
#header {
  line-height: 1.5;
}

.header_nav {
  width: 100%;
  text-align: center;
  padding: 2rem 0;

  .header_nav__link {
    display: inline-block;
    padding: 0 1rem;
    font-size: 1.8rem;
    text-decoration: none;
    border-left: 1px solid var(--color-border);

    &:first-child {
      border-left: none;
    }

    &:hover {
      color: var(--color-hover);
    }

    &:active {
      color: var(--color-link);
    }

    &:visited {
      color: var(--color-text);
    }

    &.router-link-exact-active:hover, &:hover {
      color: var(--color-hover);
    }

    &.router-link-exact-active {
      color: var(--color-hover);
    }
  }

}
</style>
