import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Home from "@/views/home.view.vue";

describe("Home", () => {
  it("should renders", () => {
    const wrapper = mount(Home);
    expect(wrapper.vm).toBeTruthy();
  });

  it("should be named home-view", function() {
    const wrapper = mount(Home);
    expect(wrapper.vm.$options.name).toBe("home-view");
  });

  it("should have an async function getTopAnimeList", function() {
    const wrapper = mount(Home);
    expect(wrapper.vm.getTopAnimeList).toBeInstanceOf(Function);
  });

});
