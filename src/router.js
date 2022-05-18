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

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/landing",
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
      components: {default: Profile, footer: MainFooter},
      props: {
        header: {colorOnScroll: 100},
        footer: {backgroundColor: "black"},
      },
    },
    {
      path: "/testing",
      name: "testing",
      components: { default: Testing,header: StarterNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 100 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/video",
      name: "video",
      components: { default: Video,header: StarterNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 100 },
        footer: { backgroundColor: "black" },
      },
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
