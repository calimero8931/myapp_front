<template>
  <v-container>
    <h1 class="my-4">アカウント<span class="h1-span">を</span>削除</h1>
    <user-form-password
      :password.sync="params.user.password"
    />
    <v-btn
    color="#FB5159"
    class="black--text mt-4"
    @click="confirmDeleteAccount"
    block
  >
    アカウントを削除
  </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      params: {
        user: {
          password: '',
        }
      }
    };
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
        await this.$auth.logout();

        this.$router.push({ path: '/' });
        return this.$store.dispatch('getToast', { msg, color, timeout });
      } catch (error) {
        const msg = error.response.data.message
        const color = 'error'
        const timeout = 3000
        return this.$store.dispatch('getToast', {  msg, color, timeout })
      }
    },
    async confirmDeleteAccount() {
      if (confirm('本当にアカウントを削除しますか？')) {
        await this.deleteAccount();
      } else {
        return;
      }
    }
  }
}
</script>
