
<template>
  <v-container>
    <p class="red--text text-center">※デザイン作成中です。</p>
    <h1 class="my-4">Trophées(トロフェ)<br>ってなに？</h1>
    <p>トロフェは、あなたが行きたい場所に行った証であるトロフィーを集めて自慢するアプリです。 </p>
    <p>有名な場所のトロフィーを集めたり、レアなトロフィーを目指したり、色々な楽しみ方があります。</p>
    <p>例えば「エベレストの頂上に行く」というトロフィーは激レアでしょう。</p>
    <p>有名なラーメン屋さんのトロフィーをたくさん集めるのも楽しいでしょう。</p>
    <p>レアなトロフィーを手に入れたら、SNSで友人たちに自慢してもいいですね。</p>
    <p>SNSのプロフィールにシェアしておけば、名刺代わりに自分を知ってもらえるかも！</p>
    <p>さぁトロフィーを集めるために外へ出かけよう！</p>
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
    <p>9.証拠の記念写真もアップしてみよう</p>
    <p>10.トロフィーをSNSで自慢したくなったらアチーブメントからシェア！</p>
    <p></p>
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