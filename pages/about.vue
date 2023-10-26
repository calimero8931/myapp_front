
<template>
  <v-container>

    <h1>Trophées(トロフェ)ってなに？</h1>
    <p>
      このwebアプリケーションは、今まであなたが訪れた場所を記録してトロフィーとして残すことができます。<br>
      それを通して、あなたの人生の軌跡を残すことができます。<br>
      また、あなたの経験をSNSの友人たちにシェアすることができます。<br>
      珍しいトロフィーを集めて、あなたの友人たちに自慢してもいいですね！<br>
    </p>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      isValid: false,
      loading: false,
      imgHeight: 50
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