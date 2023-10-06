<template>
  <v-app>
    <v-main style="padding-top: 0;">
      <app-toaster />
      <nuxt />
    </v-main>
    <logged-in-app-bar-mypage-button class="mypage_btn" />
  </v-app>
</template>

<script>
export default {
  name: 'default',
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