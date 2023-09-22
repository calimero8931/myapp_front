<template>
  <v-app-bar
    app
    :height="homeAppBarHeight"
    color="white"
  >
    <nuxt-link
      to="/"
      class="text-decoration-none"
    >
      <app-logo />
    </nuxt-link>

    <!-- <app-title
      class="hidden-mobile-and-down"
    /> -->

    <v-spacer />

    <div>
      <before-login-app-bar-signup-button />
      <before-login-app-bar-login-button />
    </div>
    <!-- <div v-else>
      <logged-in-app-bar-mypage-button />
      <after-login-app-bar-logout-button />
    </div> -->
  </v-app-bar>
</template>

<script>
export default {
  data ({ $store }) {
    return {
      homeAppBarHeight: $store.state.styles.homeAppBarHeight
    }
  }
}
</script>