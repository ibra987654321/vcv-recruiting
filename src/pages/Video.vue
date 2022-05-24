<template>
  <div
      class="section section-signup"
      style="background: linear-gradient(50deg, #fae6e6, hsla(179,54%,76%,1)); min-height: 700px;"
  >
    <div class="container">
      <div class="row person_container mx-auto">
        <card v-if="!doneCard" class="card_profile" header-classes="text-center" >
          <template slot="header">
            <h3 class="card-title title-up">Видео</h3>
          </template>
          <template>
            <div class="row">
                <div v-show="recording" class="col-lg-12 text-center">
                  <h2>Запись</h2>
                  <video :class="this.countDown < 5 ? 'redLine' : 'blueLine'" ref="preview" autoplay muted></video>
                  <div class="d-flex justify-content-around">
                    <n-button v-show="this.countDown === 5" type="warning" round size="lg" @click="startVideo">
                      Начать
                    </n-button>
                    <n-button v-show="this.countDown !== 5" type="primary" class="display" round simple>{{ countDown }}</n-button>
                  </div>
                </div>
                <div v-show="!recording" class="col-lg-12 text-center">
                  <h2>Результат</h2>
                  <video crossorigin playsinline ref="recording" controls></video>
                  <div class="d-flex justify-content-around">
                    <n-button type="warning" round size="lg" @click="recording = true" >
                      Переснять
                    </n-button >
                    <n-button
                        @click="submitHandler"
                        type="warning" round size="lg"
                    >
                      <div v-if="!$store.state.loading">Отправить</div>
                      <div v-if="$store.state.loading" class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </n-button>
<!--                    <a ref="downloadButton" class="button">-->
<!--                      Download-->
<!--                    </a>-->
                  </div>
                </div>
                <div v-show="recording" class="col-lg-12">
                  <div class="text-center">
                    <h4>{{ selected.questionText }}</h4>
                  </div>
                </div>
            </div>
          </template>
        </card>
        <card v-if="doneCard" class="card_profile icons-container" header-classes="text-center">
          <template slot="header">
            <h3 class="card-title title-up">Все ваши ответы приняты</h3>
            <h3 class="card-title title-up">В скором времени мы с Вами свяжемся!</h3>
            <div class="section section-nucleo-icons">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12 col-md-12 ">
                    <div class="icons-container mx-auto">
                      <i class="now-ui-icons ui-1_send"></i>
                      <i class="now-ui-icons ui-2_like"></i>
                      <i class="now-ui-icons transportation_air-baloon"></i>
                      <i class="now-ui-icons text_bold"></i>
                      <i class="now-ui-icons tech_headphones"></i>
                      <i class="now-ui-icons emoticons_satisfied"></i>
                      <i class="now-ui-icons shopping_cart-simple"></i>
                      <i class="now-ui-icons objects_spaceship"></i>
                      <i class="now-ui-icons media-2_note-03"></i>
                      <i class="now-ui-icons ui-2_favourite-28"></i>
                      <i class="now-ui-icons design_palette"></i>
                      <i class="now-ui-icons clothes_tie-bow"></i>
                      <i class="now-ui-icons location_pin"></i>
                      <i class="now-ui-icons objects_key-25"></i>
                      <i class="now-ui-icons travel_istanbul"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-media-recorder/src/assets/scss/main.scss'
import {Card, FormGroupInput, Button, Radio} from '@/components';
import NButton from "@/components/Button";

export default {
  name: "Video",
  components: {
    NButton,
    Card,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [FormGroupInput.name]: FormGroupInput,
  },
  data:() => ({
    selectQuestion: '',
    recording: true,
    preview: false,
    videoUrl: '',
    iterator: 0,
    countDown : 5,
    recordingTimeMS: 5000,
    questions: [],
    doneCard: false,
    blob: ''
  }),
   created() {
     this.$store.state.loading = false
     navigator.mediaDevices.getUserMedia({
       video: true,
       audio: true
     }).then(stream => {
       this.$refs.preview.srcObject = stream;
       this.$refs.preview.captureStream = this.$refs.preview.captureStream || this.$refs.preview.mozCaptureStream;
       return new Promise(resolve => this.$refs.preview.onplaying = resolve);
     })
  },
  mounted() {
    this.$store.dispatch('getVideoQuestions').then(r => this.questions.push(...r.data))

  },
  computed: {
    selected() {
      try {
        return this.questions[this.iterator]
      } catch (e) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.doneCard = true
      }
    }
  },
  methods: {
    countDownTimer() {
      if(this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      } else if (this.countDown === 0) {
        this.countDown = 5
      }
    },
    wait(delayInMS) {
      return new Promise(resolve => setTimeout(resolve, delayInMS));
    },
    startRecording(stream, lengthInMS) {
      this.countDownTimer()

      let recorder = new MediaRecorder(stream);
      let data = [];

      recorder.ondataavailable = event => data.push(event.data);
      recorder.start();

      let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = event => reject(event.name);
      });

      let recorded = this.wait(lengthInMS).then(
          () => recorder.state == "recording" && recorder.stop()
      );

      return Promise.all([
        stopped,
        recorded
      ])
          .then(() => data);
    },
    stop(stream) {
      stream.getTracks().forEach(track => track.stop());
    },
    async startVideo(){
      if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        }).then(stream => {
          this.recording = true
          this.$refs.preview.srcObject = stream;
          this.$refs.preview.captureStream = this.$refs.preview.captureStream || this.$refs.preview.mozCaptureStream;
          return new Promise(resolve => this.$refs.preview.onplaying = resolve);
        }).then(() => this.startRecording(this.$refs.preview.captureStream(), this.recordingTimeMS))
            .then (recordedChunks => {
              let recordedBlob = new Blob(recordedChunks, { type: "video/mp4" });
              this.videoUrl = URL.createObjectURL(recordedBlob);
              this.blob = recordedBlob
              this.recording = false
              this.$refs.recording.src = URL.createObjectURL(recordedBlob);
            })
            .catch();
           }
    },
    async submitHandler() {
      try {
        this.$store.state.loading = true
        let formData = new FormData();
        formData.append("multipartFile", this.blob)
        formData.append("questionText", this.selected.questionText);
        await this.$store.dispatch('sendVideo', formData)
        this.$store.state.loading = false
        if (this.questions.length === this.iterator + 1) {
          this.doneCard = true
        }
        this.iterator++
        this.recording = true
      } catch (e) {}

    }
  },
}
</script>

<style scoped>
.display {
  font-size: 30px;
}
video {
  max-width: 700px;
  width: 100%;
  border-radius: 10px;
}
.blueLine {
  border: #00bbff solid 3px;
}
.redLine {
  border: red solid 3px;
}
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
