import Vue from "vue";
import Router from "vue-router";
import Index from "./pages/Index.vue";
import Landing from "./pages/Landing.vue";
import Login from "./pages/Login.vue";
import Profile from "./pages/Profile.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";
import Testing from "@/pages/Testing";
import StarterNavbar from "@/layout/StarterNavbar";
import Video from "@/pages/Video";
import {getToken, parseJwt, removeToken} from "@/helpers/helpers";

Vue.use(Router);

const routes = [
    {
      path: "/index",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 300 },
        footer: { backgroundColor: "ffcd33" },
      },
    },
    {
      path: "/login",
      name: "login",
      components: { default: Login },
      props: {
        header: { colorOnScroll: 400 },
      },
    },
    {
      path: "/profile",
      name: "profile",
      meta: {auth: true},
      components: {default: Profile, header: StarterNavbar, footer: MainFooter},
      props: {
        header: {colorOnScroll: 100},
        footer: {backgroundColor: "black"},
      },
    },
    {
      path: "/testing",
      name: "testing",
      meta: {auth: true},
      components: { default: Testing,header: StarterNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 100 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/video",
      name: "video",
      meta: {auth: true},
      components: { default: Video,header: StarterNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 100 },
        footer: { backgroundColor: "black" },
      },
    },
  ]

  const router = new Router({
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: (to) => {
      if (to.hash) {
        return { selector: to.hash };
      } else {
        return { x: 0, y: 0 };
      }
    },
  })
    if (getToken()) {
      const exp = parseJwt(getToken()).exp
      const cur = Math.floor(Date.now() / 1000)
      if (cur >= exp) {
        removeToken()
      }
    }

  router.beforeEach((to, from, next) => {
    const requireAuth = to.matched.some(record => record.meta.auth)
    const currentUser = getToken()

    if (requireAuth && !currentUser) {
      next('/login')
    } else {
      next()
    }
  })


export default router


