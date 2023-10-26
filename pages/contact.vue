
<template>
  <v-container>
    <h1 class="text-center">お問い合わせ</h1>
    <v-form ref="form" v-model="isValid">
      <v-text-field
        v-model="params.user.name"
        :rules="nameRules"
        :counter="20"
        label="お名前"
        required
      ></v-text-field>
      <v-text-field
        v-model="params.user.email"
        :rules="emailRules"
        label="メールアドレス"
        required
      ></v-text-field>
      <v-textarea
        v-model="params.user.content"
        :rules="contentRules"
        :counter="1000"
        label="お問い合わせ内容"
        required
      ></v-textarea>
      <v-row>
        <v-col col="6">
          <v-btn
            :disabled="!isValid"
            :loading="loading"
            color="appyellow"
            @click="submit"
            block
          >
            送信
          </v-btn>
        </v-col>
        <v-col col="6">
          <v-btn
            outlined
            color="appyellow"
            @click="formReset"
            block
          >
            リセット
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

  </v-container>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      isValid: false,
      loading: false,
      params: {
        user: {
          name: '',
          email: '',
          content: ''
        }
      },
      nameRules: [
        v => !!v || 'お名前は必須です',
        v => (v && v.length <= 20) || 'お名前は10文字以内で入力してください',
      ],
      emailRules: [
        v => !!v || 'メールアドレスは必須です',
        v => /.+@.+\..+/.test(v) || 'メールアドレスの形式が正しくありません',
      ],
      contentRules: [
        v => !!v || 'お問い合わせ内容は必須です',
        v => (v && v.length <= 1000) || 'お問い合わせ内容は1000文字以内で入力してください',
      ]

    }
  },
  mounted() {
    this.$store.dispatch('getRememberPath', { name: this.$route.name })
  },
  methods: {
    formReset () {
      this.$refs.form.reset()
      for (const key in this.params.user) {
        this.params.user[key] = ''
      }
    },
    submit () {
      this.loading = true
      this.$axios.$post('/api/v1/contacts', this.params)
        .then((res) => {
          this.$store.dispatch('getToast', { msg: res.message, color: 'success', timeout: 4000 })
          this.formReset()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style>
  .v-main {
    /* padding-top: 70px!important; */
  }
</style>