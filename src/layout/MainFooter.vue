<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-4">
            <img src="https://beeline.kg/binaries/content/gallery/mainsite/footer-logo/beeline_logo.svg" alt="">
            <small class="d-block mt-3 text-white">©2022 Бишкек</small>
        </div>
        <div class="col-md-4">
          <ul class="d-flex flex-column">
            <li>
              <a href="https://www.creative-tim.com">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="https:///presentation.creative-tim.com">
                Instagram
              </a>
            </li>
            <li>
              <a href="https:///blog.creative-tim.com">
                *611
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <div class="copyright">
            &copy; {{ year }}, Вы можете ознакомиться с документами соглашение
            <a href="https:///www.invisionapp.com" target="_blank" rel="noopener"
            >здесь</a
            >. Coded by
            <a href="https://binarcode.com" target="_blank" rel="noopener"
            >Beeline</a>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
