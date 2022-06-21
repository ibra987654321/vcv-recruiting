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
          </template>
          <template>
            <div class="row">
              <div class="col-sm-6 col-lg-12">
                <p class="category">{{ questions[iterator].questionText }}</p>
                <div class="d-flex flex-column">
                    <div class="pl-4  mb-2 d-flex align-items-center" v-for="qu in questions[iterator].answers" :key="qu.id">
                      <input type="radio" :id="qu.id" v-model="answers[questions[iterator].position -1]" :value="qu">
                      <label class="mb-0 ml-2" :for="qu.id">{{qu.content}}</label>
                    </div>
                </div>
              </div>
            </div>
          </template>
          <div class="card-footer text-center">
            <n-button type="warning"  @click="submit(questions[iterator].questionText, answers[questions[iterator].position -1], questions[iterator].key)" round size="lg">Далее</n-button>
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
    correct: [],
    questions: [],
    data: [],
    valid:false,
    iterator: 0
  }),
  mounted() {
    this.$store.state.loading = false
    const q = this.$store.dispatch('getQuestions')
    q.then(r => {
      this.questions = r
    })
  },
  computed: {},
  methods: {
    submit(q, a, k) {
      const obj = {}
      this.answers.map(i => {
        obj.answer = i.content
        obj.correct = i.correct
        obj.question = q
        obj.key = k
        i.question = q
      })
       if (a === undefined) {
         this.valid =  false
       } else {  this.valid = true }
      if (this.valid) {
        this.data.push(obj)
        this.iterator++
        if (this.iterator >= this.questions.length -1) {
          this.$store.dispatch('sendAnswer', this.data)
          this.$store.dispatch('percentage').then(r => {
            if (r >= 70) {
              router.push({name: 'video'})
            } else {
              router.push({name: 'failed'})
            }
          })
        }
      } else {
        this.$store.state.modals.mini = true
        this.$store.state.modals.type.error = true
        this.$store.state.modals.text = 'Выберите один из ответов'
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (from.name === 'testing' && (to.name === 'login' || to.name === 'landing' || to.name === 'profile') ) {
      next(false);
    } else {
      next();
    }
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
