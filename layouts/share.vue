<template>
  <v-app>
    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
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
  name: 'LayoutsDefault'
}
</script>