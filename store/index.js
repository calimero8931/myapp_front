//vuexはコンポーネント間で共有するデータを管理するためのライブラリ

// 変数 = data
export const state = () => ({
  styles: {
    homeAppBarHeight: 56
  }
})

// 算出プロパティ = computed
export const getters = {}

// stateの値を変更できる唯一の方法
export const mutations = {}

// アプリ全体のメソッドを定義 = methods
export const actions = {}