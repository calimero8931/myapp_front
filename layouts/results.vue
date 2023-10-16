<template>
  <v-app>
    <logged-in-app-bar
      clipped-left
    />
    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
    <logged-in-app-bar-mypage-button class="mypage_btn" />
  </v-app>
</template>

<script>
export default {
  middleware: ['authentication'],
  data () {
    return {
    }
  }
}
</script>
<style>
.mypage_btn {
  bottom: 100px;
  z-index: 100;
}
</style>