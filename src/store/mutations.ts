import { State } from '@/interfaces';

export default {
  setRoomKey: (state: State, key: string): void => {
    state.roomKey = key;
  },
};
