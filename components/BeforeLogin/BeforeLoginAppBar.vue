<template>
  <v-app-bar
    app
    :height="homeAppBarHeight"
    color="appblue"
  >
    <nuxt-link
      to="/"
      class="text-decoration-none white--text"
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
      <nuxt-link
        to="/about"
        class="text-decoration-none white--text ml-2"
      >
        <v-icon>mdi-help-circle-outline</v-icon>
      </nuxt-link>
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
      appBarHeight: 56,
      homeAppBarHeight: $store.state.styles.homeAppBarHeight
    }
  }
}
</script>