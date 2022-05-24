<template>
  <div
      class="section section-signup"
      style="background-image: url('img/bg11.jpg'); background-size: cover; background-position: top center; min-height: 700px;"
  >
    <div class="container">
      <div class="row person_container mx-auto">
        <card class="card_profile" header-classes="text-center" >
          <template slot="header">
            <h3 class="card-title title-up">Тестирование</h3>
            <div class="social-line">
              <a
                  href="#pablo"
                  class="btn btn-neutral btn-facebook btn-icon btn-round"
              >
                <i class="fab fa-facebook-square"></i>
              </a>
              <a
                  href="#pablo"
                  class="btn btn-neutral btn-twitter btn-icon btn-lg btn-round"
              >
                <i class="fab fa-twitter"></i>
              </a>
              <a
                  href="#pablo"
                  class="btn btn-neutral btn-google btn-icon btn-round"
              >
                <i class="fab fa-google-plus"></i>
              </a>
            </div>
          </template>
          <template>
            <div class="row">
              <div class="col-sm-6 col-lg-12" v-for="item in questions" :key="item.id">
                <p class="category">{{ item.questionText }}</p>
                <div class="d-flex flex-column">
                    <div class="pl-4  mb-2 d-flex align-items-center" v-for="qu in item.answers" :key="qu.id">
                      <input type="radio" :id="qu.id" v-model="answers[item.id]" :value="qu.content">
                      <label class="mb-0 ml-2" :for="qu.id">{{qu.content}}</label>
                    </div>
<!--                  <n-radio v-for="qu in item.answers" :key="qu.id" v-model="data" :value="qu.content"> {{qu.content}}</n-radio>-->
                </div>
              </div>
            </div>
          </template>
          <div class="card-footer text-center">
            <n-button type="warning"  @click="submit" round size="lg">Далее</n-button>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import {Card, FormGroupInput, Button, Radio} from '@/components';
import router from "@/router";
export default {
  name: "Testing",
  components: {
    Card,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [FormGroupInput.name]: FormGroupInput
  },
  data:() => ({
    answers: [],
    questions: [],
    data: [],
    valid:''
  }),
  mounted() {
    this.$store.state.loading = false
    const q = this.$store.dispatch('getQuestions')
    q.then(r => {
      r.map(i => this.answers.push(i.id))
      this.questions = r
         r.map((q, idx) => {
           this.answers[idx] = q.answers.map(i => i.id)
            const obj ={
            question: q.questionText
            }
           this.data.push(obj)
          })
    })
  },
  methods: {
    submit() {
      const answers = this.answers.filter(i =>  typeof(i) == 'string')
      answers.forEach((i, idx)=> {
        this.data[idx].answer = i
      })
     this.data.filter(i => {
       if (i.hasOwnProperty('answer') === false) {
         this.valid =  false
       } else {  this.valid = true }
      })
      if (this.valid) {
        this.$store.dispatch('sendAnswer', this.data)
        router.push({name: 'video'})
      } else {
        this.$store.state.modals.mini = true
        this.$store.state.modals.type.error = true
        this.$store.state.modals.text = 'Ответьте на все вопросы'
      }
    },
  }
}
</script>

<style scoped>
.person_container {
  width: 100%;
}
.card_profile {
  padding: 20px;
  border-radius: 20px;
}
.text-center h3 {
  margin-top: 40px;
}
</style>
