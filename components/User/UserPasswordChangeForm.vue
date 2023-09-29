<template>
  <div>
    <v-text-field
      v-model="setNewEmail"
      :rules="form.rules"
      :hint="form.hint"
      label="現在のパスワードを入力"
      :placeholder="form.placeholder"
      :hide-details="!setValidation"
      :counter="setValidation"
      :append-icon="toggle.icon"
      :type="toggle.type"
      outlined
      autocomplete="on"
      @click:append="show = !show"
    />
    <v-text-field
      v-model="setConfirmEmail"
      :rules="[form.rules, emailMatchRule]"
      :hint="form.hint"
      label="新しいパスワードを入力"
      :placeholder="form.placeholder"
      :hide-details="!setValidation"
      :counter="setValidation"
      :append-icon="toggle.icon"
      :type="toggle.type"
      outlined
      autocomplete="on"
      @click:append="show = !show"
    />
  </div>
</template>

<script>
export default {
  props: {
    password: {
      type: String,
      default: ''
    },
    setValidation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      newEmail: "",
      confirmEmail: "",
      rules: [
        v => !!v || '',
        //railsの方でバリデーションをかけているので、ここではバリデーションは軽めに
        v => /.+@.+\..+/.test(v) || ''
      ]
    }
  },
  computed: {
    setPassword: {
      get () {
        return this.password
      },
      set (newVal) {
        return this.$emit('update:password', newVal)
      },
    },
    setNewEmail: {
      get () {
        return this.email
      },
      set (newVal) {
        return this.$emit('update:email', newVal)
      }
    },
    setConfirmEmail: {
      get () {
        return this.email2
      },
      set (newVal) {
        return this.$emit('update:email2', newVal)
      }
    },
    emailMatchRule () {
      return this.newEmail == this.confirmEmail || 'メールアドレスが一致しません'
    },
    form () {
      const min = "8文字以上"
      const msg = `${min}。半角英数字･ﾊｲﾌﾝ･ｱﾝﾀﾞｰﾊﾞｰが使えます`
      // ログインページ=入力必須
      // 会員登録ページ=入力必須、8文字以上72文字以下、書式チェック
      const required = v => !!v || ''
      const format = v => /^[\w-]{8,72}$/.test(v) || msg
      const rules = this.setValidation ? [format] : [required]
      const hint = this.setValidation ? msg : undefined
      const placeholder = this.setValidation ? min : undefined
      return { rules, hint, placeholder }
    },
    toggle () {
      const icon = this.show ? 'mdi-eye' : 'mdi-eye-off'
      const type = this.show ? 'text' : 'password'
      return { icon, type }
    }
  }
}
</script>