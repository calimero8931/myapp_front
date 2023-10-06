<template>
  <v-footer v-if="state.user.current"
   app fixed >
    <v-container>
    <v-layout
      class="fixed-bottom d-flex justify-center align-center"
      >
      <v-btn
      id="mypage_btn"
      outlined
      class="font-weight-bold"
      color="appblue"
      :to="`/account/${state.user.current.id}/mypage`"
    >
      My page
    </v-btn>
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