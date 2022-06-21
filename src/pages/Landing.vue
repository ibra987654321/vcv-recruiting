<template>
  <div class="body-mini">
      <div class="section bg-transparent section-about-us">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-6 my-auto">
              <h2 class="title">А ты готов раскрыть свой потенциал?</h2>
              <div class=" text-dark rounded p-2 opacity">
                <p>
                  Стать детективом, легко! Быть гуру психологии?! Проще простого!
                  Оратором, готово! Проводником? Реально легко! Приходи работать в
                  Контакт центр Beeline.
                </p>
              </div>
              <n-button
                  style="
                  width: 166px;
                  height: 57px;
                  background-color: #ffcd33;
                  color: black;
                  font-weight: bold; font-size: 16px; border-radius: 10px"
                  block
              >Вакансии</n-button>
            </div>
            <div class="col-lg-6">
              <header-pictures class="w-100"></header-pictures>
            </div>
          </div>
        </div>
      </div>
    <div id="about-us" class="section section-about-us">
      <div class="container">
        <div class="row">
          <div class="col-md-4 " v-for="i in this.$store.state.candidateType" :key="i.id">
            <div class="card">
              <img :src="image" class="card-img-top" >
              <div class="card-body">
                <h5 class="card-title">{{i.candidateType}}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <n-button  block color="#000" fz="14px" class="card-link" @click="navigate(i.id)">Откликнутся</n-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="video" class="section section-video bg-light">
      <div class="container">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/AsRIHD9oSsk" allowfullscreen></iframe>
        </div>
      </div>
    </div>
    <div id="advantages" class="section advantages">
      <div class="container">
        <h2>Наши преимущества</h2>
        <div class="row">
          <div class="col-md-4" v-for="i in 3" :key="i">
            <div class="card d-flex align-items-center p-3">
              <img :src="advanced[i - 1]" class="card-img-top w-25" >
              <div class="card-body text-center">
                <h5 class="card-title font-weight-bold">Наши преимущества {{i}}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="teams" class="section bg-light">
      <div class="container">
        <h2>Наша команда</h2>

        <div class="team_sliders">
          <div class="slides">
            <transition-group
                name="slide"
                mode="out-in"
                enter-class="slide-in"
                leave-class="slide-out"
                enter-active-class="animated slide-in-active"
                leave-active-class="animated slide-out-active"
            >
              <div
                  v-for="index in slides"
                  v-show="index == active"
                  :key="index"
                  :class="index == active ? 'd-flex justify-content-center' : ''"
              >
                <img class="w-75" :src="slider" alt="">
              </div>
            </transition-group>
          </div>
          <span
              class="prev"
              @click="move(-1)"
          >
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </span>
          <span
              class="next"
              @click="move(1)"
          >
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </span>
          <ul class="dots">
            <li
                v-for="(dot, index) in slides"
                :key="index"
                :class="{ active: ++index === active }"
                @click="jump(index)"
            ></li>
          </ul>
        </div>
      </div>
    </div>
<!--    <div id="contact" class="section section-contact-us text-center">-->
<!--      <div class="container">-->
<!--        <h2 class="title">Контакные данные</h2>-->
<!--        <p class="blockquote blockquote-primary rounded">-->
<!--          Уведомления о прохождении этапов отбора будут отправляться на почту.-->
<!--        </p>-->
<!--        <div class="row">-->
<!--          <div class="col-lg-8 text-center ml-auto mr-auto col-md-8">-->
<!--            <div v-if="!$store.state.loading" >-->
<!--              <fg-input-->
<!--                  placeholder="ФИО..."-->
<!--                  v-model="form.name"-->
<!--                  :class="{'has-danger': ($v.form.name.$dirty && !$v.form.name.required) || ($v.form.name.$dirty && !$v.form.name.minLength)}"-->
<!--                  :error="-->
<!--                    ($v.form.name.$dirty && !$v.form.name.required) ? 'Заполните поле' :-->
<!--                    ($v.form.name.$dirty && !$v.form.name.minLength) ? `Поле не должно быть меньше 3 букв. Сейчас он ${form.name.length}` : null"-->
<!--              >-->
<!--              </fg-input>-->
<!--              <fg-input-->
<!--                  placeholder="Почта..."-->
<!--                  v-model="form.email"-->
<!--                  :class="{'has-danger': ($v.form.email.$dirty && !$v.form.email.required) || ($v.form.email.$dirty && !$v.form.email.email)} "-->
<!--                  :error="-->
<!--                    ($v.form.email.$dirty && !$v.form.email.required) ? 'Заполните поле' :-->
<!--                    ($v.form.email.$dirty && !$v.form.email.email) ? `Напишите правильную почту. Например @.mail.ru` : null"-->
<!--              >-->
<!--              </fg-input>-->
<!--              <div class="input-group mb-2 p-0" :class="{'has-danger': ($v.form.phoneNumber.$dirty && !$v.form.phoneNumber.required)} ">-->
<!--                <div class="input-group-prepend">-->
<!--                  <div class="input-group-text">+996</div>-->
<!--                </div>-->
<!--                <input v-model="form.phoneNumber" type="number" class="form-control" id="inlineFormInputGroup" placeholder="Телефон">-->
<!--                <div-->
<!--                    class="text-danger invalid-feedback"-->
<!--                    style="display: block;"-->
<!--                    v-if="$v.form.phoneNumber.$dirty && !$v.form.phoneNumber.required"-->
<!--                >-->
<!--                  Напишите номер-->
<!--                </div>-->
<!--                <div-->
<!--                    class="text-danger invalid-feedback"-->
<!--                    style="display: block;"-->
<!--                    v-if="$v.form.phoneNumber.$dirty && !$v.form.phoneNumber.minLength"-->
<!--                >-->
<!--                  Должна быть в формате 777005500-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-if="$store.state.loading" class="spinner-border text-warning" role="status">-->
<!--              <span class="sr-only">Loading...</span>-->
<!--            </div>-->
<!--            <div class="send-button">-->
<!--              <n-button-->
<!--                  :disabled="$store.state.loading"-->
<!--                type="warning"-->
<!--                @click="submitHandler"-->
<!--                round-->
<!--                block-->
<!--                size="lg"-->
<!--                >Зарегистрироваться</n-button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>
<script>
import {Button, FormGroupInput } from "@/components";
import {email, required, minLength} from 'vuelidate/lib/validators';
import headerPictures from "@/components/svgs/headerPictures";
import NButton from "@/components/Button";
import image from "../../public/img/loco-beeline.png"
import adv1 from "../../public/img/Group41.png"
import adv2 from "../../public/img/Group42.png"
import adv3 from "../../public/img/Group43.png"
import slider from "../../public/img/bg1.jpg"
import {setCandidateType} from "@/helpers/helpers";

export default {
  name: "landing",
  bodyClass: "landing-page",
  validations: {
    form: {
      name: {required, minLength: minLength(3)},
      email: {required, email},
      phoneNumber: {required, minLength: minLength(9)},
    },
  },
  components: {
    NButton,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    headerPictures
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        phoneNumber: "",
      },
      image,
      advanced: [adv1, adv2, adv3],
      slider,
      slides: 5,
      active: 1
    };
  },
  mounted() {
    // setInterval( ()=> {
    //   this.move(1)
    // }, 4000)
    this.$store.dispatch('candidateType')
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.$store.dispatch('sendToEmail', this.form)
      } catch (e) {
      }
    },
    move(amount) {
      let newActive
      const newIndex = this.active + amount
      if (newIndex > this.slides) newActive = 1
      if (newIndex === 0) newActive = this.slides
      this.active = newActive || newIndex
    },
    jump(index) {
      this.active = index
    },
    navigate(id) {
      setCandidateType(id)
      this.$router.push({name: 'profile'})
    }
  },
};
</script>
<style scoped>
.body-mini {
  padding-top: 20px;
  background: #F8F8F8;
}
.opacity {
  opacity: 0.8;
}
.embed-responsive {
  border-radius: 10px;
}

/*slider css*/
.team_sliders {
  position: relative;
}
.prev, .next {
  position: absolute;
  top: 50%;
  width: 50px;
  height: 50px;
  border: 2px solid #221e21;
  color: #221e21;
  border-radius: 50%;
  margin-top: -25px;
  margin-left: 25px;
  cursor: pointer;
  line-height: 48px;
  text-align: center;
  text-indent: -2px;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.team_sliders .prev:hover, .next:hover {
  background: #221e21;
  color: #fff;
  transform: scale(1.2);
}
.team_sliders .prev:active, .next:active {
  transform: translate(0, 3px) scale(1.2);
}
.next {
  right: 0;
  margin-left: auto;
  margin-right: 25px;
  text-indent: 2px;
}
.dots {
  position: absolute;
  display: block;
  width: 100%;
  text-align: center;
  bottom: -55px;
}
.dots li {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: #221e21;
  opacity: 0.2;
  display: inline-block;
  margin: 0 3px;
  cursor: pointer;
  transition: opacity 0.4s ease-in-out, width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.dots li.active {
  width: 22px;
  opacity: 1;
}
.slides {
  font-size: 40px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
@media (min-width: 600px) {
  .slides {
    font-size: 80px;
  }
}
@media (min-width: 900px) {
  .slides {
    font-size: 140px;
  }
}
.slides .animated {
  transition: all 400ms;
  position: absolute;
  transform: translate(-50%, -50%);
}
.slides .slide-in {
  opacity: 0;
  transform: translate(-40%, -50%);
}
.slides .slide-in-active {
  transition-delay: 150ms;
}
.slides .slide-out {
  opacity: 1;
}
.slides .slide-out-active {
  opacity: 0;
  transform: translate(-60%, -50%);
}
.team_sliders .buttons {
  position: absolute;
  top: 10px;
  left: 10px;
}
.team_sliders button {
  padding: 10px;
  outline: none;
  border: none;
  -webkit-appearance: none;
  background: #221e21;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}
.team_sliders button:disabled {
  opacity: 0.2;
  cursor: no-drop;
}

</style>
