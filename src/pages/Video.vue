<template>
  <div
      class=""
      style="background: linear-gradient(50deg, #fae6e6, hsla(179,54%,76%,1)); min-height: 700px;"
  >
    <div class="">
      <div class="row person_container container mx-auto mt-5">
        <div class="col-md-12 container" v-if="doneCard">
          <card  class="card_profile icons-container" header-classes="text-center">
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
        <div class="col-md-12 container mt-5 mb-5" v-else>
          <card  class="card_profile mb-0" header-classes="text-center" >
            <template slot="header">
              <h3 class="card-title title-up">Видео</h3>
            </template>
            <template>
              <div class="row">
                <div v-show="recording" class="col-lg-12 text-center">
                  <h2>Запись</h2>
                  <video :class="this.countDown < questions[iterator].milliseconds / 1000 ? 'redLine' : 'blueLine'" ref="preview" autoplay muted></video>
                  <div class="d-flex justify-content-around">
                    <n-button v-if="this.countDown === msController" type="warning" round size="lg" @click="startVideo(questions[iterator].milliseconds)">
                      Начать
                    </n-button>
                    <n-button v-else type="primary" class="display" round simple>{{ countDown }}</n-button>
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
                        @click="submitHandler()"
                        type="warning" round size="lg"
                    >
                      <div v-if="!$store.state.loading">Отправить</div>
                      <div v-if="$store.state.loading" class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </n-button>
                  </div>
                </div>
                <div v-show="recording" class="col-lg-12">
                  <div class="text-center">
                    <h4>{{ questions[iterator].questionText }}</h4>
                  </div>
                </div>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-media-recorder/src/assets/scss/main.scss'
import {Card, FormGroupInput, Button, Radio} from '@/components';
import NButton from "@/components/Button";
import {removeToken} from "@/helpers/helpers";

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
  mounted() {
    this.$store.dispatch('getVideoQuestions')
    const q = this.$store.dispatch('getVideoQuestions')
    q.then(r => {
      this.iterator = this.$store.state.iterator
      this.questions = r
    })
    // this.questions = this.$store.state.video.questionData[0]
    this.countDown = this.questions[this.iterator].milliseconds / 1000

  },
  created() {
    this.$store.state.loading = false
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(() => {
      this.$refs.preview.captureStream = this.$refs.preview.captureStream || this.$refs.preview.mozCaptureStream;
      return new Promise(resolve => this.$refs.preview.onplaying = resolve);
    })
  },
  computed: {
    msController() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.countDown = this.questions[this.iterator].milliseconds / 1000
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
        this.countDown = this.questions[this.iterator].milliseconds / 1000
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
    async startVideo(second){
      this.recordingTimeMS = second
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
        formData.append("questionText", this.questions[this.iterator].questionText);
        formData.append("position", this.questions[this.iterator].position);
        await this.$store.dispatch('sendVideo', formData)
        this.$store.state.loading = false
        if (this.$store.state.video.questionData[0].length === this.iterator + 1) {
          this.doneCard = true
          removeToken()
        }
        this.iterator++
        this.recording = true
      } catch (e) {}

    }
  },
  beforeRouteLeave(to, from, next) {
    if (from.name === 'video' && (to.name === 'login' || to.name === 'landing' || to.name === 'profile' || to.name === 'testing') ) {
      next(false);
    } else {
      next();
    }
  }
}
</script>

<style scoped>
.display {
  font-size: 30px;
}
video {
  max-width: 500px;
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
}
.text-center h3 {
  margin-top: 40px;
}

/*list css*/
.list_question .card {
  margin-bottom: 24px;
  -webkit-box-shadow: 0 2px 4px rgb(126 142 177 / 10%);
  box-shadow: 0 2px 4px rgb(126 142 177 / 10%);
}
.list_question .card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid #eaedf1;
  border-radius: .25rem;
}
.activity-wid {
  margin-left: 16px;
}
.mb-0 {
  margin-bottom: 0!important;
}
.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.activity-wid .activity-list {
  position: relative;
  padding: 0 0 33px 30px;
}
.active_list {
  color: #ffcd33;
}
.activity-border:before {
  content: "";
  position: absolute;
  height: 38px;
  border-left: 3px dashed #eaedf1;
  top: 40px;
  left: 0;
}

.activity-wid .activity-list .activity-icon {
  position: absolute;
  left: -20px;
  top: 0;
  z-index: 2;
}
.avatar-sm {
  height: 2.5rem;
  width: 2.5rem;
}

.media {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.me-3 {
  margin-right: 1rem!important;
}

.font-size-15 {
  font-size: 15px!important;
}

.font-size-14 {
  font-size: 14px!important;
}
.text-muted {
  color: #74788d!important;
}

.text-end {
  text-align: right!important;
}

.font-size-13 {
  font-size: 13px!important;
}

.avatar-title {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100%;
}
.bg-soft-primary {
  background-color: rgba(82,92,229,.25)!important;
}
.bg-soft-success {
  background-color: #ffcd33 !important;
}
</style>
