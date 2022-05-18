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
        Рекрутинг
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
          :to="{ name: 'landing', hash: '#have-to' }"
          class="nav-link"
        >
          <i class="now-ui-icons design_app"></i>
          <p>Что у тебя будет?</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'landing', hash: '#need-know' }"
          class="nav-link"
        >
          <i class="now-ui-icons business_briefcase-24"></i>
          <p>Что нужно делать?</p>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'landing', hash: '#contact' }"
          class="nav-link"
        >
          <i class="now-ui-icons ui-1_email-85"></i>
          <p>Контакты</p>
        </router-link>
      </li>
      <drop-down
        tag="li"
        title="Examples"
        icon="now-ui-icons design_image"
        class="nav-item"
      >
        <nav-link to="/landing">
          <i class="now-ui-icons education_paper"></i> Landing
        </nav-link>
        <nav-link to="/login">
          <i class="now-ui-icons users_circle-08"></i> Login
        </nav-link>
        <nav-link to="/profile">
          <i class="now-ui-icons users_single-02"></i> Profile
        </nav-link>
        <nav-link to="/testing">
          <i class="now-ui-icons users_single-02"></i> Testing
        </nav-link>
      </drop-down>

      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Follow us on Twitter"
          data-placement="bottom"
          href="https://twitter.com/CreativeTim"
          target="_blank"
        >
          <i class="fab fa-twitter"></i>
          <p class="d-lg-none d-xl-none">Twitter</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Like us on Facebook"
          data-placement="bottom"
          href="https://www.facebook.com/CreativeTim"
          target="_blank"
        >
          <i class="fab fa-facebook-square"></i>
          <p class="d-lg-none d-xl-none">Facebook</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Follow us on Instagram"
          data-placement="bottom"
          href="https://www.instagram.com/CreativeTimOfficial"
          target="_blank"
        >
          <i class="fab fa-instagram"></i>
          <p class="d-lg-none d-xl-none">Instagram</p>
        </a>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";

export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover,
  },
  data:() => ({
  })
};
</script>

<style scoped>
.navbar {
  font-size: 16px;
}
</style>
