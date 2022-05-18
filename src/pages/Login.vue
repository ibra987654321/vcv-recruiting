<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image: url('img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt="" />
            </div>

            <fg-input
                :disabled="$store.state.loading"
                v-model="form.username"
              class="no-border input-lg"
              placeholder="Почта"
                :class="{'has-danger': ($v.form.username.$dirty && !$v.form.username.required) || ($v.form.username.$dirty && !$v.form.username.email)} "
                :error="
                    ($v.form.username.$dirty && !$v.form.username.required) ? 'Заполните поле' :
                    ($v.form.username.$dirty && !$v.form.username.email) ? `Напишите правильную почту. Например @.mail.ru` : null"
            >
            </fg-input>

            <fg-input
                :disabled="$store.state.loading"
                type="number"
                v-model="form.password"
                class="no-border input-lg"
                placeholder="Код"
                :class="{'has-danger': ($v.form.password.$dirty && !$v.form.password.required) || ($v.form.password.$dirty && !$v.form.password.minLength)} "
                :error="
                    ($v.form.password.$dirty && !$v.form.password.required) ? 'Заполните поле' :
                    ($v.form.password.$dirty && !$v.form.password.minLength) ? `Поле не должно быть меньше 3 цифр. Сейчас он ${form.password.length}` : null"
            >
            </fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <a
                  @click="submitHandler"
                  class="btn btn-warning btn-round btn-lg btn-block"
                  >
                <div v-if="!$store.state.loading">Войти</div>
                  <div v-if="$store.state.loading" class="spinner-border text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </a>
              </div>

            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from '@/components';
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  validations: {
    form: {
      username: {email, required},
      password: {required, minLength: minLength(4)}
    }
  },
  data:() => ({
    form: {
      username: '',
      password: ''
    }
  }),
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      await this.$store.dispatch('login', this.form)
    }
  }
};
</script>
<style></style>
