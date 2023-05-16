class MyInject {
  constructor (ctx) {
    this.app = ctx.app
  }

  // i18nのページタイトル変換
  pageTitle (routeName) {
    const jsonPath = `pages.${routeName.replace(/-/g, '.')}`
    const title = this.app.i18n.t(jsonPath)
    return title
  }

// 日付フォーマット変換
  dateFormat(dateStr) {
    const dateTimeFormat = new Intl.DateTimeFormat(
      'ja', { dateStyle: 'medium', timeStyle: 'short' }
    )
    return dateTimeFormat.format(new Date(dateStr))
  }

  // プロジェクトリンク
  projectLinkTo (id, name = 'project-id-dashboard') {
    return { name, params: { id } }
  }

}
// injectとは、Vueインスタンスにオリジナルクラス、プロパティやメソッドを追加するためのもの
export default ({ app }, inject) => {
  inject('my', new MyInject ({app}))
}