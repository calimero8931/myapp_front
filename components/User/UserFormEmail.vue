<template>
  <v-text-field
    v-model="setEmail"
    :rules="rules"

    label="メールアドレスを入力"
    :placeholder="placeholder ? 'your@email.com' : undefined"
    outlined
  />
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: ''
    },
    placeholder: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      rules: [
        v => !!v || '',
        //railsの方でバリデーションをかけているので、ここではバリデーションは軽めに
        v => /.+@.+\..+/.test(v) || ''
      ]
    }
  },
  computed: {
    setEmail: {
      get () {
        return this.email
      },
      set (newVal) {
        return this.$emit('update:email', newVal)
      }
    }
  }
}
</script>