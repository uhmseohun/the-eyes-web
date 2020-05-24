import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Component/Header', () => {
  it('Renders header properly', () => {
    const wrapper = shallowMount(Header, {
      mocks: { $route: { path: '/' } },
    });
    expect(wrapper.isVisible());
  });

  it('Highlighting selected item properly', () => {
    const wrapper = shallowMount(Header, {
      mocks: { $route: { path: '/creates-game' } },
    });
    const activeClass = '.header__routes__item-active';
    expect(wrapper.find(activeClass).exists());
  });
});
