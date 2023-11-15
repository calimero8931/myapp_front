<template>
  <div>
    <h2 class="text-center my-4">パスワード<span class="h1-span">の</span>変更</h2>
    <user-password-change-form
      :password.sync="params.user.password"
      :password2.sync="params.user.password2"
      :password3.sync="params.user.password3"
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
</template>

<script>
export default {
  layout: 'logged-in',
  data() {
    return {
      params: {
        user: {
          password: '',
          password2: '',
          password3: '',
        }
      }
    };
  },
  mounted() {},
  methods: {
    async changePassword() {
      if (this.params.user.password2 === this.params.user.password3) {
        try {
          const response = await this.$axios.$post(`/api/v1/change_password/`, {
            params: {
              user_id: this.$store.state.user.current.id,
              old_password: this.params.user.password,
              new_password: this.params.user.password2
            }
          });

          const msg = response.message;
          const color = 'success';
          const timeout = 4000;
          this.$store.dispatch('getToast', { msg, color, timeout });

          this.resetForm();
        } catch (error) {
          const msg = error.response.data.message;
          const color = 'error';
          const timeout = 3000;
          this.$store.dispatch('getToast', { msg, color, timeout });
        }
      } else {
        const msg = '一致しません';
        const color = 'error';
        const timeout = 4000;
        this.$store.dispatch('getToast', { msg, color, timeout });
      }
    },
    resetForm() {
      this.params.user.password = '';
      this.params.user.password2 = '';
      this.params.user.password3 = '';
    }
  }
};
</script>
