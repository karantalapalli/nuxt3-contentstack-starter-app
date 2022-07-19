import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/index.vue';
import Page from './pages/[page].vue';
import Blog from './pages/blog/index.vue';
import BlogPost from './pages/blog/[blog].vue';
import NotFound from './components/PageNotFound.vue';

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    routes: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/:page',
        component: Page,
      },
      {
        path: '/blog',
        component: Blog,
      },
      {
        path: '/blog/:slug',
        component: BlogPost,
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
      },
    ],
    fallback: false,
  })
}
