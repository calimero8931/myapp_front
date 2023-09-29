<template>
  <v-navigation-drawer
    v-model="setDrawer"
    app
    clipped
    :mobile-breakpoint="mobileBreakpoint"
  >
    <v-list>
      <!-- close button -->
      <template
        v-if="isMobileBreakpointLessThan"
      >
        <v-list-item
          @click="$emit('update:drawer', false)"
        >
          <v-list-item-content
            class="text-center"
          >
            <v-item-action-text
              class="d-flex justify-center align-center"
            >
              <v-icon>
                mdi-close-outline
              </v-icon>
              close
            </v-item-action-text>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </template>

      <!-- navi menus -->
      <v-list-item
        v-for="(nav, i) in navMenus"
        :key="`nav-${i}`"
        :to="$my.projectLinkTo($route.params.id, nav.name)"
      >
        <v-list-item-icon>
          <v-icon v-text="nav.icon" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ $my.pageTitle(nav.name) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mobileBreakpoint: 960,
      navMenus: [
        { name: 'account-id-mypage', icon: 'mdi-trophy' },
        { name: 'account-id-public-profile', icon: 'mdi-account-eye' },
        { name: 'account-id-interest', icon: 'mdi-heart-multiple' },
        { name: 'account-id-mail-address', icon: 'mdi-email-edit-outline' },
        { name: 'account-id-password', icon: 'mdi-lock' },
        { name: 'account-id-delete', icon: 'mdi-delete' }
      ]
    }
  },
  computed: {
    setDrawer: {
      get () {
        return this.drawer
      },
      set (newVal) {
        return this.$emit('update:drawer', newVal)
      }
    },
    isMobileBreakpointLessThan () {
      const windowWidth = this.$vuetify.breakpoint.width
      return windowWidth < this.mobileBreakpoint
    }
  }
}
</script>