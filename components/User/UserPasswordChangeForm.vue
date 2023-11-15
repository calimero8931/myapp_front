<template>
  <div>
    <v-text-field
      v-model="setPassword"
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
    <br>
    <br>
    <v-text-field
      v-model="setPassword2"
      :rules="form.rules"
      :hint="form.hint"
      label="新しいパスワードを入力"
      :placeholder="form.placeholder"
      :hide-details="!setValidation"
      :counter="setValidation"
      :append-icon="toggle2.icon"
      :type="toggle2.type"
      outlined
      autocomplete="on"
      @click:append="show2 = !show2"
    />
    <br>
    <v-text-field
      v-model="setPassword3"
      :rules="form.rules"
      :hint="form.hint"
      label="再度新しいパスワードを入力"
      :placeholder="form.placeholder"
      :hide-details="!setValidation"
      :counter="setValidation"
      :append-icon="toggle3.icon"
      :type="toggle3.type"
      outlined
      autocomplete="on"
      @click:append="show3 = !show3"
    />
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  props: {
    password: {
      type: String,
      default: ''
    },
    password2: {
      type: String,
      default: ''
    },
    password3: {
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
      show2: false,
      show3: false
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
    setPassword2: {
      get () {
        return this.password2
      },
      set (newVal) {
        return this.$emit('update:password2', newVal)
      },
    },
    setPassword3: {
      get () {
        return this.password3
      },
      set (newVal) {
        return this.$emit('update:password3', newVal)
      },
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
    },
    toggle2 () {
      const icon = this.show2 ? 'mdi-eye' : 'mdi-eye-off'
      const type = this.show2 ? 'text' : 'password'
      return { icon, type }
    },
    toggle3 () {
      const icon = this.show3 ? 'mdi-eye' : 'mdi-eye-off'
      const type = this.show3 ? 'text' : 'password'
      return { icon, type }
    }
  }
}
</script>