<template>
  <div>
    <div class="page-header clear-filter" filter-color="white">
      <parallax
        class="page-header-image"
        style="background-image: url('img/test.jpg')"
      >
      </parallax>
      <div class="container">
        <h3 class="title">Ryan Scheinder</h3>
        <p class="category">Photographer</p>
        <div class="content">
          <div class="social-description">
            <h2>26</h2>
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>26</h2>
            <p>Comments</p>
          </div>
          <div class="social-description">
            <h2>48</h2>
            <p>Bookmarks</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="row">
          <PersoneProfiles />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, TabPane } from "@/components";
import PersoneProfiles from "./components/PersoneProfile.vue";

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {
    PersoneProfiles,
  },
};
</script>
<style></style>
