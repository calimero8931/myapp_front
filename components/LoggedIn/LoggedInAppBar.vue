<template>
  <v-app-bar
    color="appblue"
    dense
    elevation="1"
    :clipped-left="clippedLeft"
    style="width: 100vw; max-height: 48px;"
    >
      <slot name="navigation-toggle-button" />
      <nuxt-link
        to="/"
        class="text-decoration-none white--text"
      >
        <app-logo />
      </nuxt-link>
      <v-spacer />
      <!-- account menu -->
      <logged-in-app-bar-account-menu />
    </v-app-bar>
</template>

<script>
export default {
  props: {
    clippedLeft: {
      type: Boolean,
      default: false
    }
  },
  data ({ $store }){
    return {
      homePath: $store.state.loggedIn.homePath
    }
  },
  computed: {
    isNotHomePath () {
      return this.$route.name !== this.homePath.name
    }
  }

}
</script>
<style>
  v-app-bar {
    width: 100vw;
  }
</style>