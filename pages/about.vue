
<template>
  <v-container>
    <h1 class="my-4">Trophées(トロフェ)<br>ってなに？</h1>
    <p>
      トロフェは、今まであなたが訪れた場所を記録してトロフィーとして残すことができます。<br>
      それを通して、あなたの人生の軌跡を残すことができます。<br>
      珍しいトロフィーを手に入れたら、SNSで友人たちに自慢してもいいかも<br>
      さぁトロフィーを集めるために外へ出かけよう！
    </p>
    <p>
      動作化確認環境<br>
      iOS: Chrome<br>
      Android: Chrome
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