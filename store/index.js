const homePath = 'index'
export const state = () => ({
  styles: {
    homeAppBarHeight: 56
  },
  loggedIn: {
    homePath: {
      name: homePath
    },
    rememberPath: {
      name: homePath,
      params: {}
    },
    // ログイン後アクセス不可ルート一覧(ページが増えたら追加する)
    redirectPaths: [
      'signup',
      'login'
    ]
  },
  project: {
    current: null,
    list: []
  },
  user: {
    current: null
  },
  auth: {
    token: null,
    expires: 0,
    payload: {}
  },
  favorite: {
    already: false
  },
  interest: {
    already: false
  },
  achievements: {
    list: []
  },
  toast: {
    msg: null,
    color: 'error',
    timeout: 4000
  }
})

// 算出プロパティ = computed
export const getters = {}

// stateの値を変更できる唯一の方法
export const mutations = {
  setProjectList(state, payload) {
    state.project.list = payload
  },
  setCurrentProject(state, payload) {
    state.project.current = payload
  },
  setCurrentUser (state, payload) {
    state.user.current = payload
  },
  setAuthToken (state, payload) {
    state.auth.token = payload
  },
  setAuthExpires (state, payload) {
    state.auth.expires = payload
  },
  setAuthPayload (state, payload) {
    state.auth.payload = payload
  },
  setToast (state, payload) {
    state.toast = payload
  },
  setRememberPath (state, payload) {
    state.loggedIn.rememberPath = payload
  },
  setFavoriteAlready(state, payload) {
    state.favorite.already = payload
  },
  setInterestAlready(state, payload) {
    state.interest.already = payload
  },
  setAchievementsList(state, payload) {
    state.achievements.list = payload
  }
}

// アプリ全体のメソッドを定義 = methods
export const actions = {
  getProjectList( { commit }, projects ){
    projects = projects || []
    commit('setProjectList', projects)
  },

  getCurrentProject({ state, commit }, params) {
    let currentProject = null
    if (params && params.id) {
      const id =  Number(params.id)
      currentProject = state.project.list.find(project => project.id === id) || null
    }

    commit('setCurrentProject', currentProject)
  },
  getCurrentUser ({ commit }, user) {
    commit('setCurrentUser', user)
  },
  getAuthToken ({ commit }, token) {
    commit('setAuthToken', token)
  },
  getAuthExpires ({ commit }, expires) {
    expires = expires || 0
    commit('setAuthExpires', expires)
  },
  getAuthPayload ({ commit }, jwtPayload) {
    jwtPayload = jwtPayload || {}
    commit('setAuthPayload', jwtPayload)
  },
  getToast ({ commit }, {msg, color, timeout }) {
    color = color || 'error'
    timeout = timeout || 4000
    commit('setToast', { msg, color, timeout })
  },
  // ログイン前ユーザーがアクセスしたルートを記憶する
  getRememberPath ({ state, commit }, { name, params }) {
    // ログイン前パスが渡された場合はloggedIn.homePathに書き換える
    // console.log('リメンバー');
    if (state.loggedIn.redirectPaths.includes(name)) {
      name = state.loggedIn.homePath.name
    }
    params = params || {}
    commit('setRememberPath', { name, params })
  }
,
  // サインアップ
  // this.paramsを受け取って、APIを叩く
  async signup ({ dispatch }, params) {
    const res = await this.$axios.post('/api/v1/signup', params)
    // 成功したらアラートを表示
    dispatch('getToast', { msg: 'success', color: 'success' })
    const { token, expires, payload } = res.data
    dispatch('getAuthToken', token)
    dispatch('getAuthExpires', expires)
    dispatch('getAuthPayload', payload)
  }
}