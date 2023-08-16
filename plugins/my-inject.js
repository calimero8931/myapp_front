class MyInject {
  constructor (ctx) {
    this.app = ctx.app
    this.error = ctx.error
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

  // apiエラーハンドラー
  apiErrorHandler (response) {
    // ネットワークエラーの場合はresponseが存在しないので500を代入
    const statusCode = (response) ? response.status : 500
    const message = (response) ? response.statusText : 'Network Error'
    return this.error({ statusCode, message })
  }
}

// injectとは、Vueインスタンスにオリジナルクラス、プロパティやメソッドを追加するためのもの
export default ({ app, error }, inject) => {
  inject('my', new MyInject ({app, error}))
}