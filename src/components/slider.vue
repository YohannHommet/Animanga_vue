<template>
<div ref="slider" class="blaze-slider">
  <div class="blaze-container">
    <div class="blaze-track-container">
      <div class="blaze-track">
        <div class="blaze_img">
          <img alt="img" aria-description="image" src="https://picsum.photos/id/276/1280/450">
        </div>
        <div class="blaze_img">
          <img alt="img" aria-description="image" src="https://picsum.photos/id/543/1280/450">
        </div>
        <div class="blaze_img">
          <img alt="img" aria-description="image" src="https://picsum.photos/id/823/1280/450">
        </div>
      </div>
    </div>

    <!-- putting nav buttons and pagination in a custom structure -->
    <div class="slider_pagination">
      <button aria-label="Go to previous slide" class="blaze-prev btn">&laquo;</button>
      <div class="blaze-pagination"></div>
      <button aria-label="Go to next slide" class="blaze-next btn">&raquo;</button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
export default {
  name: "slider-component"
};
</script>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import BlazeSlider from "blaze-slider";
import "blaze-slider/dist/blaze.css";

const slider = ref<HTMLElement | null>(null);

onMounted(() => {
  new BlazeSlider(slider.value as HTMLElement, {
      all: {
        // layout
        slidesToShow: 1,
        slidesToScroll: 1,
        slideGap: "20px",
        // loop
        loop: true,
        // autoplay
        enableAutoplay: true,
        stopAutoplayOnInteraction: true,
        autoplayInterval: 5000,
        autoplayDirection: "to left",
        // pagination
        enablePagination: true,
        // transition
        transitionDuration: 800,
        transitionTimingFunction: "ease"
      }
    }
  );
});
</script>

<style lang="scss" scoped>
.blaze-slider .blaze-container {

  .blaze_img {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .slider_pagination {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      margin: 0 1rem;
      padding: 0;
      font-size: 3rem;
      border: none;
      box-shadow: none;
      cursor: pointer;
      transform: translateY(-2px);
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: #333;
      }
    }

    .blaze-pagination {
      display: flex;
      justify-content: center;
      align-items: center;

      ::v-deep button {
        height: 10px;
        width: 10px;
        padding: 0;
        margin: 0 0.5rem;
        background: var(--color-text);
        border: none;
        border-radius: 50%;
        color: #0000;
        cursor: pointer;
        outline: 0;
        transition: transform .2s, background .3s;

        &.active {
          background-color: var(--color-link);
          border-color: var(--color-link);
          transform: scale(1.2);
        }
      }
    }

  }
}
</style>
