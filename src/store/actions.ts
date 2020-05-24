import { ActionContext } from 'vuex';
import { State } from '@/interfaces';
import Vue from 'vue';

export default {
  createRoom: async ({ commit }: ActionContext<State, State>, roomName: string) => {
    const timestamp = new Date().getTime();
    const roomKey = roomName + String(timestamp);
    commit('setRoomKey', roomKey);

    const { $io } = Vue.prototype;
    $io.emit('joinRoom', roomKey);

    return roomKey;
  },

  joinRoom: async ({ commit }: ActionContext<State, State>, roomKey: string) => {
    const { $api, $io } = Vue.prototype;

    const { data: { members } } = await $api.get(`/room/${roomKey}/members`);

    if (members === undefined) throw new Error('존재하지 않는 방입니다.');
    if (members.length > 1) throw new Error('이미 꽉 찬 방입니다.');

    $io.emit('joinRoom', roomKey);
    commit('setRoomKey', roomKey);
  },
};
