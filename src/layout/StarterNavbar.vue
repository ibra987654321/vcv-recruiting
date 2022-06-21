<template>
  <navbar position="fixed" type="warning" class="navbar" menu-classes="ml-auto">
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        <img src="https://beeline.kg/binaries/content/gallery/mainsite/footer-logo/beeline_logo.svg" height="26" alt="">
      </router-link>
      <el-popover
          ref="popover1"
          popper-class="popover"
          placement="bottom"
          width="200"
          trigger="hover"
      >
        <div class="popover-body">
          При нажатии перейдешь на главную
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        Главная страница
      </router-link>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';

export default {
  name: 'main-navbar',
  components: {
    // DropDown,
    Navbar,
    // NavLink,
    [Popover.name]: Popover
  }
};
</script>

<style scoped>
.navbar {
  background-color: #ffcd33 !important;;
}
</style>
