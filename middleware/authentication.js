export default async ({ $auth, store, route, redirect }) => {
  // リダイレクトを必要としないパス
  const notRedirectPaths = [ 'index', 'share-hash', 'results-param1-param2','trophy-id','about','contact','privacy','password-reset']
  if (notRedirectPaths.includes(route.name)) {
    return false
  }

  // ログイン前ユーザー処理
  if (!$auth.loggedIn()) {
    // ユーザー以外の値が存在する可能性があるので全てを削除する
    await $auth.logout()

    const msg = 'まずログインしてください'
    const color = 'info'
    // TODO トースター出力
    store.dispatch('getToast', { msg, color })
    // TODO アクセスルート記憶
    store.dispatch('getRememberPath', route)
    return redirect('/login')
  }
}
