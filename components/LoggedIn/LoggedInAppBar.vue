<template>
  <v-app-bar
    app
    color="white"
    dense
    elevation="1"
    >
      <nuxt-link
        to="homePath"
        class="text-decoration-none"
      >
        <app-logo />
      </nuxt-link>
      <app-title />
      <v-spacer />
      <logged-in-app-bar-account-menu />
    </v-app-bar>
</template>

<script>
export default {
  data ({ $store }){
    return {
      homePath: $store.state.loggedIn.homePath
    }
  }

}
</script>