<template>
  <navbar position="fixed" type="warning" menu-classes="ml-auto">
    <template >
      <router-link v-popover:popover1 class="navbar-brand" to="/presentation">
      Beeline
      </router-link>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Пройдите тест до конца
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <drop-down tag="li" title="Нужна помошь!">
        <nav-link class="dropdown-item">
          <i class="now-ui-icons shopping_box"></i> Помошь
        </nav-link>
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';

export default {
  name: 'main-navbar',
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover
  }
};
</script>

<style scoped>

</style>
