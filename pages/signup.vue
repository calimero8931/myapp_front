<template>
  <user-form-card>
    <template #user-form-card-content >
      <v-form
        ref="form"
        v-model="isValid"
        @submit.prevent="signup"
      >
        <user-form-name
          :name.sync="params.user.name"
        />
        <user-form-email
          :email.sync="params.user.email"
          placeholder
        />
        <user-form-password
          :password.sync="params.user.password"
          set-validation
        />
        <v-btn
          type="submit"
          :disabled="!isValid || loading"
          :loading="loading"
          block
          color="appblue"
          class="white--text"
          @click="signup"
        >
          登録する
        </v-btn>
      </v-form>
    </template>
  </user-form-card>
</template>

<script>
export default {
  layout: 'before-login',
  data () {
    return {
      isValid: false,
      loading: false,
      params: {
        user: {
          name: 'yuya',
          email: '',
          password: 'password'
        }
      }
    }
  },
  methods: {
    async signup() {
    this.loading = true;
    try {
      await this.$store.dispatch('signup', this.params);

      if (this.$store.state.auth.status === 'success') {
        alert('登録が完了しました');
        // 登録が成功した場合、リダイレクトや他の処理を行う場合はここで行います
        // this.$router.push('/mypage');
      } else {
        alert('登録に失敗しました');
      }
    } catch (error) {
      console.error('登録エラー:', error);
      alert('登録に失敗しました');
    } finally {
      this.loading = false;
      this.formReset();
    }
  },
    formReset () {
      this.$refs.form.reset()
      for (const key in this.params.user) {
        this.params.user[key] = ''
      }
    }
  }
}
</script>