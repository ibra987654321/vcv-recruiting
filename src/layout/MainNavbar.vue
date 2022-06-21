<template>
  <navbar
    position="fixed"
    type="warning"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
    class="navbar"
  >
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        <img src="https://beeline.kg/binaries/content/gallery/mainsite/footer-logo/beeline_logo.svg" alt="">
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Designed by Invision. Coded by Creative Tim
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <router-link
          :to="{ name: 'landing', hash: '#about-us' }"
          class="nav-link"
        >
          <p>О Нас</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'landing', hash: '#advantages' }"
          class="nav-link"
        >
<!--          <i class="now-ui-icons business_briefcase-24"></i>-->
          <p>Наши преимущества</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'landing', hash: '#teams' }"
          class="nav-link"
        >
<!--          <i class="now-ui-icons ui-1_email-85"></i>-->
          <p>Команды</p>
        </router-link>
      </li>
      <li>
        <router-link class="nav-link"  :to="{ name: 'login' }">
          <n-button
              class="bg-light"
              style="
                  width: 123px;
                  height: 39px;
                  color: black;
                  font-weight: bold; font-size: 14px; border-radius: 10px
"
          >Войти</n-button>
        </router-link>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink, Button } from "@/components";
import { Popover } from "element-ui";

export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    // DropDown,
    Navbar,
    [Button.name]: Button,
    [Popover.name]: Popover,
  },
  data:() => ({
  }),
};
</script>

<style scoped>
.navbar {
  margin: 10px;
  border-radius: 20px;
  max-height: 50px;
  background-color: #ffcd33 !important;;
}
.nav-item {
  display: flex ;
  align-items: center;
}
@media (max-width: 768px) {
  .navbar {
    width: 90%;
  }
}
.navbar-brand img {
  width: 100%;
}
.nav-link {
  text-transform: none !important;
  color: black !important;
}
.nav-link p {
  font-size: 15px;
}
.navbar {
  font-size: 16px;
}
</style>
