<template>
  <modal
      :show.sync="$store.state.modals.mini"
      :class="success ? 'modal-warning' : 'modal-primary'"
      :show-close="false"
      headerClasses="justify-content-center"
      type="mini"
  >
    <div slot="header" class="modal-profile">
      <i class="now-ui-icons users_circle-08"></i>
    </div>
    <p>{{ $store.state.modals.text }}</p>
    <template slot="footer">
      <n-button type="neutral" link @click.native="$store.state.modals.mini = false"
      >Закрыть</n-button>
      <n-button v-if="$store.state.modals.action !== ''" type="neutral" link @click="$store.state.modals.action">Войти</n-button>
    </template>
  </modal>
</template>
<script>
import {Button, Modal} from '@/components';
export default {
  name: 'modalvcv',
  components: {
    Modal,
    [Button.name]: Button,
  },
  computed: {
      success() {
        return this.$store.state.modals.type.success
      },
      error() {
        return this.$store.state.modals.type.error
      },
  }
};
</script>
