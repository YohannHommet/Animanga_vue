<template>
  <header id="header">
    <div class="wrapper">
      <nav class="nav">
        <router-link class="nav_link" to="/">Home</router-link>
        <router-link class="nav_link" to="/about">About</router-link>
        <router-link class="nav_link" to="/chat">Chat GPT</router-link>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: "navbar-component"
};
</script>

<style lang="scss" scoped>
#header {
  line-height: 1.5;

  .nav {
    width: 100%;
    text-align: center;
    padding: 2rem 0;

    .nav_link {
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
}
</style>
