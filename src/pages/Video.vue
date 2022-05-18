<template>
  <div
      class="section section-signup"
      style="background-image: url('img/bg11.jpg'); background-size: cover; background-position: top center; min-height: 700px;"
  >
    <div class="container">
      <div class="row person_container mx-auto">
        <card class="card_profile" header-classes="text-center" >
          <template slot="header">
            <h3 class="card-title title-up">Видео</h3>
          </template>
          <template>
            <div class="row">
                <div class="col-lg-6">
                  <n-button @click="startVideo" class="button">
                    Start
                  </n-button>
                  <h2></h2>
                  <video ref="preview" width="460" height="420" autoplay muted></video>
                </div>
                <div class="col-lg-6">
                  <n-button @click="stopVideo" class="button">
                    Stop
                  </n-button>
                  <h2>Recording</h2>
                  <video ref="recording" width="460" height="420" controls></video>
                  <a ref="downloadButton" class="button">
                    Download
                  </a>
                </div>
            </div>
          </template>
          <div class="card-footer text-center">
<!--            <n-button type="warning" @click="saveVide" round size="lg">Далее</n-button>-->
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-media-recorder/src/assets/scss/main.scss'
import {Card, FormGroupInput, Button, Radio} from '@/components';

export default {
  name: "Video",
  components: {
    Card,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [FormGroupInput.name]: FormGroupInput,
  },
  data:() => ({
    imageBase64: null,
    videoUrl: '',
    stream: '',
    recordingTimeMS: 5000
  }),
   created() {
  },
  methods: {
    wait(delayInMS) {
      return new Promise(resolve => setTimeout(resolve, delayInMS));
    },
    startRecording(stream, lengthInMS) {
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
    startVideo(){
      if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        }).then(stream => {
          this.$refs.preview.srcObject = stream;
          this.$refs.downloadButton.href = stream;
          this.$refs.preview.captureStream = this.$refs.preview.captureStream || this.$refs.preview.mozCaptureStream;
          return new Promise(resolve => this.$refs.preview.onplaying = resolve);
        }).then(() => this.startRecording(this.$refs.preview.captureStream(), this.recordingTimeMS))
            .then (recordedChunks => {
              let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
              this.$refs.recording.src = URL.createObjectURL(recordedBlob);
              this.videoUrl = URL.createObjectURL(recordedBlob);
              this.$refs.downloadButton.href = this.$refs.recording.src;
              this.$refs.downloadButton.download = "RecordedVideo.webm";

            })
            .catch();
           }

    },
    stopVideo() {
      stop(this.$refs.preview.srcObject);
    }
  },
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
