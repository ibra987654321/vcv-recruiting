<template>
  <div
      class=""
      style="background: linear-gradient(50deg, #fae6e6, hsla(179,54%,76%,1)); min-height: 700px;"
  >
    <div class="">
      <div class="row person_container container mx-auto mt-5">
        <div class="col-md-12 container">
          <card  class="card_profile p-5 icons-container" header-classes="text-center">
            <template slot="header">
              <h3 class="card-title title-up">Вы прошли все тесты !</h3>
              <h3 class="card-title title-up">Собеседование завершено!</h3>
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
  </div>
</template>

<script>
import {Card} from "@/components";
export default {
  name: "Completed",
  components: {
    Card
  }
}
</script>

<style scoped>
.card_profile{
  margin-top: 70px !important;
}
</style>
