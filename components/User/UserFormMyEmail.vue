<template>
  <v-text-field
    v-model="setEmail"
    :rules="rules"

    label="あなたのSNSなど、アドレスを入力"
    :placeholder="placeholder ? 'yourAccount@sns.com' : undefined"
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