import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import TotoButton from '@/totoro/components/Button.vue';

describe('Component/TotoButton', () => {
  it('Renders button properly', () => {
    const wrapper = shallowMount(TotoButton);
    expect(wrapper.isVisible());
  });
});
