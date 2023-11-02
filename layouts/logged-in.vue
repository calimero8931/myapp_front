<template>
  <v-app>
    <logged-in-app-bar
      clipped-left
    >
    </logged-in-app-bar>
    <project-navigation-drawer
      :drawer.sync="drawer"
    />
    <v-main style="margin-bottom: 40px;">
      <nuxt />
    </v-main>
    <app-toaster
      style="margin-top: 56px;"
    />
    <v-btn
      id="menu-btn"
      color="appyellow"
      style="height: 40px; border-radius: 7px 7px 0 0;"
      @click="drawer = !drawer">
      <v-icon>mdi-apps</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  middleware: ['authentication'],
  data () {
    return {
      drawer: null
    }
  },
}
</script>
<style>

#menu-btn {
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
}

#menu-btn i {
  font-size: 30px!important;
  color: black!important;
}
</style>