<template>
  <div>
    <h1 class="mb-4">メールアドレス<span class="h1-span">の</span>変更</h1>
    <p>現在のあなたのメールアドレス<br>{{ now_email }}</p>
    <user-email-change-form
    :email.sync="params.user.email"
    :email2.sync="params.user.email2"
    />
    <v-btn
      color="primary"
      class="black--text"
      @click="changeEmail"
      style="margin-top: -16px;"
      block
    >
      確認メール送信
    </v-btn>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  data() {
    return {
      now_email: "",
      params: {
        user: {
          email: '',
          email2: ''
        }
      }
    };
  },
  mounted() {
    this.get_email();
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
          const msg = error.response.data.message
          const color = 'error'
          const timeout = 4000
          return this.$store.dispatch('getToast', {  msg, color, timeout })
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
        const timeout = 5000
        this.$store.dispatch('getToast', {  msg, color, timeout })
        this.get_email();
      }
      catch (error) {
        const msg = error.response.data.message
        const color = 'error'
        const timeout = 5000
        this.$store.dispatch('getToast', {  msg, color, timeout })
        this.get_email();
      }
    },
    async get_email() {
      const response = await this.$axios.$post(`/api/v1/get_user_data/`,
      {
        params: {
          user_id: this.$store.state.user.current.id
        }
      }
    );
    const email = response.email;

      if (email.length > 4) {
        this.now_email = email.substring(0, 4) + '*'.repeat(email.length - 4);
      } else {
        this.now_email = email;
      }
    }
  }
};
</script>
