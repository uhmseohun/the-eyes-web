import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import TotoInput from '@/totoro/components/Input.vue';

describe('Component/TotoInput', () => {
  it('Renders text field properly', () => {
    const wrapper = shallowMount(TotoInput);
    expect(wrapper.isVisible());
  });
});
