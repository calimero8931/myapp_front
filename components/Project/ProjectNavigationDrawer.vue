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
              <!-- <v-icon>
                mdi-close-outline
              </v-icon> -->
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
  name: 'project-navigation-drawer',
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mobileBreakpoint: 960,
      navMenus: [],
      check_admin: false
    }
  },
  async created () {
    try {
        const response = await this.$axios.$post(`/api/v1/check_admin/`,
          {
            params: {
              user_id: this.$store.state.user.current.id
            }
          }
        );
        console.log("adminです"+response.admin);
        this.check_admin = response.admin;
        this.dynamicNavMenus;
      } catch (error) {
        console.error('データの取得に失敗しました', error);
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
    },
    dynamicNavMenus() {
      const dynamicMenus = [
        { name: 'account-id-mypage', icon: 'mdi-trophy' },
        { name: 'account-id-edit', icon: 'mdi-account' },
        { name: 'account-id-public-profile-hash-hash', icon: 'mdi-trophy-award' },
        { name: 'account-id-interest', icon: 'mdi-heart-multiple' }
      ];

      // アドミンのみトロフィー作成メニューを追加
      if (this.check_admin) {
        dynamicMenus.push({ name: 'account-id-trophy-edit', icon: 'mdi-application-edit-outline' });
      }

      // dynamicMenusをnavMenusに代入
      this.navMenus = dynamicMenus;
      console.log("dynamicんきてる");

      return this.navMenus;
    }
  }
}
</script>
<style scoped>
.v-list-item__icon {
  margin-right: 12px!important;
  margin-left: 20px;
}

</style>