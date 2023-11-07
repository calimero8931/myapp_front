<template>
  <v-container>
    <app-toaster />
    <h1 class="text-center my-4">パスワードリセット</h1>
    <div v-if="!this.$route.query.token">
      <div style="max-width: 300px; margin: 0 auto;">
      <p>メールアドレスを入力してください。新しいパスワードを再設定するためのメールが送信されます。</p>
        <user-form-email
        :email.sync="params.user.email"
        />
        <v-btn
          color="primary"
          @click="emailReset"
          class="black--text"
          block
        >
          メール送信
        </v-btn>
      </div>
    </div>
    <div v-else>
      <p>新しいパスワードを入力してください。</p>
      <user-form-password
        :password.sync="params.user.password"
        count="8"
        set-validation
        label="新しいパスワード"
      />
      <user-form-password
        :password.sync="params.user.password2"
        count="8"
        set-validation
        label="新しいパスワード（確認）"
      />
      <v-btn
        color="primary"
        @click="changePassword"
        class="black--text mt-4"
        block
      >
        変更を保存
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      params: {
        user: {
          email: 'hello.potechi@gmail.com',
          password: '',
          password2: '',
        }
      }
    };
  },
  mounted() {
  },
  methods: {
    async emailReset() {
      try {
        const response = await this.$axios.$post(`/api/v1/password_reset_step1/`,
          {
            params: {
              email: this.params.user.email
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
    },
    async changePassword() {
      if (this.params.user.password === this.params.user.password2 && this.params.user.password.length>7) {
        try {
          const response = await this.$axios.$post(`/api/v1/password_reset_step3/`,
            {
              params: {
                token: this.$route.query.token,
                new_password: this.params.user.password
              }
            }
          );
          const msg = response.message;
          const color = 'success';
          const timeout = 3000;
          this.$store.dispatch('getToast', { msg, color, timeout });
          setTimeout(() => {
            this.$router.push('/login');
          }, timeout);
        } catch (error) {
          const msg = error.response.data.error
          const color = 'error'
          const timeout = 3000
          this.$store.dispatch('getToast', { msg, color, timeout });
          setTimeout(() => {
            this.$router.push('/login');
          }, timeout);
        }
      } else {
          const msg = 'メールアドレスが一致しません';
          const color = 'error';
          const timeout = 4000;
          return this.$store.dispatch('getToast', { msg, color, timeout });
      }
    }
  }
};
</script>
