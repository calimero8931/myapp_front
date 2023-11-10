<template>
  <v-app-bar
    app
    :dark="!isScrollPoint"
    :color="toolbarStyle.color"
    :elevation="toolbarStyle.elevation"
    :height="appBarHeight"
    style="width: 100vw;"
  >
    <nuxt-link
          to="/"
          class="text-decoration-none white--text"
        >
      <app-logo
        @click.native="$vuetify.goTo('#scroll-top')"
      />
    </nuxt-link>
    <!-- <app-title class="hidden-mobile-and-down" /> -->
    <v-spacer></v-spacer>

    <!-- <v-toolbar-items class="ml-2 hidden-ipad-and-down">
      <v-btn
        v-for="(menu, i) in menus"
        :key="`menu-btn-${i}`"
        text
        :class="{ 'hidden-sm-and-down' : (menu.title === 'about') }"
        @click="$vuetify.goTo(`#${menu.title}`)"
      >
        {{ $t(`menus.${menu.title}`) }}
      </v-btn>
    </v-toolbar-items> -->

    <div  v-if="!isLogin">
      <before-login-app-bar-signup-button />
      <before-login-app-bar-login-button />
    </div>
    <div v-else>
    </div>
    <nuxt-link
      to="/about"
      class="text-decoration-none white--text ml-2"
    >
      <v-icon>mdi-help-circle-outline</v-icon>
    </nuxt-link>

    <!-- <v-menu
      bottom
      nudge-left="110"
      nudge-width="100"
    >
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon
          class="hidden-ipad-and-up"
          v-on="on"
        />
      </template>
      <v-list
        dense
        class="hidden-ipad-and-up"
      >
        <v-list-item
          v-for="(menu, i) in menus"
          :key="`menu-list-${i}`"
          exact
          @click="$vuetify.goTo(`#${menu.title}`)"
        >
          <v-list-item-title>
            {{ $t(`menus.${menu.title}`) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
  </v-app-bar>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    imgHeight: {
      type: Number,
      default: 1
    }
  },
  data ({ $store }) {
    return {
      appBarHeight: 56,
      scrollY: 0,
      homeAppBarHeight: $store.state.styles.homeAppBarHeight,
      isLogin: $store.state.user.current
    }
  },
  computed: {
    // 500 - 56 =444px以上の場合、tureを返す
    isScrollPoint () {
      return this.scrollY > (this.imgHeight - this.homeAppBarHeight)
    },
    toolbarStyle () {
      const color = this.isScrollPoint ? 'appblue' : 'transparent'
      const elevation = this.isScrollPoint ? 4 : 0
      return { color, elevation }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      this.scrollY = window.scrollY
    }
  }
}
</script>