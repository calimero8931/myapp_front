<template>
  <v-container>
    <user-form-password/>
    <v-btn
    color="error"
    @click="deleteAccount"
  >
    アカウントを削除
  </v-btn>
  </v-container>
</template>

<script>
export default {
  data: {
    params: {
      user: {
        password: '',
      }
    }
  },
  methods: {
    async deleteAccount() {
      try {
        const response = await this.$axios.$post(`/api/v1/delete_account/`,
          {
            params: {
              user_id: this.$store.state.user.current.id,
              password: this.params.user.password,
            }
          }
        );
        const msg = response.message;
        const color = 'success';
        const timeout = 4000;
        return this.$store.dispatch('getToast', { msg, color, timeout });
      } catch (error) {
        const msg = error.response.data.message
        const color = 'error'
        const timeout = 3000
        return this.$store.dispatch('getToast', {  msg, color, timeout })
      }
    }
  }
}
</script>
