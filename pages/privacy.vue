
<template>
  <v-container>
    <h1 class="my-6">プライバシーポリシー</h1>
    <p>
      このプライバシーポリシーは、ウェブサイト（「サイト」）および関連サービスにおける個人情報の収集、使用、および共有に関する方針を説明します。<br>
      当チームは、お客様のプライバシーを尊重し、個人情報を保護するために最善の努力を払います。<br>
    </p>
    <h3>収集した情報</h3>
    <p>
      当チームは、お客様から提供される情報を収集し、それを以下の目的で使用することがあります<br><br>

      - 位置情報：当チームは、お客様の位置情報を収集することがあります。この情報は、お客様の許可を得て収集されます。この情報は保存されることはなく、トロフィーの取得のみに使用されます。<br>
      - サービス提供：お客様に対してサービスを提供するために、お名前、連絡先情報、お支払い情報などの個人情報を収集することがあります。<br>
      - ウェブサイトの改善：当チームはウェブサイトの使用状況を分析し、ウェブサイトの改善に役立つ情報を収集することがあります。この情報は匿名で提供されます。<br>
      - お知らせと連絡：お客様のリクエストに応じて、新着情報や特別オファーに関する情報を提供するために、お客様の連絡先情報を使用することがあります。<br>
      - 法的要件：当チームは適用法令に従い、法的要件を満たすために情報を収集および共有することがあります。
    </p>
    <h3>情報の共有</h3>
    <p>
      当チームはお客様の個人情報を第三者と共有しないことを原則としています。ただし、以下の場合には情報の共有が行われることがあります：<br><br>

      - サービス提供：当チームはサービス提供に関連する業務を委託する場合、お客様の情報を提携先と共有することがあります。<br>
      - 法的要件：当チームは適用法令に従い、法的要件を満たすために情報を共有することがあります。
    </p>
    <h3>クッキーとトラッキング技術</h3>
    <p>
      当チームのウェブサイトはクッキーやトラッキング技術を使用することがあります。これらの技術はウェブサイトのパフォーマンスの向上やカスタマイズに使用されます。
    </p>
    <h3>プライバシー権利</h3>
    <p>
      お客様は自身の個人情報にアクセスし、訂正、削除、または制限を求める権利を有しています。プライバシーに関する質問やお問い合わせがある場合は、[お問い合わせページ]をご利用ください。
    </p>
    <h3>プライバシーポリシーの変更</h3>
    <p>
      当チームはこのプライバシーポリシーを更新する権利を留保します。変更が行われた場合、変更事項をウェブサイト上で通知します。<br>
      このプライバシーポリシーの最新バージョンはいつでも当チームのウェブサイトでご確認いただけます。
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