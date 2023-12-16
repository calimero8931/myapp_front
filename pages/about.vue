
<template>
  <v-container>
    <p class="red--text text-center">※デザイン作成中です。</p>
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

    <h2 class="my-4 text-center">使い方</h2>
    <p>1.行きたい場所で手に入るトロフィーを探す</p>
    <p>2.見つかったらアカウントを作成する</p>
    <p>3.気になるボタンを押す</p>
    <p>4.チャレンジに追加</p>
    <p>5.実際にトロフィーの入手地点へ行く</p>
    <p>6.マイページからトロフィーを取得！</p>
    <p>7.公開プロフィールを設定する</p>
    <p>8.アチーブメントで取得したトロフィーを確認</p>
    <p>9.トロフィーをSNSで自慢したくなったらアチーブメントからシェア！</p>
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