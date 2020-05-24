import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

describe('Component/Footer', () => {
  it('Renders footer properly', () => {
    const wrapper = shallowMount(Footer);
    expect(wrapper.isVisible());
  });
});
