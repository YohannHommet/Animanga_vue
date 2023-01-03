<template>
<div ref="slider" class="blaze-slider">
  <div class="blaze-container">
    <div class="blaze-track-container">
      <div class="blaze-track">
        <div class="blaze_img">
          <img src="https://picsum.photos/id/276/1280/450" alt="img" aria-description="image">
        </div>
        <div class="blaze_img">
          <img src="https://picsum.photos/id/543/1280/450" alt="img" aria-description="image">
        </div>
        <div class="blaze_img">
          <img src="https://picsum.photos/id/823/1280/450" alt="img" aria-description="image">
        </div>
      </div>
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

<style scoped lang="scss">
.blaze_img {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
