import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Home from "@/views/home.view.vue";

describe("Home", () => {

  it("should renders", () => {
    const wrapper = mount(Home, {
      global: {
        stubs: ["router-link"]
      }
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it("should be named home-view", function() {
    const wrapper = mount(Home, {
      global: {
        stubs: ["router-link"]
      }
    });
    expect(wrapper.vm.$options.name).toBe("home-view");
  });

});
