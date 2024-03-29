export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/sass/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    'plugins/auth',
    'plugins/axios',
    'plugins/my-inject',
    'plugins/nuxt-client-init',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // Doc: https://www.npmjs.com/package/@nuxtjs/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // Doc: https://www.npmjs.com/package/nuxt-i18n
    'nuxt-i18n'
  ],

  publicRuntimeConfig: {
    appName: process.env.APP_NAME
  },

  router: {
    middleware: ['silent-refresh-token'],
    extendRoutes(routes, resolve) {
      routes.push(
        {
          path: '/results/:param1/:param2',
          component: resolve(__dirname, 'pages/results/_param1/_param2.vue')
        },
        {
          path: '/account/public-profile/:hush',
          component: resolve(__dirname, 'pages/account/_id/public-profile/_hash/_hash.vue'),
        }
      );
    }
  },
// BASIC認証
  // serverMiddleware: [
  //   '~/server/redirect-ssl',
  //   (req, res, next) => {
  //     if (process.env.NODE_ENV === 'production') {
  //       const auth = { login: process.env.BASIC_AUTH_USER, password: process.env.BASIC_AUTH_PASSWORD };
  //       const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  //       const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  //       if (!login || !password || login !== auth.login || password !== auth.password) {
  //         res.statusCode = 401;
  //         res.setHeader('WWW-Authenticate', 'Basic realm="Staging"');
  //         res.end('Unauthorized');
  //       } else {
  //         next();
  //       }
  //     } else {
  //       next();
  //     }
  //   }
  // ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // 環境変数API_URLが優先される
    // baseURL: '/',
    // クロスドメインで認証情報を共有する
    // Doc: https://axios.nuxtjs.org/options/#credentials
    credentials: true
  },

  vuetify: {
    // Doc: https://vuetifyjs.com/ja/customization/a-la-carte/
    // 開発環境でcustomVariablesを有効にするフラグ
    treeShake: true,
    // カスタムcssのパス
    customVariables: ['~/assets/sass/variables.scss'],
    theme: {
      dark: true,
      themes: {
        light: {
          primary: '4080BE',
          info: '4FC1E9',
          success: '44D69E',
          warning: 'FEB65E',
          error: 'FB8678',
          background: '332F2E',
          appblue: '1867c0',
          color: '112F2E',
        },
        dark: {
          primary: 'F3DF4C',
          info: '4FC1E9',
          appblue: '1B2440',
          appyellow: 'F3DF4C',
          background: '332F2E',
          success: '44D69E',
          warning: 'FEB65E',
          error: 'FB8678'
        }
      }
    }
  },

  // Doc: https://nuxt-community.github.io/nuxt-i18n/basic-usage.html#nuxt-link
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    // ルート名にプレフィックス(_ja)を付与しない
    strategy: 'no_prefix',
    // Doc: https://kazupon.github.io/vue-i18n/api/#properties
    vueI18n: {
      fallbackLocale: 'ja',
      // silentTranslationWarn: true,
      silentFallbackWarn: true,
      messages: {
        ja: require('./locales/ja.json'),
        en: require('./locales/en.json')
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
