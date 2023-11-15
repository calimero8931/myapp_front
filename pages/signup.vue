<template>
  <user-form-card>
    <template #user-form-card-content >
      <h1 class="mt-8 mb-4">新規登録</h1>
      <p class="red--text">
        ※現在デモンストレーションモードですので、以下で作成されたアカウントは、Admin権限が付与されます。<br>
        Adminユーザーはトロフィーを作成することができます。
      </p>
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
          color="appyellow"
          class="black--text"
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
          name: '',
          email: '',
          password: ''
        }
      }
    }
  },
  methods: {
    async signup() {
    this.loading = true;
    try {
      const response = await this.$axios.$post('/api/v1/signup', this.params);
      const msg = response.message;
      const color = 'success';
      const timeout = 4000;
      return this.$store.dispatch('getToast', { msg, color, timeout });
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