import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Sweetalert2 from 'sweetalert2';
import { SWAL_OPTIONS } from '@/constants';

import store from '@/store';

import Main from '@/views/Main.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      title: '메인 화면',
    },
  },
  {
    path: '/create-game',
    name: 'CreateGame',
    component: () => import(
      /* webpackChunkName: "CreateGame" */
      // eslint-disable-next-line
      '@/views/CreateGame.vue'
    ),
    meta: {
      title: '🖼 새로운 게임 생성하기',
      illust: 'create-game.svg',
    },
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: () => import(
      /* webpackChunkName: "Leaderboard" */
      // eslint-disable-next-line
      '@/views/Leaderboard.vue'
    ),
    meta: {
      title: '🏆 리더보드 조회하기',
      illust: 'leaderboard.svg',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(
      /* webpackChunkName: "About" */
      // eslint-disable-next-line
      '@/views/About.vue'
    ),
    meta: {
      title: '📄 눈싸움에 대하여',
      illust: 'about.svg',
    },
  },
  {
    path: '/join-game/:roomKey',
    name: 'JoinGame',
    meta: {
      title: '게임에 참가하는 중',
    },
    beforeEnter: async (to, _, next) => {
      const { roomKey } = to.params;
      try {
        await store.dispatch('joinRoom', roomKey);
      } catch (err) {
        next({ path: '/' });

        const { $swal } = Vue.prototype;
        $swal('에러!', err.message, 'error');
        return;
      }
      next({ path: '/game' });
    },
  },
  {
    path: '/game',
    name: 'Game',
    meta: {
      title: '🎮 지금 게임 중!',
    },
    component: () => import(
      /* webpackChunkName: "Game" */
      // eslint-disable-next-line
      '@/views/Game.vue'
    ),
    beforeEnter: (to, _, next) => {
      if (!store.getters.isRoomInitialized) {
        next({ path: '/' });
        throw new Error('잘못된 접근입니다. 메인 페이지로 돌아갑니다.');
      }

      next();
    },
  },
  {
    path: '/game/finished',
    name: 'GameFinished',
    meta: {
      title: '😭 게임 끝 !',
    },
    component: () => import(
      /* webpackChunkName: "GameFinished" */
      // eslint-disable-next-line
      '@/views/GameFinished.vue'
    ),
  },
  {
    path: '*',
    name: '404Error',
    component: () => import(
      /* webpackChunkName: "ErrorPage" */
      // eslint-disable-next-line
      '@/views/404.vue'
    ),
    meta: {
      title: '페이지를 찾을 수 없습니다',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  const { title: pageTitle } = to.meta;
  if (pageTitle) {
    document.title = `The Eyes - ${pageTitle}`;
  } else {
    document.title = 'The Eyes';
  }

  next();
});

router.onError(async (err) => {
  Sweetalert2.fire({
    title: '에러!',
    text: err.message,
    icon: 'error',
    ...SWAL_OPTIONS,
  });
});
export default router;
