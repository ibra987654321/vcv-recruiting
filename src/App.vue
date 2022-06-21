<template>
  <div id="app">
    <router-view name="header" />
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
    <modalvcv/>
  </div>
</template>
<script>
import modalvcv from './pages/components/Modal'
export default {
  components: {
    modalvcv,
  }
};
</script>
<style>
#app {
}
</style>
