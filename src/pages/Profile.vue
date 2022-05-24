<template>
  <div>
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
