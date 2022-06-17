<template>
  <NavBar></NavBar>
  <LandingPage></LandingPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LandingPage from '@/components/LandingPage.vue'
import NavBar from "@/components/NavBar.vue";



export default defineComponent({
  name: 'HomeView',
  components: {
    NavBar,
    LandingPage
  },
});
</script>
