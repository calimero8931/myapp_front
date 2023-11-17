<template>
  <user-form-card>
    <template #user-form-card-content >
      <h1 class="mt-8 mb-4">ログイン</h1>
      <p>
        デモ用アカウント<br>
        ID:user0@example.com<br>
        PW:password
      </p>
      <p>
        ※上記でログインした場合は、メール認証が必要な機能のデモはできません。
      </p>
      <v-form
        ref="form"
        v-model="isValid"
        @submit.prevent="login"
      >
        <user-form-email
          :email.sync="params.auth.email"
        />
        <user-form-password
          :password.sync="params.auth.password"
        />
        <v-card-actions>
          <nuxt-link
            to="/password-reset"
            class="body-2 text-decoration-none"
          >
            パスワードを忘れましたか？
          </nuxt-link>
        </v-card-actions>
        <v-card-text class="px-0">
        <v-btn
          type="submit"
          :disabled="!isValid || loading"
          :loading="loading"
          block
          color="appyellow"
          class="black--text"
        >
          ログインする
        </v-btn>
        </v-card-text>

      </v-form>
    </template>
  </user-form-card>
</template>

<script>
export default {
  layout: 'before-login',
  data ({ $store }) {
    return {
      isValid: false,
      loading: false,
      params: {
        auth: {
          email: '',
          password: ''
        }
      },
      redirectPath: $store.state.loggedIn.rememberPath,
      loggedInHomePath: $store.state.loggedIn.homePath
    }
  },
  mounted() {
    if (this.$route.query.token){
      this.redirectWithParams();
    }
  },
  methods: {
    async login () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/auth_token', this.params)
          .then(response => this.authSuccessful(response))
          .catch(error => this.authFailure(error))
      }
      this.loading = false
    },
    authSuccessful (response) {
      this.$auth.login(response)
      this.$router.push(this.redirectPath)
      this.$store.dispatch('getRememberPath', this.loggedInHomePath)
    },
    authFailure ({ response }) {
      if( response && response.status === 404 ){
        const msg = 'ユーザーが見つかりません'
        return this.$store.dispatch('getToast', {  msg })
      }
      return this.$my.apiErrorHandler(response)
    },
    async redirectWithParams( route ) {
      try {
        const response = await this.$axios.$post(`/api/v1/confirm_signup2/`,
          {
            params: {
              token: this.$route.query.token
            }
          }
        );
        this.$router.push('/login')
        const msg = response.message
        const color = 'success'
        const timeout = 10000
        return this.$store.dispatch('getToast', {  msg, color, timeout })
      }
      catch (error) {
        const msg = error.response.data.message
        const color = 'error'
        const timeout = 6000
        return this.$store.dispatch('getToast', {  msg, color, timeout })
      }
    }
  }
}
</script>