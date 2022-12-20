import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Home from "@/views/home.vue";

describe('home view', () => {
  it('renders properly', () => {
    const wrapper = mount(Home)

    // Check that the component is mounted
    expect(wrapper.vm).toBeTruthy()
  })
})
