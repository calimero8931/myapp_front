<template>
  <div>
    <v-text-field
      v-model="setNewEmail"
      :rules="rules"
      label="新しいメールアドレスを入力"
      :placeholder="placeholder ? 'your@email.com' : undefined"
      outlined
    />
    <v-text-field
      v-model="setConfirmEmail"
      :rules="[...rules, emailMatchRule]"
      label="もう一度入力"
      :placeholder="placeholder ? 'your@email.com' : undefined"
      style="margin-top: -16px;"
      outlined
    />
  </div>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: ''
    },
    email2: {
      type: String,
      default: ''
    },
    placeholder: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
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
    }
  }
}
</script>