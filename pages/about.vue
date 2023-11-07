
<template>
  <v-container>

    <h1 class="my-4">Trophées(トロフェ)<br>ってなに？</h1>
    <p>
      トロフェは、今まであなたが訪れた場所を記録してトロフィーとして残すことができます。<br>
      それを通して、あなたの人生の軌跡を残すことができます。<br>
      また、あなたの経験をSNSの友人たちにシェアすることができます。<br>
      珍しいトロフィーを手に入れたら、友人たちに自慢してもいいかも<br>
      さぁトロフィーを集めるために外へ出かけよう！
    </p>
    <h2 class="text-center my-4">使い方</h2>
    <p class="mb-12">
      1. ゲットしたいトロフィーを探そう！<br>
      2. 見つかったらアカウントを作ろう！<br>
      3. チャレンジリストに登録！<br>
      4. トロフィーゲット地点に出かけよう！<br>
      5. マイページからトロフィーゲット！<br>
      6. ゲットしたトロフィーに記念写真をアップ！<br>
      7. プロフィールを埋めてSNSにシェア！<br>
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