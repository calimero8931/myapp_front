
<template>
  <v-container>
    <h1>プライバシーポリシー</h1>
    <p>

    </p>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      isValid: false,
      loading: false
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
    }
  }
}
</script>