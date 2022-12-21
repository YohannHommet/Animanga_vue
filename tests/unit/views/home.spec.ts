import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import Home from "@/views/home.view.vue";

describe("home view", () => {
  it("renders properly",
    () => {
      const wrapper = mount(Home);

      expect(wrapper.vm).toBeTruthy();

    });
});
