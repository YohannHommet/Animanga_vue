<template>
  <div class="blaze-slider">
    <div class="blaze-container">
      <div class="blaze-track-container">
        <div class="blaze-track">
          <div class="slider-img">1</div>
          <div class="slider-img">2</div>
          <div class="slider-img">3</div>
          <div class="slider-img">4</div>
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
import { onMounted } from "vue";
import BlazeSlider from "blaze-slider";
import "blaze-slider/dist/blaze.css";

onMounted(() => {
  const sliderElement = document.querySelector<HTMLElement>(".blaze-slider") as HTMLElement;

  new BlazeSlider(sliderElement, {
      all: {
        enableAutoplay: true,
        autoplayInterval: 5000,
        transitionDuration: 800,
        slidesToShow: 1
      }
    }
  );
});
</script>

<style scoped>
.slider-img {
  width: 100%;
  height: 100%;
  background-color: red;
  padding: 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}
</style>
