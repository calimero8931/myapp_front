<template>
  <v-app>
    <logged-in-app-bar
      clipped-left
    />
    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
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