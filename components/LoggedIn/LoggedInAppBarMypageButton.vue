<template>
  <v-footer v-if="state.user.current"
   app fixed >
    <v-container>
    <v-layout
      class="fixed-bottom d-flex justify-center align-center"
      >
      <nuxt-link
      id="mypage_btn"
      color="appyellow"
      :to="`/account/${state.user.current.id}/mypage`"
    >
      <v-icon>mdi-account-circle</v-icon>
    </nuxt-link>
    </v-layout>
  </v-container>
  </v-footer>
  <p v-else></p>
</template>

<script>
export default {
  computed: {
    state() {
      return this.$store.state;
    }
  }
}
</script>
<style>
</style>