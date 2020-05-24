import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import KakaoSendButton from '@/components/KakaoSendButton.vue';

describe('Component/KakaoSendButton', () => {
  it('Renders button properly', () => {
    const wrapper = shallowMount(KakaoSendButton);
    expect(wrapper.text()).to.include('카카오톡으로 전송하기');
  });

  it('Emit click event properly', () => {
    const wrapper = shallowMount(KakaoSendButton);
    wrapper.trigger('click');
    expect(wrapper.emitted()).haveOwnProperty('click');
  });
});
