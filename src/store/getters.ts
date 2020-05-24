import { State } from '@/interfaces';

export default {
  isRoomInitialized:
    (state: State) => state.roomKey !== null,
};
