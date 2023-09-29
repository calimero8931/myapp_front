<template>
  <div>
    <app-toaster />
    <h2>パスワードの変更</h2>
    <user-password-change-form
    :email.sync="params.user.email"
    :email2.sync="params.user.email2"
    />
    <v-btn
      color="primary"
      @click="changeEmail"
    >
      変更を保存
    </v-btn>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  data() {
    return {
      params: {
        user: {
          email: '',
          email2: ''
        }
      }
    };
  },
  mounted() {
    if (this.$route.query.token){
      this.redirectWithParams();
    }
  },
  methods: {
    async changeEmail() {
      if (this.params.user.email === this.params.user.email2) {
        try {
          const response = await this.$axios.$post(`/api/v1/change_email/`,
            {
              params: {
                user_id: this.$store.state.user.current.id,
                new_email: this.params.user.email
              }
            }
          );
          const msg = response.message;
          const color = 'success';
          const timeout = 4000;
          return this.$store.dispatch('getToast', { msg, color, timeout });
        } catch (error) {
          console.error('データの取得に失敗しました', error);
          const msg = error.response.data.message;
        }
      } else {
          const msg = 'メールアドレスが一致しません';
          const color = 'error';
          const timeout = 4000;
          return this.$store.dispatch('getToast', { msg, color, timeout });
      }
    },
    async redirectWithParams( route ) {
      try {
        const response = await this.$axios.$get(`/api/v1/confirm_email2/`,
          {
            params: {
              token: this.$route.query.token,
              user_id: this.$route.query.id
            }
          }
        );
        const msg = response.message
        const color = 'success'
        const timeout = 3000
        return this.$store.dispatch('getToast', {  msg, color, timeout })
      }
      catch (error) {
        const msg = error.response.data.message
        const color = 'error'
        const timeout = 3000
        return this.$store.dispatch('getToast', {  msg, color, timeout })
      }
    }
  }
};
</script>
