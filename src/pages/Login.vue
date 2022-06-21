<template>
  <div class="page-header " >
    <div
      class="page-header-image"
      style="background-image: url('img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" class=" p-3" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/logo.svg'" alt="" />
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
                  class="btn btn-warning btn-round btn-lg btn-block d-flex align-items-center justify-content-center"
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
<!--  <div class="content">-->
<!--    <div class="container">-->
<!--      <div class="row">-->
<!--        <div class="col-md-6">-->
<!--          <img v-lazy="'img/login-bg.svg'" alt="Image" class="img-fluid">-->
<!--        </div>-->
<!--        <div class="col-md-6 contents">-->
<!--          <div class="row justify-content-center">-->
<!--            <div class="col-md-8">-->
<!--              <div class="mb-4">-->
<!--                <h3>Авторизация</h3>-->
<!--                <p class="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p>-->
<!--              </div>-->
<!--              <form action="#" method="post">-->
<!--                <div class="form-group first">-->
<!--                  <label for="username">Username</label>-->
<!--                  <input type="text" class="form-control" id="username">-->

<!--                </div>-->
<!--                <div class="form-group last mb-4">-->
<!--                  <label for="password">Password</label>-->
<!--                  <input type="password" class="form-control" id="password">-->

<!--                </div>-->

<!--                <div class="d-flex mb-5 align-items-center">-->
<!--                  <span class="ml-auto"><a href="#" class="forgot-pass">Забыли пароль</a></span>-->
<!--                </div>-->

<!--                <n-button color="black" fz="18px" font="bold" class="btn btn-block btn-primary">Войти</n-button>-->

<!--              </form>-->
<!--            </div>-->
<!--          </div>-->

<!--        </div>-->

<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>
<script>
import { Card, Button, FormGroupInput } from '@/components';
import { email, required, minLength } from 'vuelidate/lib/validators'
import NButton from "@/components/Button";
export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    // NButton,
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
  mounted() {
    this.escapeRegExp()
    this.$store.state.loading = false
  },
  methods: {
    escapeRegExp(){
      const url = this.$route.fullPath
      const re = /%40/gi;
      const email = url.split("?")[1];
      const emailInPath = email.replace(re, '@')
      this.form.username = emailInPath
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      await this.$store.dispatch('login', this.form)
    },

  }
};
</script>
<style scoped>
.page-header {
  background-image: url("../../public/img/job.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
