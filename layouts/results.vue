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
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z5NCV05242"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z5NCV05242');
</script>
<script>
export default {
  middleware: ['authentication'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.mypage_btn {
  bottom: 100px;
  z-index: 100;
}
</style>